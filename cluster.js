const http = require("http");
const express = require("express");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const { setupWorker, setupMaster } = require("@socket.io/sticky");
const clusterAdapter = require("@socket.io/cluster-adapter");
const { createAdapter } = require("@socket.io/mongo-adapter");
const { MongoClient } = require("mongodb");

const entryPoint = require("./index");
const config = require("./config");

// CONSTANTS

const app = express();
const server = http.createServer(app);
const path = require("path");

// Connect any DB...

const PORT = config.server.PORT;
const DB = "mydb";
const COLLECTION = "socket.io-adapter-events";

require("./helper/db")();
const mongoClient = new MongoClient(config.db.URI, {
 useUnifiedTopology: true,
});

(async function () {
 if (cluster.isMaster) {
  console.log({
   message: `Master ${process.pid} is running`,
   timestamp: new Date().toString(),
  });

  // setup sticky sessions
  setupMaster(server, {
   loadBalancingMethod: "least-connection",
  });

  // setup connections between the workers
  clusterAdapter.setupPrimary();

  // needed for packets containing buffers (you can ignore it if you only send plaintext objects)
  // Node.js < 16.0.0
  cluster.setupPrimary({
   serialization: "advanced",
  });

  //server.listen(PORT);

  for (let i = 0; i < numCPUs; i++) {
   cluster.fork();
  }

  cluster.on("exit", (worker) => {
   console.log({
    message: `Worker ${worker.process.pid} died`,
    timestamp: new Date().toString(),
   });
   cluster.fork();
  });
 } else {
  console.log({
   message: `Worker ${process.pid} started`,
   timestamp: new Date().toString(),
  });

  const io = require("socket.io")(server, {
   transport: ["websocket"],
   cors: {
    origin: !config.production.IS_PROD ? "*" : [config.environment.URL],
    methods: ["GET", "POST"],
   },
  });

  // use the cluster adapter

  await mongoClient.connect();

  try {
   await mongoClient.db(DB).createCollection(COLLECTION, {
    capped: true,
    size: 1e6,
   });
  } catch (e) {
   // collection already exists
  }

  const mongoCollection = mongoClient.db(DB).collection(COLLECTION);

  // use the cluster adapter

  io.adapter(clusterAdapter.createAdapter());

  // setup connection with the primary process
  setupWorker(io);

  // Wrap index.js

  io.adapter(createAdapter(mongoCollection));

  entryPoint.call({ io, express, app });

  server.listen(PORT);
 }
})();

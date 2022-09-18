const { createAdapter } = require("@socket.io/mongo-adapter");
const { MongoClient } = require("mongodb");

const http = require("http");
const express = require("express");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const { setupWorker, setupMaster } = require("@socket.io/sticky");

const clusterAdapter = require("@socket.io/cluster-adapter");

const entryPoint = require("./index");
const config = require("./config");

// CONSTANTS

const server = http.createServer();
const PORT = config.server.PORT;

const DB = "mydb";
const COLLECTION = "socket.io-adapter-events";

require("./helper/db")();
const mongoClient = new MongoClient(config.db.URI, {
 useUnifiedTopology: true,
});

(async function () {
 if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`);

  setupMaster(server, {
   loadBalancingMethod: "least-connection",
  });

  // connection between workers

  cluster.setupPrimary({
   serialization: "advanced",
  });

  server.listen(PORT);

  for (let i = 0; i < numCPUs; i++) {
   cluster.fork();
  }

  cluster.on("exit", (worker) => {
   console.log(`Worker ${worker.process.pid} died`);
   cluster.fork();
  });
 } else {
  console.log(`Worker ${process.pid} started`);

  const app = express();
  const httpServer = http.createServer(app);

  const io = require("socket.io")(httpServer, {
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

  io.adapter(createAdapter(mongoCollection));

  setupWorker(io);

  entryPoint.call({ io, express, app, server });
 }
})();

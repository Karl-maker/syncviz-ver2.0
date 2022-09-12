const { createAdapter } = require("@socket.io/mongo-adapter");
const { MongoClient } = require("mongodb");

const http = require("http");
const express = require("express");
const cluster = require("cluster");
const numCPUs = require("os").cpus().length;
const { setupWorker, setupMaster } = require("@socket.io/sticky");

const entryPoint = require("./index");
const config = require("./config");

// CONSTANTS

const app = express();
const server = http.createServer(app);
const PORT = config.server.PORT;

const DB = "mydb";
const COLLECTION = "socket.io-adapter-events";

require("./helper/db")();
const mongoClient = new MongoClient(config.db.URI, {
 useUnifiedTopology: true,
});

(async function () {
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

 io.adapter(createAdapter(mongoCollection));

 entryPoint.call({ io, express, app });
 server.listen(PORT);
})();

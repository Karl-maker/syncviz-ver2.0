const express = require("express");
const router = express.Router();

// Controllers

const file = require("./files");
const virtual_space = require("./virtual-room");

// Single point of getting all routes
function routes() {
 return router.use(
  file.call({ io: this.io }),
  virtual_space.call({ io: this.io })
 );
}

module.exports = routes;

const virtualSpaceHandler = require("./controllers/socket.io/virtual-space");
const httpControllers = require("./controllers/http");
const path = require("path");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
const cors = require("cors");
const config = require("./config");

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const corsOptions = {
 origin: !config.production.IS_PROD ? "*" : [config.client.URL],
 optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

module.exports = function () {
 const io = this.io;
 const express = this.express;
 const app = this.app;

 // Namespaces..

 virtualSpaceHandler(io);

 // HTTP

 app.use(cors(corsOptions));
 app.use(jsonParser);
 app.use(urlencodedParser);

 app.use("/", express.static(path.join(__dirname, config.build.PATH))); // Build
 app.use("/static", express.static(path.join(__dirname, "/static")));
 app.use("/api", httpControllers.call({ io }));
 app.use(favicon(path.join(__dirname, `${config.build.PATH}/favicon.ico`)));
 app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, config.build.INDEX));
 });
};

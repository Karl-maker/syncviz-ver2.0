const virtualSpaceHandler = require("./controllers/socket.io/virtual-space");
const httpControllers = require("./controllers/http");
const path = require("path");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
const cors = require("cors");
const config = require("./config");
const errorHandler = require("./middlewares/error");

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

const corsOptions = {
 credentials: true,
 origin: !config.production.IS_PROD
  ? "http://localhost:3000"
  : [config.client.URL],
 optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

module.exports = function () {
 const io = this.io;
 const express = this.express;
 const app = this.app;

 // Passport Init

 require("./auth/passport");

 // Namespaces..

 virtualSpaceHandler(io);

 // HTTP

 app.use(cors(corsOptions));
 app.use(jsonParser);
 app.use(urlencodedParser);
 app.use(bodyParser.json({ limit: "50mb" }));
 app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

 app.use("/", express.static(path.join(__dirname, config.build.PATH))); // Build
 app.use("/static", express.static(path.join(__dirname, "/static")));
 app.use("/api", httpControllers.call({ io }));
 app.use(favicon(path.join(__dirname, `${config.build.PATH}/favicon.ico`)));

 app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, config.build.INDEX));
 });
 app.use(errorHandler);
};

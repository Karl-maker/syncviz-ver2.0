const virtualSpaceHandler = require("./controllers/socket.io/virtual-space");
const httpControllers = require("./controllers/http");
const path = require("path");
const bodyParser = require("body-parser");
const favicon = require("serve-favicon");
const cors = require("cors");
const config = require("./config");
const timeout = require("connect-timeout");
const rateLimit = require("express-rate-limit");

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

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });

  // HTTP

  app.enable("trust proxy");
  app.use(function (request, response, next) {
    if (process.env.NODE_ENV != "development" && !request.secure) {
      return response.redirect("https://" + request.headers.host + request.url);
    }

    next();
  });

  app.use(limiter);
  app.use(cors(corsOptions));
  app.use(jsonParser);
  app.use(urlencodedParser);
  app.use(bodyParser.json({ limit: "50mb" }));
  app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

  app.use(
    "/",
    haltOnTimedout,
    express.static(path.join(__dirname, config.build.PATH))
  ); // Build
  app.use(
    "/static",
    haltOnTimedout,
    express.static(path.join(__dirname, "/static"))
  );
  app.use("/api", haltOnTimedout, httpControllers.call({ io }));
  app.use((req, res, next) => {
    if (process.env.NODE_ENV != "development") {
      return favicon(path.join(__dirname, `${config.build.PATH}/favicon.ico`));
    }
    next();
  });
  app.get("*", haltOnTimedout, (req, res) => {
    res.sendFile(path.join(__dirname, config.build.INDEX));
  });
};

function haltOnTimedout(req, res, next) {}

require("dotenv-flow").config({
 silent: true,
});

/*
  Central point of all major variables that are needed to run the service.
  Everything should be edited or altered to fit the CPU it will be ran on by using .env files.
  A .example.env file will be avaliable to display all variables used by the system.
*/

const ENV = process.env;
const IS_PROD = process.env.NODE_ENV === "production";

const variables = {
 production: {
  IS_PROD: process.env.NODE_ENV === "production",
 },
 environment: {
  NODE_ENV: ENV.NODE_ENV || "development",
  URL: IS_PROD
   ? "https://project-syncviz.herokuapp.com"
   : `http://localhost:${ENV.PORT || 5000}`,
 },

 server: {
  PORT: ENV.PORT || 5000,
 },

 redis: {
  URL: ENV.REDIS_URL || "redis://localhost:6379",
 },

 db: {
  URI: ENV.DB_URI || "",
  USER: ENV.DB_USER || "",
  PASSWORD: ENV.DB_PASSWORD || "",
 },

 build: {
  PATH: ENV.BUILD_PATH || "./client/build",
  INDEX: ENV.INDEX_PATH || "./client/build/index.html",
 },

 client: {
  URL: IS_PROD
   ? "https://project-syncviz.herokuapp.com"
   : "http://localhost:3000",
 },

 aws: {
  ACCESS_KEY_ID: ENV.AWS_ACCESS_KEY_ID || null,
  SECRET_ACCESS_KEY: ENV.AWS_SECRET_ACCESS_KEY || null,
  BUCKET_NAMES: {
   MODELS: {
    NAME: ENV.AWS_MODEL_BUCKETNAME || "project-syncviz-3d-models",
    ACCELERATED: ENV.AWS_MODEL_ACCELERATED || false,
   },
  },
 },
};

module.exports = variables;

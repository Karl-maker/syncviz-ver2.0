require("dotenv-flow").config({
 silent: true,
});

const path = require("path");

/*
  Central point of all major variables that are needed to run the service.
  Everything should be edited or altered to fit the CPU it will be ran on by using .env files.
  A .example.env file will be avaliable to display all variables used by the system.
*/

const ENV = process.env;
const IS_PROD = process.env.NODE_ENV === "production";

let ACCESS_KEYS, REFRESH_KEYS, GENERAL_KEYS;

try {
 ACCESS_KEYS = JSON.parse(ENV.ACCESS_KEYS);
 REFRESH_KEYS = JSON.parse(ENV.REFRESH_KEYS);
} catch (err) {
 console.error("Keys unable to parse JSON, please check config variables");

 ACCESS_KEYS = { public: "", private: "" };
 REFRESH_KEYS = { public: "", private: "" };
}

const variables = {
 production: {
  IS_PROD: process.env.NODE_ENV === "production",
 },

 environment: {
  LOCATION: `${ENV.LOCATION || "http://localhost"}:${ENV.CLIENT_PORT || 3000}`,
  NODE_ENV: ENV.NODE_ENV || "development",
  URL: IS_PROD
   ? "https://project-syncviz.herokuapp.com"
   : `${ENV.LOCATION || "http://localhost"}:${ENV.PORT || 5000}`,
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

 Google: {
  OAuth: {
   CLIENT_ID: ENV.REACT_APP_GOOGLE_OAUTH_CLIENT_ID || "",
   SECRET_ID: ENV.REACT_APP_GOOGLE_OAUTH_SECRET_ID || "",
  },
 },

 jwt: {
  ISSUER: ENV.JWT_ISSUER || "Appointment",
  ALGORITHM: ENV.JWT_ALGORITHM || "RS256",
  IS_HTTPS: ENV.JWT_IS_HTTPS || false,

  ACCESS_TOKEN_LIFE: ENV.ACCESS_TOKEN_LIFE || "7d",
  ACCESS_TOKEN_PUBLIC_KEY: ACCESS_KEYS.public,
  ACCESS_TOKEN_PRIVATE_KEY: ACCESS_KEYS.private,

  REFRESH_TOKEN_PUBLIC_KEY: REFRESH_KEYS.public,
  REFRESH_TOKEN_PRIVATE_KEY: REFRESH_KEYS.private,
  REFRESH_TOKEN_LIFE: ENV.REFRESH_TOKEN_LIFE || "7d",
 },
};

module.exports = variables;

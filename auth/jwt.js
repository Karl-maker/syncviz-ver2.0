const jwt = require("jsonwebtoken");
const config = require("../config");
const User = require("../models/user");
const Token = require("../models/token");

module.exports = {
 getAccessTokenFromHeader,
 createAccessToken,
 createRefreshToken,
 deleteRefreshToken,
 getAccessTokenWithRefreshToken,
};

function getAccessTokenFromHeader(req) {
 let access_token =
  req.headers["x-access-token"] || req.headers["authorization"];

 // Remove Bearer from string
 access_token = access_token.replace(/^Bearer\s+/, "");

 return access_token;
}

async function createAccessToken(user) {
 const body = {
  email: user.email,
  picture: user.picture,
  username: user.username,
 };
 const access_token = await jwt.sign(
  { user: body },
  config.jwt.ACCESS_TOKEN_PRIVATE_KEY,
  {
   expiresIn: config.jwt.ACCESS_TOKEN_LIFE,
   algorithm: config.jwt.ALGORITHM,
  }
 );

 return access_token;
}

async function createRefreshToken(user) {
 const body = {
  email: user.email,
  picture: user.picture,
  username: user.username,
 };
 const refresh_token = await jwt.sign(
  { user: body },
  config.jwt.REFRESH_TOKEN_PRIVATE_KEY,
  {
   expiresIn: config.jwt.REFRESH_TOKEN_LIFE,
   algorithm: config.jwt.ALGORITHM,
  }
 );

 return refresh_token;
}

async function getAccessTokenWithRefreshToken(refresh_token) {
 const REFRESH_TOKEN_PUBLIC_KEY = config.jwt.REFRESH_TOKEN_PUBLIC_KEY;
 let user, token, payload;

 try {
  payload = await jwt.verify(refresh_token, REFRESH_TOKEN_PUBLIC_KEY, {
   algorithm: [config.jwt.ALGORITHM],
  });
 } catch (err) {
  throw err;
 }

 if (!payload) {
  throw { name: "Unauthorized", message: "Expired" };
 }

 try {
  token = await Token.findOne({
   email: payload.user.email,
   token: refresh_token,
  });

  user = await User.findOne({
   email: token.email,
  });
 } catch (err) {
  throw err;
 }

 if (!user) {
  throw { name: "Unauthorized", message: "No User Found" };
 }

 return await createAccessToken(user);
}

async function deleteRefreshToken(refresh_token) {
 const REFRESH_TOKEN_PUBLIC_KEY = config.jwt.REFRESH_TOKEN_PUBLIC_KEY;

 const payload = await jwt.verify(refresh_token, REFRESH_TOKEN_PUBLIC_KEY, {
  algorithm: [config.jwt.ALGORITHM],
 });

 if (!payload) {
  throw { name: "UnauthorizedError" };
 }

 try {
  await Token.findOneAndDelete({
   email: payload.user.email,
   token: refresh_token,
  });
 } catch (err) {
  throw { name: "UnexpectedError" };
 }

 return;
}

const express = require("express");
const router = express.Router();
const auth = require("../../middlewares/auth");
const parseCookies = require("../../utils/cookie");
const config = require("../../config");
const passport = require("passport");
const {
 getAccessTokenWithRefreshToken,
 getAccessTokenFromHeader,
 deleteRefreshToken,
 createAccessToken,
 createRefreshToken,
} = require("../../auth/jwt");
const Token = require("../../models/token");
const TOP_URL = "/auth";

function route() {
 router.post(`${TOP_URL}/`, getAccessToken);
 router.get(
  `${TOP_URL}/current`,
  passport.authenticate("jwt", { session: false }),
  getCurrentUser
 );
 router.post(`${TOP_URL}/google`, auth.Google, generateTokens);
 router.delete(`${TOP_URL}/`, deleteTokens);

 function getCurrentUser(req, res, next) {
  res.status(200).json({
   user: req.user,
  });
 }

 async function deleteTokens(req, res, next) {
  deleteRefreshToken(parseCookies(req).refresh_token)
   .then(() => {
    res.status(200).json({
     message: "User logged out",
    });
   })
   .catch((err) => {
    next(err);
   });
 }

 async function generateTokens(req, res, next) {
  try {
   const user = req.user.get();
   const access_token = await createAccessToken(user);
   const refresh_token = await createRefreshToken(user);

   if ((await Token.find({ email: user.email }).count()) > 4) {
    await Token.findOneAndDelete({ email: user.email }).sort({ createdAt: 1 });
   }

   await Token.create({
    email: user.email,
    token: refresh_token,
   });

   return res
    .cookie("refresh_token", refresh_token, {
     secure: config.production.IS_PROD,
     httpOnly: false,
     path: "/api/auth",
     expires: false,
    })
    .status(200)
    .json({ access_token, user });
  } catch (error) {
   next(error);
  }
 }

 function getAccessToken(req, res, next) {
  let refresh_token = null;

  try {
   refresh_token = parseCookies(req).refresh_token;
  } catch (err) {
   console.log(err);
   next(err);
  }

  getAccessTokenWithRefreshToken(refresh_token)
   .then((access_token) => {
    res.status(200).json({
     access_token,
    });
   })
   .catch((err) => {
    console.log(err);
    next(err);
   });
 }

 return router;
}

module.exports = route;

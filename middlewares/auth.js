const User = require("../services/user");
const config = require("../config");
const { OAuth2Client } = require("google-auth-library");
const { getAccessTokenFromHeader } = require("../auth/jwt");
const CLIENT_ID = config.Google.OAuth.CLIENT_ID;
const client = new OAuth2Client(CLIENT_ID);

module.exports = { Google, Socket };

async function Socket(req, res, next) {
 let auth;

 try {
  auth = JSON.parse(req.headers.authorization);
 } catch (err) {}

 req.user = new User({ username: auth.username, color: auth.theme });

 if (auth.email) {
  // Have account

  req.user.email = auth.email;
  req.user.picture = auth.picture;
 }

 next();
}

async function Google(req, res, next) {
 try {
  const { access_token } = req.body;

  const ticket = await client.verifyIdToken({
   idToken: access_token,
   audience: CLIENT_ID,
  });

  const { name, email, picture } = ticket.getPayload();
  const user = { name, email, picture };
  req.user = new User({ username: user.name, email, picture });

  const result = await req.user.signUp();

  next();
 } catch (err) {
  next();
 }
}

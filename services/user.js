const colors = ["#00cec9", "#0984e3", "#ff7675", "#6c5ce7"];
const UserModel = require("../models/user");
const ACCOUNT_TYPE = require("../constants").account.type;

class User {
 constructor({ username, color, socket_id, email, picture }) {
  this._username = username || "";
  this._color = color || this.randomizeColor();
  this._socket_id = socket_id || "";
  this._email = email || "";
  this._picture = picture || "";
  this._id = "";
 }

 get socket_id() {
  return this._socket_id;
 }

 set socket_id(socket_id) {
  this._socket_id = socket_id;
 }

 get username() {
  return this._username || `guest ${this._socket_id}`;
 }

 set username(username) {
  this._username = username;
 }

 get email() {
  return this._email || "";
 }

 set email(email) {
  this._email = email;
 }

 get picture() {
  return this._picture;
 }

 set picture(picture) {
  this._picture = picture;
 }

 get color() {
  return this._color;
 }

 set color(color) {
  this._color = color;
 }

 async signUp() {
  try {
   let query = { email: this._email },
    update = { last_login: new Date(), picture: this._picture },
    options = {
     email: this._email,
     username: this._username,
     picture: this._picture,
    };

   // Find the document
   let result = await UserModel.findOneAndUpdate(query, update, options);

   if (!result) {
    result = await UserModel.create({
     email: this._email,
     picture: this._picture,
     username: this._username,
    });
   }
  } catch (err) {
   return;
  }
 }

 async getTimeLimit() {
  try {
   if (!this._email) return 30;

   let user = await UserModel.findOne({ email: this._email });

   if (user.account_type === ACCOUNT_TYPE.BASIC) {
    return 90;
   }

   if (user.account_type === ACCOUNT_TYPE.PREMIUM) {
    return 180;
   }

   if (user.account_type === ACCOUNT_TYPE.ENTERPRISE) {
    return 0;
   }

   return 90;
  } catch (err) {
   return 30;
  }
 }

 randomizeColor() {
  return colors[Math.floor(Math.random() * colors.length)];
 }

 get() {
  return {
   id: this._id,
   socket_id: this._socket_id,
   username: this.username,
   color: this._color,
   email: this._email,
   picture: this._picture,
  };
 }
}

module.exports = User;

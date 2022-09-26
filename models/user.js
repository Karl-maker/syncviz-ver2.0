const mongoose = require("mongoose");
const constants = require("../constants");

//--------------------------------------------------------------------------------

const UserSchema = new mongoose.Schema(
 {
  username: { type: String, required: false },
  email: { type: String, required: true, unique: true },
  picture: { type: String, required: false },
  account_type: {
   type: String,
   required: true,
   default: constants.account.type.BASIC,
  },
  last_login: { type: Date, default: new Date(), required: false },
 },
 {
  timestamps: true,
 }
);

const User = mongoose.model("Users", UserSchema);

module.exports = User;

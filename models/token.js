const mongoose = require("mongoose");

//--------------------------------------------------------------------------------

const TokenSchema = new mongoose.Schema(
 {
  email: { type: String, required: true },
  token: { type: String, required: true },
 },
 {
  timestamps: true,
 }
);

const Token = mongoose.model("Tokens", TokenSchema);

module.exports = Token;

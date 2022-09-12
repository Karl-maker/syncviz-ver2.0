const mongoose = require("mongoose");

//--------------------------------------------------------------------------------

const VirtualSpaceSchema = new mongoose.Schema(
 {
  name: { type: String, default: "" },
  description: { type: String, default: "" },
  host: { type: String, required: true },
  time_limit: { type: Number, default: 360 },
  current_amount_attending: { type: Number, default: 0 },
  private: { type: Boolean, default: 0 },
  password: { type: String },
  code: { type: String, select: false },
  theme: { type: String, default: "#74b9ff" },
  link: { type: String },
  hashtags: { type: String },
  audio: {
   url: { type: String, default: "" },
  },
  model: {
   url: { type: String, default: "" },
   name: { type: String, default: "" },
  },
  user: {},
 },
 {
  timestamps: true,
 }
);

const VirtualSpace = mongoose.model("VirtualSpaces", VirtualSpaceSchema);

module.exports = VirtualSpace;

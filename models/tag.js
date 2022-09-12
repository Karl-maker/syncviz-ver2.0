const mongoose = require("mongoose");

//--------------------------------------------------------------------------------

const TagSchema = new mongoose.Schema(
 {
  virtual_room_id: { type: String, required: true },
  text: { type: String, required: true },
  description: { type: String },
  link: { type: String },
  type: { type: String, default: "info" },
  position: {
   x: { type: Number, default: 0 },
   y: { type: Number, default: 0 },
   z: { type: Number, default: 0 },
  },
 },
 {
  timestamps: true,
 }
);

const Tag = mongoose.model("Tags", TagSchema);

module.exports = Tag;

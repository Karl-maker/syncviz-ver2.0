const mongoose = require("mongoose");

//--------------------------------------------------------------------------------

const RecordSchema = new mongoose.Schema(
 {
  virtual_room_id: { type: String },
  virtual_room: {},
  views: { type: Number },
 },
 {
  timestamps: true,
 }
);

const Record = mongoose.model("Records", RecordSchema);

module.exports = Record;

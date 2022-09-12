const mongoose = require("mongoose");

const File3DSchema = new mongoose.Schema({
 virtual_room_id: {
  type: String,
  required: true,
 },
 name: {
  type: String,
  required: true,
 },
 blob: {
  data: Buffer,
  contentType: String,
 },
});

const File3D = mongoose.model("3DModel", File3DSchema);

module.exports = File3D;

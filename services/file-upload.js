const multer = require("multer");
const File3D = require("../models/file");
const fs = require("fs");
const re = /(?:\.([^.]+))?$/;
const AmazonWeb = require("../services/aws");
const config = require("../config");

// MIME Types for Models: https://www.iana.org/assignments/media-types/media-types.xhtml#model

class FileUpload {
 constructor(virtual_room_id) {
  this._virtual_room_id = virtual_room_id;
  this._name = "";
  this._ext = "glb";
  this._mime_type = "model/gltf-binary";
  this._url = "";
 }

 get virtual_room_id() {
  return this._virtual_room_id;
 }

 set virtual_room_id(virtual_room_id) {
  this._virtual_room_id = virtual_room_id;
 }

 get name() {
  return this._name;
 }

 set name(name) {
  this._name = name;
 }

 get ext() {
  return this._ext;
 }

 set ext(ext) {
  this._ext = ext;
 }

 get mime_type() {
  return this._mime_type;
 }

 set mime_type(mime_type) {
  this._mime_type = mime_type;
 }

 clearFileInstance = () => {
  fs.unlink(`./temps/${this._virtual_room_id}.${this._ext}`, (err) => {
   if (err) {
    console.log(err);
   }
  });
 };

 getStorage = () => {
  return multer.diskStorage({
   destination: "temps",
   filename: (req, file, cb) => {
    this._ext = re.exec(file.originalname)[1];
    this._mime_type = file.mimetype;
    this._name = file.originalname;
    cb(null, `${this._virtual_room_id}.${this._ext}`);
   },
  });
 };

 getUploadInstance = ({ key }) => {
  try {
   return multer({
    storage: this.getStorage(),
   }).single(key || "file-3d");
  } catch (err) {
   console.log(err);
  }
 };

 async uploadAudioFile(data) {
  const aws = new AmazonWeb();
  let virtual_space;

  /*

  Firstly check if room is still alive

  */

  const audio = fs.readFileSync(
   `./temps/${this._virtual_room_id}.${this._ext}`
  );

  return aws
   .objectUpload({
    bucketName: aws.bucket_names.AUDIO,
    keyName: `${this._virtual_room_id}.${this._ext}`,
    blob: audio,
   })
   .then((location) => {
    this._url = location;
    this.clearFileInstance();
    return 1;
   })
   .catch((err) => {
    console.log(err);
    throw err;
   });
 }

 async upload3DFile(data) {
  const aws = new AmazonWeb();
  let virtual_space;

  /*

  Firstly check if room is still alive

  */

  const model = fs.readFileSync(
   `./temps/${this._virtual_room_id}.${this._ext}`
  );

  return aws
   .objectUpload({
    bucketName: aws.bucket_names.MODELS,
    keyName: `${this._virtual_room_id}.${this._ext}`,
    blob: model,
   })
   .then((location) => {
    this._url = location;
    this.clearFileInstance();
    return 1;
   })
   .catch((err) => {
    console.log(err);
    throw err;
   });
 }

 clearModel({ object }) {
  // delete mongoDb models

  const aws = new AmazonWeb();
  return aws.objectDelete({
   bucketName: aws.bucket_names.MODELS,
   keyName: object ? object : `${this._virtual_room_id}.${this._ext}`,
  });
 }

 getUrl() {
  return this._url;
 }

 async getFile() {
  // Get mongoDB doc

  return;
 }
}

module.exports = FileUpload;

const express = require("express");
const FileUpload = require("../../services/file-upload");
const VirtualSpace = require("../../services/virtual-space");
const router = express.Router();
const constants = require("../../constants");

const TOP_URL = "/file";

function route() {
 const io = this.io;
 router.put(`${TOP_URL}/upload-3d/:virtual_space_id`, upload3DFile);
 router.put(`${TOP_URL}/upload-audio/:virtual_space_id`, uploadAudioFile);

 function uploadAudioFile(req, res, next) {
  const { virtual_space_id } = req.params;
  const fileUpload = new FileUpload(virtual_space_id);
  const upload = fileUpload.getUploadInstance({ key: "file-audio" });

  upload(req, res, (err) => {
   if (err) {
   } else {
    fileUpload
     .uploadAudioFile(req.file.filename)
     .then(() => {
      fileUpload.clearFileInstance();
      VirtualSpace.updateAudio(fileUpload.virtual_room_id, fileUpload.getUrl());
     })
     .then(() => {
      io
       .of(constants.namespaces.VIRTUAL_SPACE)
       .to(fileUpload.virtual_room_id)
       .emit("audio", {
        message: `Loading audio`,
        url: fileUpload.getUrl(),
        type: "audio",
       });
     })
     .then(() => {
      res.status(200).json({
       message: "successfully uploaded",
      });
      next();
     })
     .catch((err) => {
      next(err);
     });
   }
  });
 }

 function upload3DFile(req, res, next) {
  const { virtual_space_id } = req.params;
  const fileUpload = new FileUpload(virtual_space_id);
  const upload = fileUpload.getUploadInstance({});

  VirtualSpace.get(virtual_space_id)
   .then((virtual_room) => {
    const url = virtual_room.model.url;

    fileUpload.clearModel({ object: url ? url.split("/").pop() : "" });

    upload(req, res, (err) => {
     if (err) {
     } else {
      io
       .of(constants.namespaces.VIRTUAL_SPACE)
       .to(fileUpload.virtual_room_id)
       .emit("updates", {
        message: `Model update may take awhile`,
       });

      fileUpload
       .upload3DFile(req.file.filename)
       .then(() => {
        fileUpload.clearFileInstance();
        VirtualSpace.updateURL(
         fileUpload.virtual_room_id,
         fileUpload.getUrl(),
         fileUpload.name
        );
       })
       .then(() => {
        io
         .of(constants.namespaces.VIRTUAL_SPACE)
         .to(fileUpload.virtual_room_id)
         .emit("3D", {
          message: `Loading "${fileUpload.name}"`,
          url: fileUpload.getUrl(),
         });
       })
       .then(() => {
        res.status(200).json({
         message: "successfully uploaded",
        });
        next();
       })
       .catch((err) => {
        next(err);
       });
     }
    });
   })
   .catch((err) => {
    next(err);
   });
 }

 return router;
}

module.exports = route;

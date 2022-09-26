const express = require("express");
const VirtualSpace = require("../../services/virtual-space");
const router = express.Router();
const TOP_URL = "/virtual-room";

function route() {
 router.get(`${TOP_URL}`, getVirtualRooms);

 function getVirtualRooms(req, res, next) {
  const { q, limit, page } = req.query;

  VirtualSpace.searchVirtualRooms(q, { limit, page })
   .then((virtual_rooms) => {
    res.status(200).json(virtual_rooms);
   })
   .catch((err) => {
    //next(err);
    res.status(404).json({ virtual_rooms: [], amount: 0 });
   });
 }

 return router;
}

module.exports = route;

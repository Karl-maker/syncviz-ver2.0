const express = require("express");
const VirtualSpace = require("../../services/virtual-space");
const router = express.Router();
const passport = require("passport");
const TOP_URL = "/virtual-room";

function route() {
 router.get(`${TOP_URL}`, getVirtualRooms);
 router.get(
  `${TOP_URL}/find-one`,
  passport.authenticate("jwt", { session: false }),
  getOneVirtualRoom
 );
 router.get(`${TOP_URL}/promo`, getPromoVirtualRoom);

 return router;

 function getPromoVirtualRoom(req, res, next) {
  const limit = 3;
  const page = 1;
  const q = "";

  VirtualSpace.searchVirtualRooms(q, { limit, page, promo: true })
   .then((virtual_rooms) => {
    res.status(200).json(virtual_rooms);
   })
   .catch((err) => {
    //next(err);
    res.status(404).json({ virtual_rooms: [], amount: 0 });
   });
 }

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

 function getOneVirtualRoom(req, res, next) {
  const user = req.user;

  VirtualSpace.getByEmail(user.email)
   .then((virtual_room) => {
    res.status(200).json(virtual_room);
   })
   .catch((err) => {
    //next(err);
    res.status(404).json({});
   });
 }
}

module.exports = route;

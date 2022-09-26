const User = require("./user");
const Chat = require("./chat");
const { fetchSocketOrganizer } = require("../utils/socket");
const VirtualSpaceModel = require("../models/virtual-space");
const UserModel = require("../models/user");
const TagModel = require("../models/tag");
const FileUpload = require("../services/file-upload");
const constants = require("../constants");
const { deleteNull } = require("../utils/object");
const { checkIfValidHashtag } = require("../utils/hashtag-check");
const {
 default: targetsParser,
} = require("babel-preset-env/lib/targets-parser");
const Record = require("../models/record");
const re = /(?:\.([^.]+))?$/;

class VirtualSpace {
 constructor() {
  this._time_limit = 30;
  this._master = false;
  this._url = null;
 }

 // Getters and Setters

 get id() {
  return this._id;
 }

 set id(id) {
  this._id = id;
 }

 get creator_id() {
  return this._creator_id;
 }

 set creator_id(creator_id) {
  this._creator_id = creator_id;
 }

 get description() {
  return this._description;
 }

 set description(description) {
  this._description = description;
 }

 get url() {
  return this._url;
 }

 set url(url) {
  this._url = url;
 }

 get socket() {
  return this._socket;
 }

 set socket(socket) {
  this._socket = socket;
 }

 get attendee() {
  return this._attendee;
 }

 set attendee(attendee) {
  this._attendee = attendee;
 }

 get chat() {
  return this._chat;
 }

 set chat(chat) {
  this._chat = chat;
 }

 get master() {
  return this._master;
 }

 set master(master) {
  this._master = master;
 }

 get namespace() {
  return this._namespace;
 }

 set namespace(namespace) {
  this._namespace = namespace;
 }

 sendSurvey() {
  this._namespace.to(this._id).emit("link", {
   title: "Feedback",
   content:
    "Help us understand your needs better by taking part in our survey. We want to keep developing new features that target you and fix issues we may not see.",
   url: "https://qy1dv96qc5r.typeform.com/to/PHOgyVlt",
  });
 }

 async join(id) {
  // return message
  // Do database actions first..
  let virtual_space = {};
  let user = {};

  try {
   virtual_space = await VirtualSpaceModel.findOne({ _id: id });
  } catch (err) {
   throw err;
  }

  // Check if exists

  if (!virtual_space) {
   throw { name: "NotFound", message: "Metaverse room isn't found" };
  }

  // Socket operations
  this._id = id;
  this._description = virtual_space.description;
  this._time_limit = virtual_space.time_limit;
  this._creator_id = virtual_space.host;
  this._url = virtual_space.model.url;

  this._socket.join(id);

  virtual_space = await VirtualSpaceModel.findOneAndUpdate(
   { _id: id },
   { $inc: { current_amount_attending: 1 } },
   { new: true }
  );

  // try {
  //  // Record it
  //  await Record.findOneAndUpdate(
  //   { virtual_room_id: id },
  //   { $inc: { views: 1 } }
  //  );
  // } catch (err) {}

  if (virtual_space.user.email) {
   user = await UserModel.findOne({ email: virtual_space.user.email });
   virtual_space.user = user;

   // Check if master

   if (virtual_space.user.email === this._attendee.email) {
    this._master = true;
   }
  }

  // Initialize Chat

  this.initializeChat();

  return {
   message: "Joined Metaverse Room",
   virtual_space,
   manage: this._master,
  };
 }

 async manage(id, code) {
  // return message
  // Do database actions first..
  let virtual_space = {};
  let user = {};

  try {
   virtual_space = await VirtualSpaceModel.findOne({ _id: id, code: code });
  } catch (err) {
   throw {
    status: 404,
    name: "NotFound",
    message: "Invalid, Cannot Find",
    room: "manage",
   };
  }

  // Check if exists

  if (!virtual_space) {
   throw {
    status: 404,
    name: "NotFound",
    message: "Invalid, Cannot Find",
    room: "manage",
   };
  }

  // Socket operations
  this._id = id;
  this._description = virtual_space.description;
  this._time_limit = virtual_space.time_limit;
  this._creator_id = virtual_space.host;
  this._url = virtual_space.model.url;
  this._master = true;

  this._socket.join(id);

  virtual_space = await VirtualSpaceModel.findOneAndUpdate(
   { _id: id },
   { $inc: { current_amount_attending: 1 } },
   { new: true }
  );

  if (virtual_space.user.email) {
   user = await UserModel.findOne({ email: virtual_space.user.email });
   virtual_space.user = user;
  }

  // Initialize Chat

  this.initializeChat();

  return { message: "Joined Metaverse Room", virtual_space };
 }

 async getSocketClients(room) {
  let result = fetchSocketOrganizer(await room.fetchSockets());
  return result;
 }

 async leave() {
  await VirtualSpaceModel.findOneAndUpdate(
   { _id: this._id },
   { $inc: { current_amount_attending: -1 } }
  );
  this._socket.leave(this._id);
 }

 async end() {
  this.sendSurvey();
  const file = new FileUpload(this._id);
  let virtual = null;
  try {
   virtual = await VirtualSpaceModel.findOneAndDelete({ _id: this._id });
   await TagModel.deleteMany({ virtual_room_id: this._id });
   if (virtual.model.url) {
    file.clearModel({ object: virtual.model.url.split("/").pop() });
   }
  } catch (err) {}
 }

 async fetch() {
  this._socket.emit("attributes", {
   id: this._id,
   description: this._description,
   link: this._link,
   url: this._url,
   hashtags: this._hashtags,
  });
 }

 static async get(id) {
  return await VirtualSpaceModel.findOne({ _id: id });
 }

 static async getByEmail(email) {
  const virtual_room = await VirtualSpaceModel.findOne({
   "user.email": email,
  });
  return virtual_room;
 }

 async updateAttributes(attributes) {
  const object = deleteNull(attributes);
  let user = {};
  try {
   const new_virtualspace = await VirtualSpaceModel.findOneAndUpdate(
    { _id: this._id },
    object,
    { new: true }
   );

   //  // Record it
   //  await Record.findOneAndUpdate(
   //   { virtual_room_id: this._id },
   //   { virtual_room: new_virtualspace }
   //  );

   if (new_virtualspace.user.email) {
    user = await UserModel.findOne({ email: new_virtualspace.user.email });
    new_virtualspace.user = user;
   }

   this._description = new_virtualspace.description;
   this._link = new_virtualspace.link;
   this._hashtags = new_virtualspace.hashtags;
   return new_virtualspace;
  } catch (err) {
   throw { err };
  }
 }

 async checkIfAnyToManage() {
  let virtual_space = {};
  try {
   virtual_space = await VirtualSpaceModel.findOne({
    user: { email: this._attendee.email },
   });

   if (!virtual_space) {
    return false;
   }

   return virtual_space;
  } catch (err) {
   return false;
  }
 }

 async create({
  creator_id,
  description,
  username,
  user_theme,
  url,
  email,
  picture,
  time_limit,
 }) {
  // Creation Logic
  let virtual_space = null;
  try {
   virtual_space = await VirtualSpaceModel.create({
    host: creator_id,
    user: {
     username,
     picture: picture || "",
     theme: user_theme,
     email: email || "",
    },
    description,
    time_limit: time_limit,
   });
  } catch (err) {
   throw err;
  }

  this._time_limit = time_limit;

  // try {
  //  // Record it
  //  await Record.create({
  //   virtual_room: virtual_space,
  //   views: 0,
  //   virtual_room_id: virtual_space._id,
  //  });
  // } catch (err) {
  //  throw err;
  // }

  try {
   this._description = virtual_space.description;
   this._creator_id = creator_id;
   this._time_limit = virtual_space.time_limit;
   this._master = true;

   return {
    message: "Metaverse room created",
    virtual_space: virtual_space,
   };
  } catch (err) {
   throw err;
  }
 }

 async updateEnvironmentWithURL(code, { url, name }) {
  this._url = url;
  let virtual = null;
  const file = new FileUpload(this._id);

  try {
   virtual = await VirtualSpaceModel.findOne({ _id: this._id, code });
   await TagModel.deleteMany({ virtual_room_id: this._id });
   if (virtual.model.url) {
    const model_url = virtual.model.url;
    file.clearModel({ object: model_url.split("/").pop() });
   }
  } catch (err) {}

  try {
   return await VirtualSpaceModel.findOneAndUpdate(
    { _id: this._id, code },
    { model: { url, name } },
    { new: true }
   );
  } catch (err) {
   throw { err };
  }
 }

 async time(room) {
  // shedule an end where they all disconnect
  let i = 0;
  if (this._time_limit === 0) return;

  const timer = setInterval(() => {
   i++;
   trackTimer(i);
  }, 60000);

  const trackTimer = (minutes) => {
   if (minutes >= this._time_limit) {
    room.emit("alerts", {
     message: `Metaverse room has closed`,
    });
    this.end()
     .then(() => {
      clearInterval(timer);
      room.disconnectSockets();
      this._socket.disconnect(true);
     })
     .catch((err) => {
      console.log(err);
     });
   }
  };
 }

 initializeChat() {
  this._chat = new Chat({
   vs_id: this._id,
   socket: this._socket,
  });
 }

 // Static

 static async searchVirtualRooms(query, { limit, page, promo }) {
  let checkIfPromo = {};
  if (promo) {
   checkIfPromo = { promo: true };
  }

  let amount = 0,
   virtual_rooms = [];
  try {
   // check if query is #
   if (checkIfValidHashtag(query)) {
    amount = await VirtualSpaceModel.countDocuments({
     hashtags: q,
     private: false,
     ...checkIfPromo,
    });
    virtual_rooms = await VirtualSpaceModel.find({
     hashtags: q,
     private: false,
     ...checkIfPromo,
    })
     .limit(limit * 1)
     .skip((page - 1) * limit);

    return { amount, virtual_rooms };
   }
   amount = await VirtualSpaceModel.countDocuments({
    description: { $regex: query, $options: "i" },
    private: false,
    ...checkIfPromo,
   });
   // seach as normal if not
   virtual_rooms = await VirtualSpaceModel.find({
    description: { $regex: query, $options: "i" },
    private: false,
    ...checkIfPromo,
   })
    .limit(limit * 1)
    .skip((page - 1) * limit);

   return { amount, virtual_rooms };
  } catch (err) {
   throw err;
  }
 }

 static async updateURL(id, url, name) {
  try {
   await TagModel.deleteMany({ virtual_room_id: id });
   await VirtualSpaceModel.findOneAndUpdate(
    { _id: id },
    {
     model: {
      url,
      name,
     },
    }
   );
  } catch (err) {}
  return;
 }

 static async updateAudio(id, url) {
  try {
   await VirtualSpaceModel.findOneAndUpdate(
    { _id: id },
    {
     audio: {
      url,
     },
    }
   );
  } catch (err) {}
  return;
 }

 async getAllTags() {
  let tags = [];
  try {
   tags = await TagModel.find({
    virtual_room_id: this._id,
   });
   return tags;
  } catch (err) {
   return [];
  }
 }

 async addTag(data) {
  const { text, description, link, type, position } = data;
  let tag = {};
  try {
   tag = await TagModel.create({
    virtual_room_id: this._id,
    text,
    description,
    link,
    type,
    position,
   });
   return tag;
  } catch (err) {
   return;
  }
 }

 async deleteTag(id) {
  let tag = {};
  try {
   tag = await TagModel.findOneAndDelete({
    _id: id,
   });
   return tag;
  } catch (err) {
   return;
  }
 }
}

module.exports = VirtualSpace;

import { io } from "socket.io-client";
import ChatRoom from "./chat-room";
import User from "./user";
import makeid from "../utils/others/generateString";
import config from "../config";
import LiveConnection from "./liveConnection";

const BACKEND = config.API.LIVE_SERVER;

class VirtualSpace {
  constructor(id, { attendee, name, link, description, url, hashtags }) {
    try {
      this._id =
        id || JSON.parse(localStorage.getItem("current_room")).id || null;
      this._code =
        JSON.parse(localStorage.getItem("current_room")).code || null;
    } catch (err) {
      this._id = id;
      this._code = null;
    }

    this._description = description || "";
    this._attendee = attendee || { username: "Guest" };
    this._socket = null;
    this._init = false;
    this._manage = false;
    this._chat_room = null;
    this._time_limit = 0;
    this._host = new User("", "");
    this._url = url || null;
    this._link = link || "";
    this._connected = true;
    this._hashtags = hashtags || "";
    this._connection = new LiveConnection();
  }

  get connected() {
    return this._connected;
  }

  set connected(connected) {
    this._connected = connected;
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  get connection() {
    return this._connection;
  }

  set connection(connection) {
    this._connection = connection;
  }

  get code() {
    return this._code;
  }

  set code(code) {
    this._code = code;
  }

  get init() {
    return this._init;
  }

  set init(init) {
    this._init = init;
  }

  get socket() {
    return this._socket;
  }

  set socket(socket) {
    this._socket = socket;
  }

  get url() {
    return this._url;
  }

  set url(url) {
    this._url = url;
  }

  get hashtags() {
    return this._hashtags;
  }

  set hashtags(hashtags) {
    this._hashtags = hashtags;
  }

  get host() {
    return this._host;
  }

  set host({ username, theme }) {
    this._host = new User(username, theme);
  }

  get attendee() {
    return this._attendee;
  }

  set attendee(attenddee) {
    this._attendee = attenddee;
  }

  get link() {
    return this._link;
  }

  set link(link) {
    this._link = link;
  }

  get description() {
    return this._description;
  }

  set description(description) {
    this._description = description;
  }

  get manage() {
    return this._manage;
  }

  set manage(manage) {
    this._manage = manage;
  }

  get time_limit() {
    return this._time_limit;
  }

  set time_limit(time_limit) {
    this._time_limit = time_limit;
  }

  get chat_room() {
    return this._chat_room;
  }

  set chat_room(chat_room) {
    this._chat_room = chat_room;
  }

  get peer() {
    return this._peer;
  }

  set peer(peer) {
    this._peer = peer;
  }

  // Methods

  connect({ id }) {
    try {
      this._socket = io.connect(`${BACKEND}/virtual-space`, {
        // reconnection: true,
        // reconnectionDelay: 1000,
        // reconnectionDelayMax: 5000,
        // reconnectionAttempts: 99999,
        extraHeaders: {
          Authorization: `{ "username": "${this._attendee.username}", "theme": "${this._attendee.theme}" }`,
        },
        query: { virtual_space_id: this._id || "" },
      });
      this._init = true;
      this._chat_room = new ChatRoom({ socket: this._socket });
      return this._socket;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }

  reconnect() {
    if (this._init) {
      if (!this._socket) {
      } else {
        return this._socket.socket.connect();
      }
    } else {
      this._socket.disconnect();
    }
  }

  join() {
    this._socket.emit("join", { id: this._id });
  }

  end() {
    this.clean();
    this._socket.emit("delete", { placeholder: "ending" });
  }

  clean() {
    window.localStorage.setItem(
      "current_room",
      JSON.stringify({
        id: "",
        code: "",
      })
    );
  }

  setLocal() {
    window.localStorage.setItem(
      "current_room",
      JSON.stringify({
        id: this._id,
        code: this._code,
      })
    );
  }

  create() {
    let code = makeid(20);

    this._code = code;

    this._socket.emit("create", {
      description: this._description,
      code,
    });

    this._manage = true;
  }

  manageVirtualRoom() {
    this._socket.emit("manage", { id: this._id, code: this._code });
  }

  transmitSound(chunk, callback) {
    this._socket.emit("transmit-sound", chunk);
    callback();
  }

  updateUser() {
    this._socket.emit("update-user", {
      username: this._attendee.username,
      theme: this._attendee.theme,
    });
  }

  addTag(data) {
    this._socket.emit("add-tag", data);
  }

  deleteTag(id) {
    this._socket.emit("delete-tag", {
      tag_id: id,
    });
  }

  updateAttributes(attributes) {
    this._socket.emit("attributes", attributes);
  }

  async updateEnvironment(url, name) {
    this._socket.emit("update-environment-url", {
      code: this._code,
      url,
      name,
    });
  }

  transfer3D(formData) {
    //this._code;
    return fetch(`${BACKEND}/api/file/upload-3d/${this._id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => {});
  }

  transferAudio(formData) {
    //this._code;
    return fetch(`${BACKEND}/api/file/upload-audio/${this._id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
      body: formData,
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => {});
  }

  static searchMetaverseRooms(query) {
    return fetch(
      `${BACKEND}/api/virtual-room?q=${query}&limit=${6}&page=${1}`,
      {
        method: "GET",
      }
    )
      .then((response) => {
        return response.json();
      })
      .catch((err) => {});
  }
}

export default VirtualSpace;

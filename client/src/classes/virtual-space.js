import { io } from "socket.io-client";
import ChatRoom from "./chat-room";
import User from "./user";
import makeid from "../utils/others/generateString";
import config from "../config";
import LiveConnection from "./liveConnection";
import axios from "axios";

const BACKEND = config.API.LIVE_SERVER;

class VirtualSpace {
  constructor(id, { attendee, name, link, description, url, hashtags }) {
    this._id = id;
    this._code = null;

    this._description = description || "Welcome to my Virtual Space";
    this._attendee = attendee || { username: "Guest" };
    this._socket = null;
    this._init = false;
    this._manage = false;
    this._chat_room = null;
    this._ended = false;
    this._time_limit = 0;
    this._host = new User("", "");
    this._url = url || null;
    this._link = link || "";
    this._connected = true;
    this._hashtags = hashtags || "";
    this._connection = new LiveConnection();
    this._createdAt = null;
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

  set host({ username, theme, picture }) {
    this._host = new User(username, theme, picture);
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

  get ended() {
    return this._ended;
  }

  set ended(ended) {
    this._ended = ended;
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

  get createdAt() {
    return this._createdAt;
  }

  set createdAt(createdAt) {
    this._createdAt = createdAt;
  }

  // Methods

  connect({ id }) {
    let Authorization = `{ "username": "${this._attendee.username}", "theme": "${this._attendee.theme}"`;

    if (this._attendee.email) {
      Authorization = Authorization.concat(
        `, "email": "${this._attendee.email}"`
      );
    }

    if (this._attendee.img) {
      Authorization = Authorization.concat(
        `, "picture": "${this._attendee.img}"`
      );
    }

    Authorization = Authorization.concat(" }");

    try {
      this._socket = io.connect(`${BACKEND}/virtual-space`, {
        // reconnection: true,
        // reconnectionDelay: 1000,
        // reconnectionDelayMax: 5000,
        // reconnectionAttempts: 99999,
        extraHeaders: {
          Authorization,
        },
        query: { virtual_space_id: this._id || "" },
      });
      this._init = true;
      this._chat_room = new ChatRoom({ socket: this._socket });
      return this._socket;
    } catch (err) {
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
    this._ended = true;
    this._socket.emit("delete", { placeholder: "ending" });
    this.clean();
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

  manageVirtualRoom({ id, code }) {
    if (id && code) {
      this._id = id;
      this._code = code;
    }

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

  getTags() {
    this._socket.emit("get-tags", { placeholder: 1 });
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

  async transfer3D(formData, progressCallBack) {
    //this._code;
    // return fetch(`${BACKEND}/api/file/upload-3d/${this._id}`, {
    //   method: "PUT", // *GET, POST, PUT, DELETE, etc.
    //   body: formData,
    // })
    //   .then((response) => {
    //     return response.json();
    //   })
    //   .catch((err) => {});

    /*

      TEST

      */

    // const xhr = new XMLHttpRequest();
    // const success = await new Promise((resolve) => {
    //   xhr.upload.addEventListener("progress", (event) => {
    //     if (event.lengthComputable) {
    //       console.log("upload progress:", event.loaded / event.total);
    //       // uploadProgress.value = event.loaded / event.total;
    //     }
    //   });

    //   xhr.addEventListener("progress", (event) => {
    //     if (event.lengthComputable) {
    //       console.log("download progress:", event.loaded / event.total);
    //       //downloadProgress.value = event.loaded / event.total;
    //     }
    //   });

    //   xhr.addEventListener("loadend", () => {
    //     resolve(xhr.readyState === 4 && xhr.status === 200);
    //   });

    //   xhr.open("PUT", `${BACKEND}/api/file/upload-3d/${this._id}`, true);

    //   xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    //   xhr.send(formData);
    //  });
    return axios
      .put(`${BACKEND}/api/file/upload-3d/${this._id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: function (progressEvent) {
          const percentCompleted = Math.round(
            (progressEvent.loaded / progressEvent.total) * 100
          );
          progressCallBack(percentCompleted);
        },
      })
      .then((res) => {
        return res;
      })
      .catch((err) => {
        throw err;
      });
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

  static searchMetaverseRooms(query, { page, amount }) {
    return fetch(
      `${BACKEND}/api/virtual-room?q=${query}&limit=${amount}&page=${
        page || 1
      }`,
      {
        method: "GET",
      }
    )
      .then((response) => {
        return response.json();
      })
      .catch((err) => {});
  }

  static searchPromoMetaverseRooms() {
    return fetch(`${BACKEND}/api/virtual-room/promo`, {
      method: "GET",
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((response) => {
        return response.json();
      })
      .catch((err) => {});
  }
}

export default VirtualSpace;

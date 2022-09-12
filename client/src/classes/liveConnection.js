export default class LiveConnection {
  constructor() {
    this._id = null;
    this._signal = null;
    this._socket_id = null;
  }
  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  get signal() {
    return this._signal;
  }

  set signal(signal) {
    this._signal = signal;
  }

  get socket_id() {
    return this._socket_id;
  }

  set socket_id(socket_id) {
    this._socket_id = socket_id;
  }
}

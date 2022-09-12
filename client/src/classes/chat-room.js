class ChatRoom {
  constructor({ socket }) {
    this._messages = [];
    this._socket = socket || null;
  }

  get messages() {
    return this._messages;
  }

  set messages(messages) {
    this._messages = messages;
  }

  display() {
    return (
      <div style={{ marginTop: "auto" }}>
        {this._messages.map((message, index) => (
          <li key={index} style={{ marginBottom: "5px" }}>
            {message.display()}
          </li>
        ))}
      </div>
    );
  }

  add(message) {
    // If they're more than x amount of messages delete the first one...
    this._messages.push(message);
  }

  send(message) {
    this._socket.emit("send-message", { message });
  }
}

export default ChatRoom;

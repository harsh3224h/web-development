const EventEmitter = require("node:events");

class ChatRoom extends EventEmitter {
  constructor() {
    super();
    this.users = new Set();
  }

  join(user) {
    this.users.add(user);
    this.emit("joined", user);
  }

  leave(user) {
    if (this.users.has(user)) {
      this.users.delete(user);
      this.emit("left", user);
    } else {
      this.emit("notInChat", user);
    }
  }

  sendMessage(user, message) {
    if (this.users.has(user)) {
      this.emit("message", user, message);
    } else {
      this.emit("notInChat", user);
    }
  }
}

module.exports = ChatRoom;

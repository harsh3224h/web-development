const ChatRoom = require("./chatRoom");

const chat = new ChatRoom();

chat.on("joined", (user) => {
  console.log(`${user} joined the chat!`);
});
chat.on("left", (user) => {
  console.log(`${user} left the chat!`);
});
chat.on("message", (user, message) => {
  console.log(`${user}: ${message}`);
});
chat.on("notInChat", (user) => {
  console.log(`${user} is not in Chat!`);
});

chat.join("Alice");
chat.join("Bob");

chat.sendMessage("Alice", "Hi fellas!");
chat.sendMessage("Bob", "I'm happy to be here");

chat.leave("Alice");
// chat.leave("Bob");

chat.sendMessage("Alice", "Hi again!");
chat.sendMessage("Bob", "I love open world games!");

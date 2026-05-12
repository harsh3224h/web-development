const EventEmitter = require("events");
const eventEmitter = new EventEmitter();

eventEmitter.on("greet", (username) => {
  console.log(`Hi, ${username}, just keep going!`);
});

eventEmitter.emit("greet", "Harsh");
eventEmitter.emit("greet", "Bro");

eventEmitter.once("notify", (username) => {
  console.log(`Hi, ${username}, from once occuring event`);
});

eventEmitter.emit("notify", "Harsh");
eventEmitter.emit("notify", "Bro"); // this will not work

// seperate listener
const myListener = () => {
  console.log("We created a seperate listener!");
};
eventEmitter.on("test", myListener);
eventEmitter.on("test", () => console.log("Second listener on test"));

eventEmitter.emit("test");
// eventEmitter.removeListener("test", myListener);
eventEmitter.emit("test");

console.log(eventEmitter.listeners("test"));

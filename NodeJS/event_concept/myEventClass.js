const EventEmitter = require("events");
const eventEmitter = new EventEmitter();

// creating event & listener
eventEmitter.on("error", (err) => {
  console.log(`Error occured: ${err.message}`);
});

// invoking the event
eventEmitter.emit("error", new Error("Test error"));

const express = require("express");

const app = express();

app.get("/", function (req, res) {
  res.end("You are in the home route");
});

app.get("/contact", function (req, res) {
  res.end("You can contact me at: harshdhiman7044@gmail.com");
});

app.get("/tweet", function (req, res) {
  res.end("Tweet created successfully");
});

app.post("/tweets", function (req, res) {
  res.status(201).end("Tweets posted successfully");
});

app.listen(8000, () => {
  console.log("Server is running at port-> 8000");
});

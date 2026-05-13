const http = require("http");

const server = http.createServer(function (req, res) {
  console.log("I got a incoming request");
  res.writeHead(200);
  res.end("Request recieved successfully");
});

server.listen(8000, function () {
  console.log("HTTP server is running on port 8000");
});

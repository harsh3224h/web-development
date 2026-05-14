const http = require("node:http");

const server = http.createServer((req, res) => {
  // console.log(`Incoming request at ${Date.now()}`);
  // console.log(req.headers);
  // console.log(req.method);
  // res.end(`You can accept in ${req.headers["accept-language"]}`);

  console.log(req.url);
  switch (req.url) {
    case "/":
      res.writeHead(200);
      return res.end("HomePage");

    case "/contact":
      res.writeHead(200);
      return res.end("Contact Page");

    case "/about":
      res.writeHead(200);
      return res.end("About Page");
    default:
      res.writeHead(404);
      return res.end("You're lost");
  }
});

server.listen(8000, () => {
  console.log("server is running on port 8000");
});

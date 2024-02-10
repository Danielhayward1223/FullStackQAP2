const http = require("http");
const fs = require("fs");
global.DEBUG = true;

const server = http.createServer((request, response) => {
  if (DEBUG) console.log("URL requested: " + request.url);
  switch (request.url) {
    case "/":
      if (DEBUG) console.log("Base Page");
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end("<h1>Welcome to the base page!</h1>");
      break;

    case "/about":
      if (DEBUG) console.log("About Page");
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end("<h1>Welcome to the about page!</h1>");
      break;

    case "/contact":
      if (DEBUG) console.log("Contact Page");
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end("<h1>Welcome to the contact page!</h1>");
      break;

    case "/products":
      if (DEBUG) console.log("products Page");
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end("<h1>Welcome to the products page!</h1>");
      break;

    case "/subscribe":
      if (DEBUG) console.log("Subscribe Page");
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end("<h1>Welcome to the subscribe page!</h1>");
      break;
  }
});
server.listen(3000, () => {
  console.log("Server is running...");
});

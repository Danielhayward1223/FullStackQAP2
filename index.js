const http = require("http");
const fs = require("fs");
const path = require("path");
global.DEBUG = true;

const EventEmitter = require("events");
class RouteEmitter extends EventEmitter {}
const routeEmitter = new EventEmitter();
const routes = require("./routes.js");

routeEmitter.on("route", (url) => {
  const d = new Date();

  if (DEBUG) console.log(`Route event triggered: ${url} at ${d}`);
  if (!fs.existsSync(path.join(__dirname, "logs"))) {
    fs.mkdirSync(path.join(__dirname, "logs"));
  }
  fs.appendFile(
    path.join(__dirname, "logs", "routes.log"),
    `Route event triggered: ${url} at ${d}\n`,
    (error) => {
      if (error) throw error;
    }
  );
});

const server = http.createServer((request, response) => {
  if (DEBUG) console.log("URL requested: " + request.url);
  let path = "./pages/";
  switch (request.url) {
    case "/":
      path += "base.html";
      routeEmitter.emit("route", path);
      routes.basePage(path, response);
      break;
    case "/about":
      path += "about.html";
      routeEmitter.emit("route", path);
      routes.aboutPage(path, response);
      break;

    case "/contact":
      path += "contact.html";
      routeEmitter.emit("route", path);
      routes.contactPage(path, response);
      break;

    case "/products":
      path += "products.html";
      routeEmitter.emit("route", path);
      routes.productsPage(path, response);
      break;

    case "/subscribe":
      path += "subscribe.html";
      routeEmitter.emit("route", path);
      routes.subscribePage(path, response);
      break;
  }
});
server.listen(3000, () => {
  console.log("Server is running...");
});

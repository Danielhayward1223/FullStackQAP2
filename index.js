// importing the http, filesystem, and path modules.
const http = require("http");
const fs = require("fs");
const path = require("path");
// adding the global debug
global.DEBUG = true;

// importing the event emitter module.
const EventEmitter = require("events");
class RouteEmitter extends EventEmitter {}
const routeEmitter = new EventEmitter();
// getting the routes from the routes file.
const routes = require("./routes.js");

// making the event emitter that logs all route changes.
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

// creating the server.
const server = http.createServer((request, response) => {
  if (DEBUG) console.log("URL requested: " + request.url);
  // making the beginning of the path string.
  let path = "./pages/";
  // added the switch statement for each of the pages.
  switch (request.url) {
    case "/":
      path += "base.html";
      // Trigger for the event emitter.
      routeEmitter.emit("route", path);
      // Invoking the function for the individual page in the routes file.
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
// Making the server listen to port 3000.
server.listen(3000, () => {
  console.log("Server is running...");
});

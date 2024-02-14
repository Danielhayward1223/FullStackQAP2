const fs = require("fs");

function basePage(path, response) {
  fetchFile(path, response);
}

function aboutPage(path, response) {
  fetchFile(path, response);
}

function contactPage(path, response) {
  fetchFile(path, response);
}

function productsPage(path, response) {
  fetchFile(path, response);
}

function subscribePage(path, response) {
  fetchFile(path, response);
}

function fetchFile(fileName, response) {
  fs.readFile(fileName, (error, content) => {
    if (error) {
      response.writeHead(500, { "Content-Type": "text/plain" });
      response.end("500 Internal Server Error");
    } else {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.end(content, "utf-8");
    }
  });
}

module.exports = {
  basePage,
  aboutPage,
  contactPage,
  productsPage,
  subscribePage,
};

/**
 *Serevr-realated task
 */
// Dependencies

const http = require("http");
const https = require("https");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;
const config = require("./config");
const fs = require("fs");
const _data = require("./data");
const handlers = require("./handlers");
const helpers = require("./helpers");
const mongoose = require("mongoose");
const path = require("path");
const dbURI = require(path.join(__dirname, "/../.data/secret"));

// Instantiate the server moudele object
const server = {};

// Instantiate the http server
server.httpServer = http.createServer(function (req, res) {
  server.unifiedServer(req, res);
});

// Instantiate the https server
server.httpsServerOptions = {
  key: fs.readFileSync(path.join(__dirname, "/../https/key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "/../https/cert.pem")),
};
server.httpsServer = https.createServer(
  server.httpsServerOptions,
  function (req, res) {
    server.unifiedServer(req, res);
  }
);

// All the server logic for both http and https server
server.unifiedServer = function (req, res) {
  // Get the URL and parse it
  const parseUrl = url.parse(req.url, true);

  // Get the path
  const path = parseUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");

  // Get the Query String as an object
  const queryStringObject = parseUrl.query;

  // Get the http method
  const method = req.method.toLowerCase();

  // Get the headers as an object
  const headers = req.headers;

  // Gett the payload if there is
  const decoder = new StringDecoder("utf-8");
  let buffer = "";
  req.on("data", function (data) {
    buffer += decoder.write(data);
  });
  req.on("end", function () {
    buffer += decoder.end();

    // Choose the handler this request should go to, if one is not found use the not found handler
    let chosenHandler =
      typeof server.router[trimmedPath] !== "undefined"
        ? server.router[trimmedPath]
        : handlers.notFound;

    // If the request is within the public directory use to the public handler instead
    chosenHandler =
      trimmedPath.indexOf("public/") > -1 ? handlers.public : chosenHandler;

    // Construct the data object to send to the fandler
    const data = {
      trimmedPath: trimmedPath,
      queryStringObject: queryStringObject,
      method: method,
      headers: headers,
      payload: helpers.parseJsonToObject(buffer),
    };

    // Route the request to the hndler specified in the router
    chosenHandler(data, function (statusCode, payload, contentType) {
      // Detmine the type of response (fallback to json)
      contentType = typeof contentType == "string" ? contentType : "json";

      // Use the status code called back by the handler, or default to 200
      statusCode = typeof statusCode == "number" ? statusCode : 200;

      // Return the response that are content-speicific
      let payloadString = "";
      if (contentType == "json") {
        res.setHeader("Content-Type", "application/json");
        payload = typeof payload == "object" ? payload : {};
        const payloadString = JSON.stringify(payload);
      }
      if (contentType == "html") {
        res.setHeader("Content-Type", "text/html");
        payloadString = typeof payload == "string" ? payload : "";
      }
      if (contentType == "favicon") {
        res.setHeader("Content-Type", "image/x-icon");
        payloadString = typeof payload !== "undefined" ? payload : "";
      }

      if (contentType == "plain") {
        res.setHeader("Content-Type", "text/plain");
        payloadString = typeof payload !== "undefined" ? payload : "";
      }

      if (contentType == "css") {
        res.setHeader("Content-Type", "text/css");
        payloadString = typeof payload !== "undefined" ? payload : "";
      }

      if (contentType == "png") {
        res.setHeader("Content-Type", "image/png");
        payloadString = typeof payload !== "undefined" ? payload : "";
      }

      if (contentType == "jpg") {
        res.setHeader("Content-Type", "image/jpeg");
        payloadString = typeof payload !== "undefined" ? payload : "";
      }

      // Return the response-part that are common to all content type
      res.writeHead(statusCode);
      res.end(payloadString);
      // Log the request path
      console.log(`Returning this response: `, statusCode, payloadString);
    });
  });
};

// Define a request router
server.router = {
  "": handlers.index,
  "account/create": handlers.accountCreate,
  "account/edit": handlers.accountEdit,
  "account/deleted": handlers.accountDeleted,
  "session/create": handlers.sessionCrate,
  "session/deleted": handlers.sessionDeleted,
  "mails/all": handlers.allMails,
  "listOfMails/all": handlers.allListOfMails,
  "mails/create": handlers.mailsCreate,
  "listOfMails/create": handlers.listOfMailsCreate,
  "mails/edit": handlers.mailsEdit,
  "listOfMails/all": handlers.listOfMailsEdit,
  ping: handlers.ping,
  "api/users": handlers.users,
  "api/tokens": handlers.tokens,
  "api/mails": handlers.mails,
  "api/listOfMails": handlers.listOfMails,
  "favicon.ico": handlers.favicon,
  public: handlers.public,
};

// Init function
server.init = function () {
  // Connect to mongoDB
  mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
      console.log("Connect to db"),
        // Srart the http server
        server.httpServer.listen(config.httpPort, function () {
          console.log(`The server is listening on port ${config.httpPort} `);
        }), // Srart the https server
        server.httpsServer.listen(config.httpsPort, function () {
          console.log(`The server is listening on port ${config.httpsPort} `);
        });
    })
    .catch((err) => console.log(err));
};

// Export the mousole
module.exports = server;

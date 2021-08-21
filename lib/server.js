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
import favicon from "serve-favicon";


// Instantiate the server moudele object
const server = {};

// Instantiate the HTTP server
server.httpServer = http.createServer(function (req, res) {
  server.unifiedServer(req, res);
});

// Instantiate the HTTPS server
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

// All the server logic for both the http and https server
server.unifiedServer = function (req, res) {
  // Parse the url
  const parsedUrl = url.parse(req.url, true);

  // Get the path
  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, "");

  // Get the query string as an object
  const queryStringObject = parsedUrl.query;

  // Get the HTTP method
  const method = req.method.toLowerCase();

  //Get the headers as an object
  const headers = req.headers;

  // Get the payload,if any
  const decoder = new StringDecoder("utf-8");
  let buffer = "";
  req.on("data", function (data) {
    buffer += decoder.write(data);
  });
  req.on("end", function () {
    buffer += decoder.end();

    // Check the router for a matching path for a handler. If one is not found, use the notFound handler instead.
    let chosenHandler =
      typeof server.router[trimmedPath] !== "undefined"
        ? server.router[trimmedPath]
        : handlers.notFound;

    // If the request is within the public directory use to the public handler instead
    chosenHandler =
      trimmedPath.indexOf("public/") > -1 ? handlers.public : chosenHandler;

    // Construct the data object to send to the handler
    const data = {
      trimmedPath: trimmedPath,
      queryStringObject: queryStringObject,
      method: method,
      headers: headers,
      payload: helpers.parseJsonToObject(buffer),
    };

    // Route the request to the handler specified in the router
    chosenHandler(data, function (statusCode, payload, contentType) {
      // Determine the type of response (fallback to JSON)
      contentType = typeof contentType == "string" ? contentType : "json";

      // Use the status code returned from the handler, or set the default status code to 200
      statusCode = typeof statusCode == "number" ? statusCode : 200;

      // Return the response parts that are content-type specific
      let payloadString = "";
      if (contentType == "json") {
        res.setHeader("Content-Type", "application/json");
        payload = typeof payload == "object" ? payload : {};
        payloadString = JSON.stringify(payload);
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

      // Return the response-parts common to all content-types
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
  "session/create": handlers.sessionCreate,
  "session/deleted": handlers.sessionDeleted,
  "mails/all": handlers.allMails,
  "mails/create": handlers.mailsCreate,
  "listOfMails/create": handlers.listOfMailsCreate,
  "mails/edit": handlers.mailsEdit,
  "listOfMails/edit": handlers.listOfMailsEdit,
  ping: handlers.ping,
  "api/users": handlers.users,
  "api/tokens": handlers.tokens,
  "api/mails": handlers.mails,
  "api/listOfMails": handlers.listOfMails,
  "api/send": handlers.send,
  "favicon.ico": handlers.favicon,
  public: handlers.public,
  "sendMails/list": handlers.sendMails,
  "sendMails/sing": handlers.sendMails,
};

// Init function
server.init = function () {
  // Connect to mongoDB
  mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => {
      console.log("Connect to db"),
        // Start the HTTP server
        server.httpServer.listen(config.httpPort, function () {
          console.log(
            "\x1b[36m%s\x1b[0m",
            "The HTTP server is running on port " + config.httpPort
          );
        });

      // Start the HTTPS server
      server.httpsServer.listen(config.httpsPort, function () {
        console.log(
          "\x1b[35m%s\x1b[0m",
          "The HTTPS server is running on port " + config.httpsPort
        );
      });
    })
    .catch((err) => console.log(err));
};

// Export the mousole
module.exports = server;

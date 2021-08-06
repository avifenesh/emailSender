/*
 *Primary file for API
 */

// Dependencies

const http = require("http");
const https = require("https");
const url = require("url");
const StringDecoder = require("string_decoder").StringDecoder;
const config = require("./lib/config");
const fs = require("fs");
const _data = require("./lib/data");
const handlers = require("./lib/handlers");
const helpers = require("./lib/helpers");
const mongoose = require("mongoose");

// Instantiate the http server
const httpServer = http.createServer(function (req, res) {
  unifiedServer(req, res);
});

// Instantiate the https server
const httpsServerOptions = {
  key: fs.readFileSync("./https/key.pem"),
  cert: fs.readFileSync("./https/cert.pem"),
};
const httpsServer = https.createServer(httpsServerOptions, function (req, res) {
  unifiedServer(req, res);
});

// Connect to mongoDB
const dbURI = "";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("Connect to db"),
      // Srart the http server
      httpServer.listen(config.httpPort, function () {
        console.log(`The server is listening on port ${config.httpPort} `);
      }), // Srart the https server
      httpsServer.listen(config.httpsPort, function () {
        console.log(`The server is listening on port ${config.httpsPort} `);
      });
  })
  .catch((err) => console.log(err));

// All the server logic for both http and https server
const unifiedServer = function (req, res) {
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
    const chooseHandler =
      typeof router[trimmedPath] !== "undefined"
        ? router[trimmedPath]
        : handlers.notFound;

    // Construct the data object to send to the fandler
    const data = {
      trimmedPath: trimmedPath,
      queryStringObject: queryStringObject,
      method: method,
      headers: headers,
      payload: helpers.parseJsonToObject(buffer),
    };

    // Route the request to the hndler specified in the router
    chooseHandler(data, function (statusCode, payload) {
      // Use the status code called back by the handler, or default to 200
      statusCode = typeof statusCode == "number" ? statusCode : 200;
      // Use the payload callback by the handler, or default to an empty object
      payload = typeof payload == "object" ? payload : {};

      // convert the payload to a string
      const payloadString = JSON.stringify(payload);

      // Return the response
      res.setHeader("Content-Type", "application/json");
      res.writeHead(statusCode);
      res.end(payloadString);
      // Log the request path
      console.log(`Returning this response: `, statusCode, payloadString);
    });
  });
};

// Define a request router
const router = {
  ping: handlers.ping,
  users: handlers.users,
  tokens: handlers.tokens,
  mails: handlers.mails,
};

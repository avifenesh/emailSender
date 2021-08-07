/*
 *Primary file for API
 */

// Dependicies
const server = require("./lib/server");

// Declear the app
const app = {};

// Init function
app.init = function () {
  // Start the server
  server.init();
};

// Execute
app.init();

// Export The app
module.exports = app;

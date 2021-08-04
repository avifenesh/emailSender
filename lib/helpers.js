/*
 * Helpers for various tasks
 *
 */

// Container for all the Helpers

//Dependencies
const crypto = require("crypto");
const config = require("./config");

const helpers = {};

// Create a SHA256 hash
helpers.hash = function (str) {
  if (typeof str == "string" && str.length > 0) {
    const hash = crypto
      .createHmac("sha256", config.hashingSecret)
      .update(str)
      .digest("hex");
    return hash;
  } else return false;
};

// Parse a JSON string to a string in all cases, without throwing
helpers.parseJsonToObject = function (str) {
  try {
    const obj = JSON.parse(str);
    return obj;
  } catch (e) {
    return {};
  }
};

// Create a string of random alphanumeric charachters, of a given length
helpers.createRandomString = function (strLength) {
  strLength = typeof strLength == "number" && strLength > 0 ? strLength : false;
  if (strLength) {
    // Define all the possible charecters that could go into a string
    const possibleCharacters = "abcdefghijklmnopqrstuvwxyz1234567890";

    // Start the final string
    let str = "";
    for (let i = 1; i <= strLength; i++) {
      // Get random character from posibleCharacters
      const randomCharcter = possibleCharacters.charAt(
        Math.floor(Math.random() * possibleCharacters.length)
      );
      // Append this character to final string
      str += randomCharcter;
    }
    // Return the final string
    return str;
  } else {
    return false;
  }
};

// Export the module
module.exports = helpers;

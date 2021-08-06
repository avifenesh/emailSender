/*
 *Libary for storing and editing data
 */

// Dependencies

const fs = require("fs");
const path = require("path");
const helpers = require("./helpers");
const models = require("./schemas");

// Container for the moudle (to be export)
const lib = {};

// Base directory of data folder
lib.baseDir = path.join(__dirname, "/../.data/");

// Write data to a file
lib.create = function (model, data, callback) {
  let saveTo;
  switch (model) {
    case "users":
      saveTo = models.users;
      break;
    case "tokens":
      saveTo = models.tokens;
      break;
    case "mails":
      saveTo = models.mails;
      break;
    default:
      callback("the model you trying to save to is not exist");
  }
  const newData = new saveTo(data);
  newData
    .save()
    .then(callback(false))
    .catch((err) => callback(err));
};

// Read data from a file
lib.read = function (model, key, callback) {
  let readFrom;
  switch (model) {
    case "users":
      readFrom = models.users;
      break;
    case "tokens":
      readFrom = models.tokens;
      break;
    case "mails":
      readFrom = models.mails;
      break;
    default:
      callback("the model you trying to save to is not exist");
  }
  readFrom
    .find()
    .findByName(key)
    .exec((err, data) => {
      if (!err) {
        callback(false, data);
      } else {
        callback(err, data);
      }
    });
};

// Update data inside a file
lib.update = function (dir, file, data, callback) {
  // Open the file for writing
  fs.open(
    lib.baseDir + dir + "/" + file + ".json",
    "r+",
    function (err, fileDescriptor) {
      if (!err && fileDescriptor) {
        // Convert data to string
        const stringData = JSON.stringify(data);

        // Truncate the file
        fs.ftruncate(fileDescriptor, function (err) {
          if (!err) {
            //Write to the file and close it
            fs.writeFile(fileDescriptor, stringData, function (err) {
              if (!err) {
                fs.close(fileDescriptor, function (err) {
                  if (!err) {
                    callback(false);
                  } else {
                    callback("Error closing file");
                  }
                });
              } else {
                callback("Error writing to existing file");
              }
            });
          }
        });
      } else {
        callback("Could not open the file for updating, it may not exist yet");
      }
    }
  );
};

// Delete a file
lib.delete = function (dir, file, callback) {
  // Unlink the file
  fs.unlink(lib.baseDir + dir + "/" + file + ".json", function (err) {
    if (!err) {
      callback(false);
    } else {
      callback("Error deleting file");
    }
  });
};

// Export the moudle
module.exports = lib;

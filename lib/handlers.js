/*
 * Request handlers
 */

// Dependicies
const _data = require("./data");
const helpers = require("./helpers");

// Define the handlers
const handlers = {};

// Ping handler
handlers.ping = function (data, callback) {
  callback(200);
};

// Not found handler
handlers.notFound = function (data, callback) {
  callback(404);
};

// Users
handlers.users = function (data, callback) {
  const acceptableMethodes = ["post", "get", "put", "delete"];
  if (acceptableMethodes.indexOf(data.method) > -1) {
    handlers._users[data.method](data, callback);
  } else {
    callback(405);
  }
};

// Container for the users submethods
handlers._users = {};

// Users - post
// Require data: Firstname, lastName, phone, password, tosAgreement
// none optional data
handlers._users.post = function (data, callback) {
  // Check that all required fields are filled out
  const firstName =
    typeof data.payload.firstName == "string" &&
    data.payload.firstName.trim().length > 0
      ? data.payload.firstName.trim()
      : false;
  const lastName =
    typeof data.payload.lastName == "string" &&
    data.payload.lastName.trim().length > 0
      ? data.payload.lastName.trim()
      : false;
  const phone =
    typeof data.payload.phone == "string" &&
    data.payload.phone.trim().length == 10
      ? data.payload.phone.trim()
      : false;
  const password =
    typeof data.payload.password == "string" &&
    data.payload.password.trim().length > 0
      ? data.payload.password.trim()
      : false;
  const tosAgreement =
    typeof data.payload.tosAgreement == "boolean" &&
    data.payload.tosAgreement == true
      ? true
      : false;

  if (firstName && lastName && phone && password && tosAgreement) {
    // make sure the users dosent allready exist
    _data.read("users", phone, function (err, data) {
      if (err) {
        // Hash the password
        const hashedPassword = helpers.hash(password);

        // Crate the user object
        if (hashedPassword) {
          const userObject = {
            firstName: firstName,
            lastName: lastName,
            phone: phone,
            hashedPassword: hashedPassword,
            tosAgreement: true,
          };

          // store the user
          _data.create("users", phone, userObject, function (err) {
            if (!err) {
              callback(200);
            } else {
              console.log(err);
              callback(500, { Error: "Could not create the new user" });
            }
          });
        } else {
          callback(500, { Error: "Could not hash the password" });
        }
      } else {
        // User already exist
        callback(400, { Error: "A user with that phone number alredy exist" });
      }
    });
  } else {
    callback(400, { Error: "Missing require fields" });
  }
};
// Users - get
// Required data - phone
// Optional data - none
// TODO: only let an a authenticated user access there object, nobdy else
handlers._users.get = function (data, callback) {
  // Check that the phone number is valid
  const phone =
    typeof data.queryStringObject.phone == "string" &&
    data.queryStringObject.phone.trim().length == 10
      ? data.queryStringObject.phone.trim()
      : false;
  if (phone) {
    // lookup the user
    _data.read("users", phone, function (err, data) {
      if (!err && data) {
        // Remove the hashed password from the user object before returning it to the request
        delete data.hashedPassword;
        callback(200, data);
      } else {
        callback(404);
      }
    });
  } else {
    callback(400, { Error: "Missing require filed" });
  }
};
// Users - put
// Required data - phone
// optional data -  firstName, lastName, password (at loeast one)
// TODO: only let an authenticated user update their own object, not any one else
handlers._users.put = function (data, callback) {
  // Check for required filed
  const phone =
    typeof data.payload.phone == "string" &&
    data.payload.phone.trim().length == 10
      ? data.payload.phone.trim()
      : false;

  // check for optional filed
  const firstName =
    typeof data.payload.firstName == "string" &&
    data.payload.firstName.trim().length > 0
      ? data.payload.firstName.trim()
      : false;
  const lastName =
    typeof data.payload.lastName == "string" &&
    data.payload.lastName.trim().length > 0
      ? data.payload.lastName.trim()
      : false;
  const password =
    typeof data.payload.password == "string" &&
    data.payload.password.trim().length > 0
      ? data.payload.password.trim()
      : false;
  const tosAgreement =
    typeof data.payload.tosAgreement == "boolean" &&
    data.payload.tosAgreement == true
      ? true
      : false;

  // Error if phone if invalid
  if (phone) {
    // Error if nothing is sent for update
    if (firstName || lastName || password) {
      // Lookup for user
      _data.read("users", phone, function (err, userData) {
        if (!err && userData) {
          // Update the fileds necessary
          if (firstName) {
            userData.firstName = firstName;
          }
          if (lastName) {
            userData.lastName = lastName;
          }
          if (password) {
            userData.hashedPassword = helpers.hash(password);
          }
          // Store the new jupdates
          _data.update("users", phone, userData, function (err) {
            if (!err) {
              callback(200);
            } else {
              console.log(err);
              callback(500, { Error: "could not update the users" });
            }
          });
        } else {
          callback(400, { Error: "The specified user does not exist" });
        }
      });
    } else {
      callback(400, { Error: "Missing fileds to updates" });
    }
  } else {
    callback(400, { Error: "Missing requierd filed" });
  }
};
// Users - delete
// Required filde : phone
// TODO: only let authenticate user delet theire own data, not anybody else
//TODO: Cleanup (delete) any other data files associate withe this user
handlers._users.delete = function (data, callback) {
  // Check that the phone number is valid
  const phone =
    typeof data.queryStringObject.phone == "string" &&
    data.queryStringObject.phone.trim().length == 10
      ? data.queryStringObject.phone.trim()
      : false;
  if (phone) {
    // lookup the user
    _data.read("users", phone, function (err, data) {
      if (!err && data) {
        _data.delete("users", phone, function (err) {
          if (!err) {
            callback(200);
          } else {
            callback(500, { Error: "Could not delete the specified user" });
          }
        });
      } else {
        callback(404, { Error: "Could not find the specified user" });
      }
    });
  } else {
    callback(400, { Error: "Missing require filed" });
  }
};

// Tokens
handlers.tokens = function (data, callback) {
  const acceptableMethodes = ["post", "get", "put", "delete"];
  if (acceptableMethodes.indexOf(data.method) > -1) {
    handlers._tokens[data.method](data, callback);
  } else {
    callback(405);
  }
};

// Container for all the tokens methode
handlers._tokens = {};

// Token post
// Require data: phone, password
//optional data: none
handlers._tokens.post = function (data, callback) {
  const phone =
    typeof data.payload.phone == "string" &&
    data.payload.phone.trim().length == 10
      ? data.payload.phone.trim()
      : false;
  const password =
    typeof data.payload.password == "string" &&
    data.payload.password.trim().length > 0
      ? data.payload.password.trim()
      : false;
  if (phone && password) {
    // Lookup the user who matches that phone number
    _data.read("users", phone, function (err, userData) {
      if (!err && userData) {
        // Hash the sent password and compare to it to the password stored in user object
        const hashedPassword = helpers.hash(password);
        if (hashedPassword == userData.hashedPassword) {
          // If valid, create a new token with a random name, Set expiration date 1 hour in the future
          const tokenId = helpers.createRandomString(20);

          const expires = Date.now() + 1000 * 60 * 60;

          const tokenObject = {
            phone: phone,
            id: tokenId,
            expires: expires,
          };

          // Store the token
          _data.create("tokens", tokenId, tokenObject, function (err) {
            if (!err) {
              callback(200, tokenObject);
            } else {
              callback(500, { Error: "Could not create the new token" });
            }
          });
        } else {
          callback(400, {
            Error:
              "Password did not match the specified user's stored password",
          });
        }
      } else {
        callback(400, { Error: "Cuold not find the specified user" });
      }
    });
  } else {
    callback(400, { Error: "Missing require filed" });
  }
};

// Token get
// Required data: id
// optional data: none
handlers._tokens.get = function (data, callback) {
  // Check that the id is valid
  const id =
    typeof data.queryStringObject.id == "string" &&
    data.queryStringObject.id.trim().length == 20
      ? data.queryStringObject.id.trim()
      : false;
  if (id) {
    // lookup the token
    _data.read("tokens", id, function (err, tokenData) {
      if (!err && tokenData) {
        callback(200, tokenData);
      } else {
        callback(404);
      }
    });
  } else {
    callback(400, { Error: "Missing require filed" });
  }
};

// Token put
handlers._tokens.put = function (data, callback) {};

// Token delet
handlers._tokens.delete = function (data, callback) {};

// Export the modole

module.exports = handlers;

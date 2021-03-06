/*
 * Request handlers
 */

// Dependicies
const _data = require("./data");
const helpers = require("./helpers");
const config = require("./config");
const nodemailer = require("nodemailer");

// Define the handlers
const handlers = {};

/**
 * HTML handlers
 */

// Index Handler
handlers.index = function (data, callback) {
  // Reject any request that isn't a GET
  if (data.method == "get") {
    // Prepare data for interpolation
    const templateData = {
      "head.title": "Sending mail to anyone, anywhere - Never been so easy",
      "head.description":
        "We offering free email Sending, you can save your contact and create lists of contacts and send to all in one. Direct from here.",
      "body.class": "index",
    };
    // Read in a template as a string
    helpers.getTemplate("index", templateData, function (err, str) {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, "html");
          } else {
            callback(500, undefined, "html");
          }
        });
      } else {
        callback(500, undefined, "html");
      }
    });
  } else {
    callback(405, undefined, "html");
  }
};

// Create Account
handlers.accountCreate = function (data, callback) {
  // Reject any request that isn't a GET
  if (data.method == "get") {
    // Prepare data for interpolation
    const templateData = {
      "head.title": "Create an Account",
      "head.description": "Signup is easy and only takes a few seconds.",
      "body.class": "accountCreate",
    };
    // Read in a template as a string
    helpers.getTemplate("accountCreate", templateData, function (err, str) {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, "html");
          } else {
            callback(500, undefined, "html");
          }
        });
      } else {
        callback(500, undefined, "html");
      }
    });
  } else {
    callback(405, undefined, "html");
  }
};

// Create New Session
handlers.sessionCreate = function (data, callback) {
  // Reject any request that isn't a GET
  if (data.method == "get") {
    // Prepare data for interpolation
    const templateData = {
      "head.title": "Login to your account.",
      "head.description":
        "Please enter your Email and password to access your account.",
      "body.class": "sessionCreate",
    };
    // Read in a template as a string
    helpers.getTemplate("sessionCreate", templateData, function (err, str) {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, "html");
          } else {
            callback(500, undefined, "html");
          }
        });
      } else {
        callback(500, undefined, "html");
      }
    });
  } else {
    callback(405, undefined, "html");
  }
};

// Edit Your Account
handlers.accountEdit = function (data, callback) {
  // Reject any request that isn't a GET
  if (data.method == "get") {
    // Prepare data for interpolation
    const templateData = {
      "head.title": "Account Settings",
      "body.class": "accountEdit",
    };
    // Read in a template as a string
    helpers.getTemplate("accountEdit", templateData, function (err, str) {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, "html");
          } else {
            callback(500, undefined, "html");
          }
        });
      } else {
        callback(500, undefined, "html");
      }
    });
  } else {
    callback(405, undefined, "html");
  }
};

// Session has been deleted
handlers.sessionDeleted = function (data, callback) {
  // Reject any request that isn't a GET
  if (data.method == "get") {
    // Prepare data for interpolation
    const templateData = {
      "head.title": "Logged Out",
      "head.description": "You have been logged out of your account.",
      "body.class": "sessionDeleted",
    };
    // Read in a template as a string
    helpers.getTemplate("sessionDeleted", templateData, function (err, str) {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, "html");
          } else {
            callback(500, undefined, "html");
          }
        });
      } else {
        callback(500, undefined, "html");
      }
    });
  } else {
    callback(405, undefined, "html");
  }
};

// Account has been deleted
handlers.accountDeleted = function (data, callback) {
  // Reject any request that isn't a GET
  if (data.method == "get") {
    // Prepare data for interpolation
    const templateData = {
      "head.title": "Account Deleted",
      "head.description": "Your account has been deleted.",
      "body.class": "accountDeleted",
    };
    // Read in a template as a string
    helpers.getTemplate("accountDeleted", templateData, function (err, str) {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, "html");
          } else {
            callback(500, undefined, "html");
          }
        });
      } else {
        callback(500, undefined, "html");
      }
    });
  } else {
    callback(405, undefined, "html");
  }
};

// Create a new mail
handlers.mailsCreate = function (data, callback) {
  // Reject any request that isn't a GET
  if (data.method == "get") {
    // Prepare data for interpolation
    const templateData = {
      "head.title": "Create a New Mail",
      "body.class": "mailsCreate",
    };
    // Read in a template as a string
    helpers.getTemplate("mailsCreate", templateData, function (err, str) {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, "html");
          } else {
            callback(500, undefined, "html");
          }
        });
      } else {
        callback(500, undefined, "html");
      }
    });
  } else {
    callback(405, undefined, "html");
  }
};

// Create a new list of mail
handlers.listOfMailsCreate = function (data, callback) {
  // Reject any request that isn't a GET
  if (data.method == "get") {
    // Prepare data for interpolation
    const templateData = {
      "head.title": "Create a New list of mails",
      "body.class": "listOfMailsCreate",
    };
    // Read in a template as a string
    helpers.getTemplate("listOfMailsCreate", templateData, function (err, str) {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, "html");
          } else {
            callback(500, undefined, "html");
          }
        });
      } else {
        callback(500, undefined, "html");
      }
    });
  } else {
    callback(405, undefined, "html");
  }
};

handlers.sendMails = function (data, callback) {
  // Reject any request that isn't a GET
  if (data.method == "get") {
    // Prepare data for interpolation
    const templateData = {
      "head.title": "Send Mails",
      "body.class": "sendMails",
    };
    // Read in a template as a string
    helpers.getTemplate("sendMails", templateData, function (err, str) {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, "html");
          } else {
            callback(500, undefined, "html");
          }
        });
      } else {
        callback(500, undefined, "html");
      }
    });
  } else {
    callback(405, undefined, "html");
  }
};

// Dashboard (view all mails and list of mails)
handlers.allMails = function (data, callback) {
  // Reject any request that isn't a GET
  if (data.method == "get") {
    // Prepare data for interpolation
    const templateData = {
      "head.title": "Dashboard",
      "body.class": "allMails",
    };
    // Read in a template as a string
    helpers.getTemplate("allMails", templateData, function (err, str) {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, "html");
          } else {
            callback(500, undefined, "html");
          }
        });
      } else {
        callback(500, undefined, "html");
      }
    });
  } else {
    callback(405, undefined, "html");
  }
};

// Edit a mail
handlers.mailsEdit = function (data, callback) {
  // Reject any request that isn't a GET
  if (data.method == "get") {
    // Prepare data for interpolation
    const templateData = {
      "head.title": "Mail Details",
      "body.class": "mailsEdit",
    };
    // Read in a template as a string
    helpers.getTemplate("mailsEdit", templateData, function (err, str) {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, "html");
          } else {
            callback(500, undefined, "html");
          }
        });
      } else {
        callback(500, undefined, "html");
      }
    });
  } else {
    callback(405, undefined, "html");
  }
};

// Edit a list
handlers.listOfMailsEdit = function (data, callback) {
  // Reject any request that isn't a GET
  if (data.method == "get") {
    // Prepare data for interpolation
    const templateData = {
      "head.title": "List Of Mails Details",
      "body.class": "listOfMailsEdit",
    };
    // Read in a template as a string
    helpers.getTemplate("listOfMailsEdit", templateData, function (err, str) {
      if (!err && str) {
        // Add the universal header and footer
        helpers.addUniversalTemplates(str, templateData, function (err, str) {
          if (!err && str) {
            // Return that page as HTML
            callback(200, str, "html");
          } else {
            callback(500, undefined, "html");
          }
        });
      } else {
        callback(500, undefined, "html");
      }
    });
  } else {
    callback(405, undefined, "html");
  }
};

// Favicon
handlers.favicon = function (data, callback) {
  // Reject any request that isn't a GET
  if (data.method == "get") {
    // Read in the favicon's data
    helpers.getStaticAsset("favicon.ico", function (err, data) {
      if (!err && data) {
        // Callback the data
        callback(200, data, "favicon");
      } else {
        callback(500);
      }
    });
  } else {
    callback(405);
  }
};

// Public assets
handlers.public = function (data, callback) {
  // Reject any request that isn't a GET
  if (data.method == "get") {
    // Get the filename being requested
    const trimmedAssetName = data.trimmedPath.replace("public/", "").trim();
    if (trimmedAssetName.length > 0) {
      // Read in the asset's data
      helpers.getStaticAsset(trimmedAssetName, function (err, data) {
        if (!err && data) {
          // Determine the content type (default to plain text)
          let contentType = "plain";

          if (trimmedAssetName.indexOf(".css") > -1) {
            contentType = "css";
          }

          if (trimmedAssetName.indexOf(".png") > -1) {
            contentType = "png";
          }

          if (trimmedAssetName.indexOf(".jpg") > -1) {
            contentType = "jpg";
          }

          if (trimmedAssetName.indexOf(".ico") > -1) {
            contentType = "favicon";
          }

          // Callback the data
          callback(200, data, contentType);
        } else {
          callback(404);
        }
      });
    } else {
      callback(404);
    }
  } else {
    callback(405);
  }
};

/*
 * Json API handlers
 *
 */

// Ping handler
handlers.ping = function (data, callback) {
  callback(200);
};

// Not found handler
handlers.notFound = function (data, callback) {
  callback(404);
};

handlers.send = function (data, callback) {
  console.log(data);

  const mail =
    typeof data.payload.mail == "string" && data.payload.mail.length > 0
      ? data.payload.mail
      : false;
  const mailPassword =
    typeof data.payload.mailPassword == "string" &&
    data.payload.mailPassword.length > 0
      ? data.payload.mailPassword
      : false;
  const message =
    typeof data.payload.message == "string" && data.payload.message.length > 0
      ? data.payload.message
      : false;
  const myMail =
    typeof data.payload.displayMyMail == "string" &&
    data.payload.displayMyMail.length > 0
      ? data.payload.displayMyMail
      : false;
  const service =
    typeof data.payload.displayservice == "string" &&
    data.payload.displayservice.length > 0
      ? data.payload.displayservice
      : false;
  const subject =
    typeof data.payload.subject == "string" && data.payload.subject.length > 0
      ? data.payload.subject
      : false;
  if (mailPassword && message && myMail && service && subject && mail) {
    let transporter = nodemailer.createTransport(
      {
        host: "smtp.ethereal.email",
        port: 587,
        secure: false,
        service: service,
        auth: {
          user: myMail,
          pass: mailPassword,
        },
      },
      function (err, info) {
        if (!err) {
          callback(200, info);
        } else {
          callback(500, { "Erorr while creating transporter": err });
        }
      }
    ); // send mail with defined transport object
    transporter.sendMail(
      {
        from: myMail,
        to: mail,
        subject: subject,
        text: message,
      },
      function (err, info) {
        if (!err) {
          callback(200, info);
        } else {
          callback(500, { "Erorr while sending mail": err });
        }
      }
    );
  } else {
    callback(400, { Error: "Missing require fields" });
  }
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
// Require data: Firstname, lastName, mail, password, tosAgreement, service
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
  const myMail =
    typeof data.payload.myMail == "string" &&
    data.payload.myMail.trim().length > 0
      ? data.payload.myMail.trim()
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
  const service =
    typeof data.payload.service == "string" &&
    data.payload.service.trim().length > 0
      ? data.payload.service.trim()
      : false;

  if (firstName && lastName && myMail && password && tosAgreement && service) {
    // make sure the users dosent allready exist
    _data.read("users", myMail, function (err, data) {
      if (!data) {
        // Hash the password
        const hashedPassword = helpers.hash(password);

        // Crate the user object
        if (hashedPassword) {
          const userObject = {
            firstName: firstName,
            lastName: lastName,
            myMail: myMail,
            hashedPassword: hashedPassword,
            tosAgreement: true,
            service: service,
          };

          // store the user
          _data.create("users", userObject, function (err) {
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
        callback(400, { Error: "A user with that mail alredy exist" });
      }
    });
  } else {
    callback(400, { Error: "Missing require fields" });
  }
};
// Users - get
// Required data - mail
// Optional data - none

handlers._users.get = function (data, callback) {
  // Check that mail is valid
  const myMail =
    typeof data.queryStringObject.myMail == "string" &&
    data.queryStringObject.myMail.trim().length > 0
      ? data.queryStringObject.myMail.trim()
      : false;
  if (myMail) {
    // Get token from headers
    const token =
      typeof data.headers.token == "string" ? data.headers.token : false;
    // Verify that the given token is valid for the mail
    handlers._tokens.verifyToken(token, myMail, function (tokenIsValid) {
      if (tokenIsValid) {
        // Lookup the user
        _data.read("users", myMail, function (err, data) {
          if (!err && data) {
            // Remove the hashed password from the user user object before returning it to the requester
            delete data.hashedPassword;
            callback(200, data);
          } else {
            callback(404);
          }
        });
      } else {
        callback(403, {
          Error: "Missing required token in header, or token is invalid.",
        });
      }
    });
  } else {
    callback(400, { Error: "Missing required field" });
  }
};

// Users - put
// Required data - mail
// optional data -  firstName, lastName, password, service (at loeast one)
handlers._users.put = function (data, callback) {
  // Check for required filed

  const myMail =
    typeof data.payload.myMail == "string" &&
    data.payload.myMail.trim().length > 0
      ? data.payload.myMail.trim()
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
  const service =
    typeof data.payload.service == "string" &&
    data.payload.service.trim().length > 0
      ? data.payload.service.trim()
      : false;

  // Error if mail if invalid
  if (myMail) {
    // Error if nothing is sent for update
    if (firstName || lastName || password || service) {
      // Get the token from headers
      const token =
        typeof data.headers.token == "string" ? data.headers.token : false;

      // Verify that the given token is valid for the mail
      handlers._tokens.verifyToken(token, myMail, function (tokenIsValid) {
        if (tokenIsValid) {
          // Lookup for user
          _data.read("users", myMail, function (err, userData) {
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
              _data.update("users", myMail, userData, function (err) {
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
          callback(403, {
            Error: "Missing require token in header, or token is invalid",
          });
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
// Required filde : mail
handlers._users.delete = function (data, callback) {
  // Check that the mail is valid
  const myMail =
    typeof data.queryStringObject.myMail == "string" &&
    data.queryStringObject.myMail.trim().length > 0
      ? data.queryStringObject.myMail.trim()
      : false;
  if (myMail) {
    // Get the token from headers
    const token =
      typeof data.headers.token == "string" ? data.headers.token : false;

    // Verify that the given token is valid for the mail
    handlers._tokens.verifyToken(token, myMail, function (tokenIsValid) {
      if (tokenIsValid) {
        // lookup the user
        _data.read("users", myMail, function (err, userData) {
          if (!err && userData) {
            _data.delete("users", myMail, function (err) {
              if (!err) {
                // Delete each of the mails associate with the user
                const userMails =
                  typeof userData.mails == "object" &&
                  userData.mails instanceof Array
                    ? userData.mails
                    : [];
                const mailsToDelete = userMails.length;
                if (mailsToDelete > 0) {
                  let mailsDeleted = 0;
                  let deletionErrors = false;
                  // Loop throw mails
                  userMails.array.forEach(function (mailsId) {
                    // Delete the mails
                    _data.delete("mails", mailsId, function (err) {
                      if (!err) {
                        deletionErrors = true;
                      }
                      mailsDeleted++;
                      if (mailsDeleted == mailsToDelete) {
                        if (!deletionErrors) {
                          callback(200);
                        } else {
                          callback(500, {
                            Error:
                              "Error encounted while attempting to delete all of the user's mails. All mails may not have been deleted from the system successfully",
                          });
                        }
                      }
                    });
                  });
                } else {
                  callback(200);
                }
              } else {
                callback(500, { Error: "Could not delete the specified user" });
              }
            });
          } else {
            callback(404, { Error: "Could not find the specified user" });
          }
        });
      } else {
        callback(403, {
          Error: "Missing require token in header, or token is invalid",
        });
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
// Require data: mail, password
//optional data: none
handlers._tokens.post = function (data, callback) {
  const myMail =
    typeof data.payload.myMail == "string" &&
    data.payload.myMail.trim().length > 0
      ? data.payload.myMail.trim()
      : false;

  const password =
    typeof data.payload.password == "string" &&
    data.payload.password.trim().length > 0
      ? data.payload.password.trim()
      : false;

  if (myMail && password) {
    // Lookup the user who matches that mail
    _data.read("users", myMail, function (err, userData) {
      if (!err && userData) {
        // Hash the sent password and compare to it to the password stored in user object
        const hashedPassword = helpers.hash(password);

        if (hashedPassword == userData.hashedPassword) {
          // If valid, create a new token with a random name, Set expiration date 1 hour in the future
          const tokenId = helpers.createRandomString(20);

          const expires = Date.now() + 1000 * 60 * 60;

          const tokenObject = {
            myMail: myMail,
            id: tokenId,
            expires: expires,
          };

          // Store the token
          _data.create("tokens", tokenObject, function (err) {
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
// Required data : id, extend
// Optinal data : none
handlers._tokens.put = function (data, callback) {
  const id =
    typeof data.payload.id == "string" && data.payload.id.trim().length == 20
      ? data.payload.id.trim()
      : false;
  const extend =
    typeof data.payload.extend == "boolean" && data.payload.extend == true
      ? true
      : false;

  if (id && extend) {
    // Lookup the existing token
    _data.read("tokens", id, function (err, tokenData) {
      if (!err && tokenData) {
        // Check to make sure the token isn't already expired
        if (tokenData.expires > Date.now()) {
          // Set the expiration an hour from now
          tokenData.expires = Date.now() + 1000 * 60 * 60;
          // Store the new updates
          _data.update("tokens", id, tokenData, function (err) {
            if (!err) {
              callback(200);
            } else {
              callback(500, {
                Error: "Could not update the token's expiration.",
              });
            }
          });
        } else {
          callback(400, {
            Error: "The token has already expired, and cannot be extended.",
          });
        }
      } else {
        callback(400, { Error: "Specified user does not exist." });
      }
    });
  } else {
    callback(400, {
      Error: "Missing required field(s) or field(s) are invalid.",
    });
  }
};

// Token delet
// Required data: id
// Optional data: none
handlers._tokens.delete = function (data, callback) {
  // Check the id is valid
  const id =
    typeof data.queryStringObject.id == "string" &&
    data.queryStringObject.id.trim().length == 20
      ? data.queryStringObject.id.trim()
      : false;
  if (id) {
    // lookup the token
    _data.read("tokens", id, function (err, data) {
      if (!err && data) {
        _data.delete("tokens", id, function (err) {
          if (!err) {
            callback(200);
          } else {
            callback(500, { Error: "Could not delete the specified tokens" });
          }
        });
      } else {
        callback(404, { Error: "Could not find the specified tokens" });
      }
    });
  } else {
    callback(400, { Error: "Missing require filed" });
  }
};

// Verify if a given token id is currently valid for a given user
handlers._tokens.verifyToken = function (id, myMail, callback) {
  // Lookup the token
  _data.read("tokens", id, function (err, tokenData) {
    if (!err && tokenData) {
      // Check that the token is for the given user and has not expired
      if (tokenData.myMail == myMail && tokenData.expires > Date.now()) {
        callback(true);
      } else {
        callback(false);
      }
    } else {
      callback(false);
    }
  });
};
// Mails
handlers.mails = function (data, callback) {
  const acceptableMethods = ["post", "get", "put", "delete"];
  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._mails[data.method](data, callback);
  } else {
    callback(405);
  }
};

// Container for all the mails methods
handlers._mails = {};

// mails - post
// Required data: mail
//optional data: none
handlers._mails.post = function (data, callback) {
  const mail =
    typeof data.payload.mail == "string" && data.payload.mail.trim().length > 0
      ? data.payload.mail.trim()
      : false;

  if (mail) {
    // Get token from headers
    const token =
      typeof data.headers.token == "string" ? data.headers.token : false;

    // Lookup the user mail by reading the token
    _data.read("tokens", token, function (err, tokenData) {
      if (!err && tokenData) {
        const userMail = tokenData.myMail;

        // Lookup the user data
        _data.read("users", userMail, function (err, userData) {
          if (!err && userData) {
            const listMails =
              typeof userData.mails == "object" &&
              userData.mails instanceof Array
                ? userData.mails
                : [];
            // Verify that user has less than the number of max-mails per user
            if (listMails.length < config.maxMails) {
              // Create random id for mail
              const mailId = helpers.createRandomString(20);

              // Create mail object
              const mailsListObject = {
                id: mailId,
                userMail: userMail,
                mail: mail,
              };

              // Save the object
              _data.create("mails", mailsListObject, function (err) {
                if (!err) {
                  // Add mail id to the user's object
                  userData.mails = listMails;
                  userData.mails.push(mailId);

                  // Save the new user data
                  _data.update("users", userMail, userData, function (err) {
                    if (!err) {
                      // Return the data about the new mail
                      callback(200, mailsListObject);
                    } else {
                      callback(500, {
                        Error: "Could not update the user with the new mail.",
                      });
                    }
                  });
                } else {
                  callback(500, { Error: "Could not create the new mail" });
                }
              });
            } else {
              callback(400, {
                Error:
                  "The user already has the maximum number of mails (" +
                  config.maxMails +
                  ").",
              });
            }
          } else {
            callback(403);
          }
        });
      } else {
        callback(403);
      }
    });
  } else {
    callback(400, { Error: "Missing required inputs, or inputs are invalid" });
  }
};

// mails - get
// Required data: id
// Optional data: none
handlers._mails.get = function (data, callback) {
  // Check that id is valid
  const id =
    typeof data.queryStringObject.id == "string" &&
    data.queryStringObject.id.trim().length == 20
      ? data.queryStringObject.id.trim()
      : false;
  if (id) {
    // Lookup the mails
    _data.read("mails", id, function (err, mailData) {
      if (!err && mailData) {
        // Get the token that sent the request
        const token =
          typeof data.headers.token == "string" ? data.headers.token : false;
        // Verify that the given token is valid and belongs to the user who created the mail
        console.log("This is mail data", mailData);
        handlers._tokens.verifyToken(
          token,
          mailData.userMail,
          function (tokenIsValid) {
            if (tokenIsValid) {
              // Return mail data
              callback(200, mailData);
            } else {
              callback(403);
            }
          }
        );
      } else {
        callback(404);
      }
    });
  } else {
    callback(400, { Error: "Missing required field, or field invalid" });
  }
};

// mails - put
// Required data: id, mail
// Optional data: none
handlers._mails.put = function (data, callback) {
  // Check for required field

  const id =
    typeof data.payload.id == "string" && data.payload.id.trim().length == 20
      ? data.payload.id.trim()
      : false;
  const mail =
    typeof data.payload.mail == "string" && data.payload.mail.trim().length > 0
      ? data.payload.mail.trim()
      : false;

  // Error if id is invalid
  if (id) {
    // Error if nothing is sent to update
    if (mail) {
      // Lookup the mail
      _data.read("mails", id, function (err, mailData) {
        if (!err && mailData) {
          // Get the token that sent the request
          const token =
            typeof data.headers.token == "string" ? data.headers.token : false;
          // Verify that the given token is valid and belongs to the user who created the mail
          handlers._tokens.verifyToken(
            token,
            mailData.userMail,
            function (tokenIsValid) {
              if (tokenIsValid) {
                mailData.mail = mail;
                // Store the new updates
                _data.update("mails", id, mailData, function (err) {
                  if (!err) {
                    callback(200);
                  } else {
                    callback(500, { Error: "Could not update the mail." });
                  }
                });
              } else {
                callback(403);
              }
            }
          );
        } else {
          callback(400, { Error: "mail ID did not exist." });
        }
      });
    } else {
      callback(400, { Error: "Missing fields to update." });
    }
  } else {
    callback(400, { Error: "Missing required field." });
  }
};

// mails - delete
// Required data: id
// Optional data: none
handlers._mails.delete = function (data, callback) {
  // Check that id is valid
  const id =
    typeof data.queryStringObject.id == "string" &&
    data.queryStringObject.id.trim().length == 20
      ? data.queryStringObject.id.trim()
      : false;
  if (id) {
    // Lookup the mail
    _data.read("mails", id, function (err, mailData) {
      if (!err && mailData) {
        // Get the token that sent the request
        const token =
          typeof data.headers.token == "string" ? data.headers.token : false;
        // Verify that the given token is valid and belongs to the user who created the mail
        handlers._tokens.verifyToken(
          token,
          mailData.userMail,
          function (tokenIsValid) {
            if (tokenIsValid) {
              // Delete the mail data
              _data.delete("mails", id, function (err) {
                if (!err) {
                  // Lookup the user's object to get all their mail
                  _data.read(
                    "users",
                    mailData.userMail,
                    function (err, userData) {
                      if (!err) {
                        const listOfUSerMails =
                          typeof userData.mails == "object" &&
                          userData.mails instanceof Array
                            ? userData.mails
                            : [];

                        // Remove the deleted mail from their list of mails
                        const mailPosition = listOfUSerMails.indexOf(id);
                        if (mailPosition > -1) {
                          listOfUSerMails.splice(mailPosition, 1);
                          // Re-save the user's data
                          userData.mails = listOfUSerMails;
                          _data.update(
                            "users",
                            mailData.userMail,
                            userData,
                            function (err) {
                              if (!err) {
                                callback(200);
                              } else {
                                callback(500, {
                                  Error: "Could not update the user.",
                                });
                              }
                            }
                          );
                        } else {
                          callback(500, {
                            Error:
                              "Could not find the mail on the user's object, so could not remove it.",
                          });
                        }
                      } else {
                        callback(500, {
                          Error:
                            "Could not find the user who created the mail, so could not remove the mail from the list of mails on their user object.",
                        });
                      }
                    }
                  );
                } else {
                  callback(500, { Error: "Could not delete the mail data." });
                }
              });
            } else {
              callback(403);
            }
          }
        );
      } else {
        callback(400, { Error: "The mail ID specified could not be found" });
      }
    });
  } else {
    callback(400, { Error: "Missing valid id" });
  }
};

// list Of mails
handlers.listOfMails = function (data, callback) {
  const acceptableMethods = ["post", "get", "put", "delete"];
  if (acceptableMethods.indexOf(data.method) > -1) {
    handlers._listOfMails[data.method](data, callback);
  } else {
    callback(405);
  }
};

// Container for all the mails methods
handlers._listOfMails = {};

// list of mails - post
// Required data: list of mails, list name
//optional data: none
handlers._listOfMails.post = function (data, callback) {
  const listOfMails =
    typeof data.payload.mailList == "string" &&
    data.payload.mailList.trim().length > 0 &&
    data.payload.mailList.trim().split(",").length < 10
      ? data.payload.mailList.trim().split(",")
      : false;
  const listName =
    typeof data.payload.listName == "string" &&
    data.payload.listName.trim().length > 0
      ? data.payload.listName.trim()
      : false;

  if (listOfMails && listName) {
    // Get token from headers
    const token =
      typeof data.headers.token == "string" ? data.headers.token : false;

    // Lookup the user mail by reading the token
    _data.read("tokens", token, function (err, tokenData) {
      if (!err && tokenData) {
        const userMail = tokenData.myMail;

        // Lookup the user data
        _data.read("users", userMail, function (err, userData) {
          if (!err && userData) {
            const listOfListsMails =
              typeof userData.listOfLists == "object" &&
              userData.listOfLists instanceof Array
                ? userData.listOfLists
                : [];
            // Verify that user has less than the number of max list of mails per user
            if (listOfListsMails.length < config.maxList) {
              // Create random id for list of mail
              const listMailId = helpers.createRandomString(20);

              // Create  list of mail object
              const listOfmailsListObject = {
                id: listMailId,
                userMail: userMail,
                listName: listName,
                mailList: listOfMails,
              };

              // Save the object
              _data.create(
                "listOfMails",
                listOfmailsListObject,
                function (err) {
                  if (!err) {
                    // Add list of mails id to the user's object
                    userData.listOfLists = listOfListsMails;
                    userData.listOfLists.push(listMailId);

                    // Save the new user data
                    _data.update("users", userMail, userData, function (err) {
                      if (!err) {
                        // Return the data about the new list
                        callback(200, listOfmailsListObject);
                      } else {
                        callback(500, {
                          Error: "Could not update the user with the new list.",
                        });
                      }
                    });
                  } else {
                    callback(500, { Error: "Could not create the new list" });
                  }
                }
              );
            } else {
              callback(400, {
                Error:
                  "The user already has the maximum number of lists (" +
                  config.maxList +
                  ").",
              });
            }
          } else {
            callback(403);
          }
        });
      } else {
        callback(403);
      }
    });
  } else {
    callback(400, {
      Error: "Missing required inputs, or to much mails in the list",
    });
  }
};

// listOfMails - get
// Required data: id
// Optional data: none
handlers._listOfMails.get = function (data, callback) {
  // Check that id is valid
  const id =
    typeof data.queryStringObject.id == "string" &&
    data.queryStringObject.id.trim().length == 20
      ? data.queryStringObject.id.trim()
      : false;
  if (id) {
    // Lookup the lists of mails
    _data.read("listOfMails", id, function (err, listOfMailsData) {
      if (!err && listOfMailsData) {
        // Get the token that sent the request
        const token =
          typeof data.headers.token == "string" ? data.headers.token : false;
        // Verify that the given token is valid and belongs to the user who created the list of mail
        console.log("This is list of mails data", listOfMailsData);
        handlers._tokens.verifyToken(
          token,
          listOfMailsData.userMail,
          function (tokenIsValid) {
            if (tokenIsValid) {
              // Return mail data
              callback(200, listOfMailsData);
            } else {
              callback(403);
            }
          }
        );
      } else {
        callback(404);
      }
    });
  } else {
    callback(400, { Error: "Missing required field, or field invalid" });
  }
};

// list of mail - put
// Required data: id
// Optional data: lists of mails, or list name -  at least one of them
handlers._listOfMails.put = function (data, callback) {
  // Check for required field
  const id =
    typeof data.payload.id == "string" && data.payload.id.trim().length == 20
      ? data.payload.id.trim()
      : false;

  // check for optional data
  const listOfMails =
    typeof data.payload.mailList == "object" &&
    data.payload.mailList.length > 0 &&
    data.payload.mailList.length < 10
      ? data.payload.mailList
      : false;
  const listName =
    typeof data.payload.listName == "string" &&
    data.payload.listName.trim().length > 0
      ? data.payload.listName.trim()
      : false;

  // Error if id is invalid

  if (id) {
    // Error if nothing is sent to update
    if (listName || listOfMails) {
      // Lookup the mail
      _data.read("listOfMails", id, function (err, listOfMailsData) {
        if (!err && listOfMailsData) {
          // Get the token that sent the request
          const token =
            typeof data.headers.token == "string" ? data.headers.token : false;
          // Verify that the given token is valid and belongs to the user who created the list of mails
          handlers._tokens.verifyToken(
            token,
            listOfMailsData.userMail,
            function (tokenIsValid) {
              if (tokenIsValid) {
                if (listName) {
                  listOfMailsData.listName = listName;
                }
                if (listOfMails) {
                  listOfMailsData.listOfMails = listOfMails;
                }
                // Store the new updates
                _data.update(
                  "listOfMails",
                  id,
                  listOfMailsData,
                  function (err) {
                    if (!err) {
                      callback(200);
                    } else {
                      callback(500, { Error: "Could not update the mail." });
                    }
                  }
                );
              } else {
                callback(403);
              }
            }
          );
        } else {
          callback(400, { Error: "list of mail ID did not exist." });
        }
      });
    } else {
      callback(400, { Error: "Missing fields to update." });
    }
  } else {
    callback(400, { Error: "Missing required field." });
  }
};

// list of mails - delete
// Required data: id
// Optional data: none
handlers._listOfMails.delete = function (data, callback) {
  // Check that id is valid
  const id =
    typeof data.queryStringObject.id == "string" &&
    data.queryStringObject.id.trim().length == 20
      ? data.queryStringObject.id.trim()
      : false;
  if (id) {
    // Lookup the mail
    _data.read("listOfMails", id, function (err, listOfMailsData) {
      if (!err && listOfMailsData) {
        // Get the token that sent the request
        const token =
          typeof data.headers.token == "string" ? data.headers.token : false;
        // Verify that the given token is valid and belongs to the user who created the mail
        handlers._tokens.verifyToken(
          token,
          listOfMailsData.userMail,
          function (tokenIsValid) {
            if (tokenIsValid) {
              // Delete the mail data
              _data.delete("listOfMails", id, function (err) {
                if (!err) {
                  // Lookup the user's object to get all their mail
                  _data.read(
                    "users",
                    listOfMailsData.userMail,
                    function (err, userData) {
                      if (!err) {
                        const listOfUSerMailList =
                          typeof userData.listOfLists == "object" &&
                          userData.listOfLists instanceof Array
                            ? userData.listOfLists
                            : [];

                        // Remove the deleted mail from their list of mails
                        const mailPosition = listOfUSerMailList.indexOf(id);
                        if (mailPosition > -1) {
                          listOfUSerMailList.splice(mailPosition, 1);
                          // Re-save the user's data
                          userData.listOfLists = listOfUSerMailList;
                          _data.update(
                            "users",
                            listOfMailsData.userMail,
                            userData,
                            function (err) {
                              if (!err) {
                                callback(200);
                              } else {
                                callback(500, {
                                  Error: "Could not update the user.",
                                });
                              }
                            }
                          );
                        } else {
                          callback(500, {
                            Error:
                              "Could not find the mail on the user's object, so could not remove it.",
                          });
                        }
                      } else {
                        callback(500, {
                          Error:
                            "Could not find the user who created the mail, so could not remove the list of mail from the list of mail lists on their user object.",
                        });
                      }
                    }
                  );
                } else {
                  callback(500, {
                    Error: "Could not delete the list of mails data.",
                  });
                }
              });
            } else {
              callback(403);
            }
          }
        );
      } else {
        callback(400, {
          Error: "The list of mail ID specified could not be found",
        });
      }
    });
  } else {
    callback(400, { Error: "Missing valid id" });
  }
};

module.exports = handlers;

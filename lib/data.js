/*
 *Libary for storing and editing data
 */

// Dependencies
const models = require("./schemas");

// Container for the moudle (to be export)
const lib = {};

// Write data
lib.create = function (model, data, callback) {
  const saveTo = router[model];
  if (typeof saveTo == "undefined") {
    callback("the model you tring to save to is not defined");
  }

  const newData = new saveTo(data);

  newData
    .save()
    .then(callback(false))
    .catch((err) => callback(err));
};

// Read data
lib.read = function (model, key, callback) {
  switch (model) {
    case "users":
      models.users.findOne({ myMail: key }).exec((err, data) => {
        if (!err) {
          callback(false, data);
        } else {
          callback(err, data);
        }
      });
      break;
    case "tokens":
      models.tokens.findOne({ id: key }).exec((err, data) => {
        if (!err) {
          callback(false, data);
        } else {
          callback(err, data);
        }
      });
      break;
    case "mails":
      models.mails.findOne({ id: key }).exec((err, data) => {
        if (!err) {
          callback(false, data);
        } else {
          callback(err, data);
        }
      });
      break;
    case "listOfMails":
      models.listOfMails.findOne({ id: key }).exec((err, data) => {
        if (!err) {
          callback(false, data);
        } else {
          callback(err, data);
        }
      });
      break;
    default:
      callback("the model you trying to read is not exist");
  }
};

// Update data
lib.update = function (model, key, data, callback) {
  switch (model) {
    case "users":
      models.users.findOneAndUpdate({ myMail: key }, data).exec((err) => {
        if (!err) {
          callback(false);
        } else {
          callback(err);
        }
      });
      break;
    case "tokens":
      models.tokens.findOneAndUpdate({ id: key }, data).exec((err) => {
        if (!err) {
          callback(false);
        } else {
          callback(err);
        }
      });
      break;
    case "mails":
      models.mails.findOneAndUpdate({ id: key }, data).exec((err) => {
        if (!err) {
          callback(false);
        } else {
          callback(err);
        }
      });
      break;
    case "listOfMails":
      models.listOfMails.findOneAndUpdate({ id: key }, data).exec((err) => {
        if (!err) {
          callback(false);
        } else {
          callback(err);
        }
      });
      break;
    default:
      callback("the model you trying to save to is not exist");
  }
};

// Delete data
lib.delete = function (model, key, callback) {
  switch (model) {
    case "users":
      models.users.findOneAndDelete({ myMail: key }).exec((err) => {
        if (!err) {
          callback(false);
        } else {
          callback(err);
        }
      });
      break;
    case "tokens":
      models.tokens.findOneAndDelete({ id: key }).exec((err) => {
        if (!err) {
          callback(false);
        } else {
          callback(err);
        }
      });
      break;
    case "mails":
      models.mails.findOneAndDelete({ id: key }).exec((err) => {
        if (!err) {
          callback(false);
        } else {
          callback(err);
        }
      });
      break;
    case "listOfMails":
      models.listOfMails.findOneAndDelete({ id: key }).exec((err) => {
        if (!err) {
          callback(false);
        } else {
          callback(err);
        }
      });
      break;
    default:
      callback("the model you trying to save to is not exist");
  }
};

const router = {
  users: models.users,
  tokens: models.tokens,
  mails: models.mails,
  listOfMails: models.listOfMails,
};

// Export the moudle
module.exports = lib;

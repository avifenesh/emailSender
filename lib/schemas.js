/*
 * Crate db schemas
 *
 */

// Dependecies
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// create the user schema
const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  myMail: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  hashedPassword: {
    type: String,
    required: true,
  },
  tosAgreement: {
    type: Boolean,
    required: true,
  },
  service: {
    type: String,
    required: true,
  },
  mails: {
    type: Array,
    required: false,
  },
});

// create the token schema
const tokenSchema = new Schema({
  myMail: {
    type: String,
    required: true,
  },
  id: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  expires: {
    type: Number,
    required: true,
  },
});

// create the mail schema
const mailSchema = new Schema({
  id: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  userMail: {
    type: String,
    required: true,
  },
  mail: {
    type: String,
    required: true,
  },
});
// Assign a function to the "statics" object of our userSchema
userSchema.query.findByName = function (name) {
  return this.where({ name: new RegExp(name, "i") });
};
// Assign a function to the "statics" object of our tokenlSchema
tokenSchema.query.findByName = function (name) {
  return this.where({ name: new RegExp(name, "i") });
};
// Assign a function to the "statics" object of our mailSchema
mailSchema.query.findByName = function (name) {
  return this.where({ name: new RegExp(name, "i") });
};
// create models from all schemas
const models = {};
models.users = mongoose.model("users", userSchema);
models.tokens = mongoose.model("tokens", tokenSchema);
models.mails = mongoose.model("mails", mailSchema);

// export the models
module.exports = models;

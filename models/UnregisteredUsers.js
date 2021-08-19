const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const unregsieterdUsersSchema = new Schema({
  fullName: { type: String },
  unregisteredDate: { type: String },
  reason: { type: String },
});

const unregUsers = mongoose.model(
  "unregistered _user",
  unregsieterdUsersSchema
);

module.exports = unregUsers;

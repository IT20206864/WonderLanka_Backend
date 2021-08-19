const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const usersSchema = new Schema({
  country: { type: String },
  email: { type: String },
  fullName: { type: String },
  mobileNo: { type: String },
  username: { type: String },
  nic: {
    type: String,
  },
  dateOfBirth: { type: String },
  password: { type: String },
});

const User = mongoose.model("user", usersSchema);

module.exports = User;

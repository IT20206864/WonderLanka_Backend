const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const assignedDriverScheme = new Schema({
  tourId: { type: String },
  driverid: { type: String },
});

const AssignedDriver = mongoose.model("assigned_driver", assignedDriverScheme);

module.exports = AssignedDriver;

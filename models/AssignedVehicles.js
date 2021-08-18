const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const assignedVehcileScheme = new Schema({
  tourId: { type: String },
  vehicleId: { type: String },
});

const AssignedVehicle = mongoose.model(
  "assigned_vehicle",
  assignedVehcileScheme
);

module.exports = AssignedVehicle;

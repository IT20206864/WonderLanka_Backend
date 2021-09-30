const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const assignedVehicleScheme = new Schema({
  tourId: { type: String },
  vehicleId: { type: String },
});

const assignedVehicle = mongoose.model("assigned_vehicle", assignedVehicleScheme);

module.exports = assignedVehicle;
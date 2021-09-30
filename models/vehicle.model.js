const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const vehicleSchema = new Schema({
  vtype: { type: String, required: true },
  vname: { type: String, required: true },
  vid: { type: String, required: true },
  date: { type: Date, required: true },
  vnumber: { type: String, required: true }, 
  
}, {
  timestamps: true,
});

const Vehicle = mongoose.model('Vehicle', vehicleSchema);

module.exports = Vehicle;
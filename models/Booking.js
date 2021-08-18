const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookingsSchema = new Schema({
  tourId: { type: String },
  arrivalDate: { type: String },
  iclass: { type: String },
  country: { type: String },
  bookingDate: { type: String },
  email: { type: String },
  fullName: { type: String },
  insurance: { type: String },
  itinerary: { type: String },
  mobileNo: { type: String },
  noOfAdults: { type: Number },
  noOfKids18: { type: Number },
  noOfKids8: { type: Number },
  payment: { type: Number },
  username: { type: String },
});

const Booking = mongoose.model("booking", bookingsSchema);

module.exports = Booking;

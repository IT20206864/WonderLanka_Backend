const mongoose = require("mongoose");

const schema = mongoose.Schema;

const insurenceSchema = new schema({
  InsurenceID: {
    type: String,
    required: true,
  },

  InsurenceName: {
    type: String,
    required: true,
  },

  InsurencePrice: {
    type: String,
    required: true,
  },

  InsurenceCoverage: {
    type: String,
    required: true,
  },

  InsurenceAccidentType: {
    type: String,
    required: true,
  },

  InsurenceDetails: {
    type: String,
    required: true,
  },
});

const Insurence = mongoose.model("Insurance_Packages", insurenceSchema);
module.exports=Insurence;

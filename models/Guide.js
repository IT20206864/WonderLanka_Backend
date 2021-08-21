const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const guideSchema = new Schema({

  guideID: { type: String,  required : true },
  fName: { type: String , required : true},
  lName: { type: String, required : true },
  email: { type: String, required : true },
  telNo: { type: String , required : true},
  licenseID: { type: String , required : true},
  foreignLang: { type: String, required : true },
});

const Guide = mongoose.model("guide", guideSchema);

module.exports = Guide;


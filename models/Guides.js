const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const guidesSchema = new Schema({
  guideID: { type: String },
  fName: { type: String },
  lName: { type: String },
  email: { type: String },
  telNo: { type: String },
  licenseID: { type: String },
  foreignLang: { type: String },
});

const Guides = mongoose.model("guide", guidesSchema);

module.exports = Guides;

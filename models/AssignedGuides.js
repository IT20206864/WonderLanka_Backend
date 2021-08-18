const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const assignedGuideScheme = new Schema({
  tourId: { type: String },
  guideId: { type: String },
});

const AssignedGuide = mongoose.model("assigned_guide", assignedGuideScheme);

module.exports = AssignedGuide;

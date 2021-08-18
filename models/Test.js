const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const testSchema = new Schema({
  name: { type: String },
});

const Test = mongoose.model("test", testSchema);

module.exports = Test;

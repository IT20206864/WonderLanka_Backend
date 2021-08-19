const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const guideSchema = new Schema({

    GuideID : {
        type : String,
        required : true
    },
    FirstName : {
        type : String,
        required : true
    },
    LastName : {
        type: String,
        required : true
    },
    Email : {
        type: String,
        required: true
    },
    TelNumber : {
        type : Number,
        required : true
    },
    GuideLicenseNo : {
        type : String,
        required : true
    },
    ForeignLanguage : {
        type : String,
        required : true
    }


});

const Guide = mongoose.model("guides","guideSchema");

module.exports = Guide;


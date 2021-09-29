const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const itinerarySchema = new Schema({
    
    itineraryId : {
        type : String,
        required : true
    },

    itineraryDays : {
        type : String,
        required : true

    },
    
    itineraryName : {
        type : String,
        required: true
        
    },

    itineraryDesc : {
        type : String,
        required: true
    },

    itineraryImage : {
        type : String,
        required : true
    },

    itineraryCoverImage : {
        type : String,
        required : true
    },

    itineraryClass : {
        type : String,
        required : true
    },

    itineraryPriceAdult : {
        type : String,
        required : true
    },

    itineraryPriceChild : {
        type : String,
        required : true
    }


})

const Itinerary = mongoose.model("itineraries",itinerarySchema);

module.exports = Itinerary;
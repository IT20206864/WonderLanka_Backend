const mongoose = require("mongoose");


const restaurantSchema = new mongoose.Schema({
    restaurantId : {
        type : String,
        required: true
        
    },

    restaurantName : {
        type : String,
        required: true
    },

    restaurantDesc : {
        type : String,
        required : true
    },

    
    restaurantTele : {
        type : Number,
        required : true
    },

    
    restaurantEmail : {
        type : String,
        required : true
    },


    restaurantType : {
        type : String,
        required : true
    },

    restaurantLocation : {
        type : String,
        required : true
    },

    restaurantCoverImage : {
        type : String,
        required : true
    },



})

const Restaurant = mongoose.model("restaurants",restaurantSchema);

module.exports = Restaurant;
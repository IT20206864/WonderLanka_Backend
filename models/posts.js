const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    hotelNum:{
        type : String,
        required: true
    },
    hotelname:{
        type: String,
        required: true
    },
    location:{
        type: String,
        required: true
    },

    hotelTele:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },

  
});

module.exports = mongoose.model('Hotels',postSchema);
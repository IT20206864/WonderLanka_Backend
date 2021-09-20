const mongoose = require('mongoose');

const postschema = new mongoose.Schema({

    tourId :{
        type:String,
        required:true
    },
    cancellationdate:{
        type:String,
        required:true
    }
    ,
    reason:{
        type:String,
        required:true
    },
    amount:{
        type:Number,
        required:true
    },
   
   


})

module.exports = mongoose.model('cancel_booking',postschema)
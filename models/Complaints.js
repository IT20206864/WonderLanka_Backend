const mongoose = require('mongoose');
const complaintSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    contact : {
        type : Number,
        required : true
    },
    select : {
        type : String,
        required : true
    },
    text : {
        type : String,
        required : true
    }

})

const complaint = mongoose.model("Complaint", complaintSchema);

module.exports = complaint;
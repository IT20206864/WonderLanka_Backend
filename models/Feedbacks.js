const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const feedbackSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    stat : {
        type : String,
        required : true
    },
    feedback : {
        type : String,
        required : true
    }

})

const Feedback = mongoose.model("feedbacks", feedbackSchema);

module.exports = Feedback;
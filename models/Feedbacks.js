const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const feedbackSchema = new Schema({
    stat : {
        type : String,
        required : true
    },
    feedback : {
        type : String,
        required : true
    }

})

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
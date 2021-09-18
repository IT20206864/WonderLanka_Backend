const mongoose = require('mongoose');
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

const feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = feedback;
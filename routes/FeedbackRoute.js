const router = require("express").Router();
let Feedback  = require("../models/Feedbacks");
const { json } = require("express");

///////////////////////////////////////Add Feedback/////////////////////////////////////////////////////////////////////////

router.route("/addFeedback").post((req,res)=>{

    const name = req.body.name;
    const stat = req.body.stat;
    const feedback = req.body.feedback;

    const newFeedback = new Feedback({
        name,
        stat,
        feedback
    });

    newFeedback.save().then(()=>{
        res.json("Feedback Added")
    }).catch((err)=>{
        console.log(err);
    });

});

//////////////////////////////////////////get feedbacks(retrieve)//////////////////////////////////////////////////////////

router.route("/").get((req,res)=>{
    Feedback.find().then((feedback)=>{
        res.json(feedback)
    }).catch((err)=>{
        console.log(err)
    });
});

module.exports = router;
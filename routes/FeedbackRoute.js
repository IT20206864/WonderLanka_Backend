const router = require("express").Router();
const feedback = require("../models/Feedbacks");
let Feedback  = require("../models/Feedbacks");

///////////////////////////////////////Add Feedback/////////////////////////////////////////////////////////////////////////

router.route("/addFeedback").post((req,res)=>{

    const stat = req.body.name;
    const feedback = req.body.age;

    const newFeedback = new Feedback({
        stat,
        feedback
    })

    newFeedback.save().then(()=>{
        res.json("Feedback Added")
    }).catch((err)=>{
        console.log(err);
    })

})

//////////////////////////////////////////get feedbacks(retrieve)//////////////////////////////////////////////////////////

router.route("/").get((req,res)=>{
    Feedback.find().then(()=>{
        res.json(feedback)
    }).catch((err)=>{
        console.log(err)
    })
})


/////////////////////////////////////////////////Update////////////////////////////////////////////////////////////

router.route("/updateFeedback/:id").put(async(req, res)=>{
    let userId = req.params.id;
    const {stat, feedback} = req.body;

    const updateFeedback = {
        stat,
        feedback
    }

    const update = await Feedback.findByIdAndUpdate(TourID, updateFeedback).then(()=>{
        res.status(200).send({status: "Feedback updated", feedback: update})
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status: "Error with updating data"});
    })   
})

///////////////////////////////////////////////////////Delete///////////////////////////////////////////////////////////////////


router.route("/deleteFeedback/:id").delete(async(req, res) => {
    let TourID = req.params.id;

    await Complaint.findByIdAndDelete(TourID)
    .then(() =>{
        res.status(200).send({status: "Feedback deleted"});
    }).catch((err)=>{
        console.log(err.message);
        res.status(500).send({status: "Eror with delete feedback", error: err.message})
    })
})

module.exports = router;
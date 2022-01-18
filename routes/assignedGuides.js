const router = require("express").Router();
let Guide = require("../models/AssignedGuides");


router.post("/add" , (req,res)=>{

  const assignedGuide = new Guide({

    tourId : req.body.tide,
    guideId : req.body.gid
  })
  assignedGuide.save().then(()=>{
    res.json("Guide Assigned!");
  }).catch((err)=>{
    console.log(err);
  })
})


router.route("/get/:tourId").get(async (req, res) => {
  const tourId = req.params.tourId;
  await Guide.findOne({ tourId })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/").get((req,res) =>{
  Guide.find().then((data)=>{
    res.json(data)
  }).catch((err) =>{
    console.log(err);
  })
})

//Check whether TID exists

router.route("/check/:tid").get(async(req,res) =>{
  const tid = req.params.tid;
  await Guide.exists({tourId : tid}).then((data) =>{
    res.json(data);
    console.log(data);
  }).catch((err) =>{
    console.log(err);
  })
})


module.exports = router;

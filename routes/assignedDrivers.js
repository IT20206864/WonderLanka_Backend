const router = require("express").Router();
let Driver = require("../models/AssignedDrivers");


router.post("/add" , (req,res)=>{

  const assignedDriver = new Driver({

    tourId : req.body.tid,
    driverId : req.body.did
  })
  assignedDriver.save().then(()=>{
    res.json("Driver Assigned!");
  }).catch((err)=>{
    console.log(err);
  })
})


router.route("/get/:tourId").get(async (req, res) => {
  const tourId = req.params.tourId;
  await Driver.findOne({ tourId })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/").get((req,res) =>{
  Driver.find().then((data)=>{
    res.json(data)
  }).catch((err) =>{
    console.log(err);
  })
})


module.exports = router;

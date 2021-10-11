const router = require("express").Router();
let Vehicle = require("../models/AssignedVehicle");


router.post("/add" , (req,res)=>{

  const assignedVehicle = new Vehicle({

    tourId : req.body.tid,
    vehicleID : req.body.vid
  })
  assignedVehicle.save().then(()=>{
    res.json("Vehicle Assigned!");
  }).catch((err)=>{
    console.log(err);
  })
})


router.route("/get/:tourId").get(async (req, res) => {
  const tourId = req.params.tourId;
  await Vehicle.findOne({ tourId })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/").get((req,res) =>{
    Vehicle.find().then((data)=>{
    res.json(data)
  }).catch((err) =>{
    console.log(err);
  })
})

//Check whether TID exists

router.route("/check/:tid").get(async(req,res) =>{
  const tid = req.params.tid;
  await Vehicle.exists({tourId : tid}).then((data) =>{
    res.json(data);
    console.log(data);
  }).catch((err) =>{
    console.log(err);
  })
})

module.exports = router;

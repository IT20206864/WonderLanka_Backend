const router = require("express").Router();
const { response } = require("express");
const { json } = require("express");
let Insurence =require("../models/insurence.js");
let Booking =require("../models/Booking.js");

//create function
router.route("/add-package").post((req,res) => {
  const InsurenceID = req.body.InsurenceID;
  const InsurenceName = req.body.InsurenceName;
  const InsurencePrice = req.body.InsurencePrice;
  const InsurenceCoverage = req.body.InsurenceCoverage;
  const InsurenceAccidentType = req.body.InsurenceAccidentType;
  const InsurenceDetails = req.body.InsurenceDetails;

  const newInsurence = new Insurence({
    InsurenceID,
    InsurenceName,
    InsurencePrice,
    InsurenceCoverage,
    InsurenceAccidentType,
    InsurenceDetails,
  });

  newInsurence
    .save()
    .then(() => {
      res.json("Insurence Package Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

//read  Packages 
router.route('/').get((req, res) => {
  Insurence.find()
    .then(insurences => res.json(insurences))
    .catch(err => res.status(400).json('Error: ' + err));
});


//read  Packages (Report)
router.route('/report').get((req, res) => {
  Booking.find()
    .then(insurencesReport => res.json(insurencesReport))
    .catch(err => res.status(400).json('Error: ' + err));
});


//Update Function
router.route('/update/:id').put(async (req, res) => {
  const Insurance_Packages = req.params.id;

        const InsurenceID=req.body.InsurenceID;
        const InsurenceName = req.body.InsurenceName;
        const InsurencePrice = req.body.InsurencePrice;
        const InsurenceCoverage = req.body.InsurenceCoverage;
        const InsurenceAccidentType = req.body.InsurenceAccidentType;
        const InsurenceDetails = req.body.InsurenceDetails;
      

        const insuranceDetails = {
          InsurenceID,
          InsurenceName,
          InsurencePrice,
          InsurenceCoverage,
          InsurenceAccidentType,
          InsurenceDetails,
        }

        const update = await Insurence.findByIdAndUpdate(Insurance_Packages,insuranceDetails).then(()=>{
          res.json("updated successfully!");
        })
        .catch((err) => {
          console.log(err);
        });
})
      


//delete function
router.route("/delete-package/:id").delete(async (req, res) => {

  const Insurance_Packages = req.params.id;
    await Insurence.findByIdAndDelete(Insurance_Packages).then(()=>{
        res.status(200).send({status : "Insurence Package Deleted!"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Deletion unsuccesful!"});
    })
 
});

//getting one insurence package Detail

router.route("/get_onepackage/:id").get(async(req,res)=>{
  const insurence = req.params.id;
  const itin = await Insurence.findById(insurence).then(()=>{
      res.status(200).send({status : "get Insurence Package Details" , data : itin});
  }).catch((err)=>{
      res.status(500).send({status : "getting unsuccesful!"});
  })
})

module.exports = router;

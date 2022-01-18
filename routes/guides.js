const router = require("express").Router();

let Guide = require("../models/Guide");

//Adding Guide to the Database.

router.route("/add").post((req, res) => {
  const { guideID, fName, lName, email, telNo, licenseID, foreignLang } =
    req.body;

  const newGuide = new Guide({
    guideID,
    fName,
    lName,
    email,
    telNo,
    licenseID,
    foreignLang,
  });
  newGuide
    .save()
    .then(() => {
      res.json("Guide Added");
    })
    .catch((err) => {
      console.log(err);
    });
});

//Viewing Guide Details

router.route("/").get((req, res) => {
  Guide.find()
    .then((guides) => {
      res.json(guides);
    })
    .catch((err) => {
      console.log(err);
    });
});

//Updating entries

router.route("/update/:id").put(async (req, res) => {
  let guideId = req.params.id;
  const { guideID, fName, lName, email, telNo, licenseID, foreignLang } =
    req.body;

  const updateGuide = {
    guideID,
    fName,
    lName,
    email,
    telNo,
    licenseID,
    foreignLang,
  };

  const update = await Guide.findByIdAndUpdate(guideId, updateGuide)
    .then(() => {
      res.status(200).send({ status: "Guide Updated" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Error with updating data" });
    });
});

//Deleting a Guide

router.route("/delete/:id").delete(async (req, res) => {
  let guideID = req.params.id;
  console.log(guideID);
  await Guide.findOneAndDelete({ guideID })
    .then(() => {
      res.status(200).send({ status: "User Deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error deleting user", error: err.message });
    });
});

//Getting Details of one Guide by ID

router.route("/get/:id").get(async (req, res) => {
  let guideID = req.params.id;
  await Guide.findOne({ guideID })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error in Fetching Details", error: err.message });
    });
});

router.route("/getById/:id").get(async(req,res)=>{
  const id = req.params.id;
  const itin = await Guide.findById(id).then((data)=>{
      res.json(data);
      
      
  }).catch((err)=>{
      res.status(500).send({status : "Fetching unsuccesful!"});
  })
})


//Getting Details of one Guide by Name

router.route("/getbyName/:name").get(async (req, res) => {
  let guideName = req.params.name;
  const guide = await Guide.findOne({ fName: guideName })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

module.exports = router;

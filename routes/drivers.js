const router=require("express").Router();
const { response } = require("express");
let Driver=require("../models/driver");

//add driver
router.route("/add").post((req,res)=>{

    const driverid=req.body.driverid;
    const firstname=req.body.firstname;
    const lastname=req.body.lastname;
    const email=req.body.email;
    const phonenumber=req.body.phonenumber;
    const licenseid=req.body.licenseid;
    const languages=req.body.languages;

    const newDriver = new Driver({
        driverid,
        firstname,
        lastname,
        email,
        phonenumber,
        licenseid,
        languages

    })
    newDriver.save().then(()=>{
        res.json("Driver Added")
    }).catch((err)=>{
        console.log(err);
    })

})
//read  driver
router.route('/details').get((req, res) => {
    Driver.find()
      .then(drivers => res.json(drivers))
      .catch(err => res.status(400).json('Error: ' + err));
  });
//update driver
router.route("/update/:id").put(async (req, res) => {
  let driverId = req.params.id;
  const {driverid, firstname, lastname, email, phonenumber, licenseid, languages } =
    req.body;

  const updateDriver = {
    driverid,
    firstname,
    lastname,
    email,
    phonenumber,
    licenseid,
    languages,
  };

  const update = await Driver.findByIdAndUpdate(driverId, updateDriver)
    .then(() => {
      res.status(200).send({ status: "Driver Updated" });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({ status: "Error with updating data" });
    });
});


//delete driver
router.route("/delete/:id").delete(async (req, res) => {
  let driverid = req.params.id;
  console.log(driverid);
  await Driver.findOneAndDelete({ driverid })
    .then(() => {
      res.status(200).send({ status: "Driver Deleted" });
    })
    .catch((err) => {
      console.log(err.message);
      res
        .status(500)
        .send({ status: "Error deleting Driver", error: err.message });
    });
});


//get one driver details
router.route('/:id').get((req, res) => {
    Driver.findById(req.params.id)
      .then(driver => res.json(driver))
      .catch(err => res.status(400).json('Error: ' + err));
  });


  //Getting Details of one Driver by Name

router.route("/getbyName/:name").get(async (req,res) =>{
    let driverName = req.params.name;
    const driver = await Driver.findOne({firstname : driverName}).then((data) =>{
      res.json(data);
    }).catch((err) =>{
      console.log(err.message);
    })
  })





module.exports=router;

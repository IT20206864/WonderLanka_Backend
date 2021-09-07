const router = require('express').Router();
let Vehicle = require('../models/vehicle.model');

//get vehicle details
router.route('/').get((req, res) => {
  Vehicle.find()
    .then(vehicles => res.json(vehicles))
    .catch(err => res.status(400).json('Error: ' + err));
});

//add vehicle
router.route('/add').post((req, res) => {
  const vtype = req.body.vtype;
  const vname = req.body.vname;
  const vid = Number(req.body.vid);
  const date = Date.parse(req.body.date);
  const vnumber = req.body.vnumber;

  const newVehicle = new Vehicle({
    vtype,
    vname,
    vid,
    date,
    vnumber,
  });
//save add
  newVehicle.save()
  .then(() => res.json('Vehicle added!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

//get details without type
router.route('/:id').get((req, res) => {
  Vehicle.findById(req.params.id)
    .then(vehicle => res.json(vehicle))
    .catch(err => res.status(400).json('Error: ' + err));
});

//delete
router.route('/:id').delete((req, res) => {
  Vehicle.findByIdAndDelete(req.params.id)
    .then(() => res.json('Vehicle deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

//update
router.route('/update/:id').post((req, res) => {
  Vehicle.findById(req.params.id)
    .then(vehicle => {
      vehicle.vtype = req.body.vtype;
      vehicle.vname = req.body.vname;
      vehicle.vid = Number(req.body.vid);
      vehicle.date = Date.parse(req.body.date);
      vehicle.vnumber = req.body.vnumber;

      vehicle.save()
        .then(() => res.json('Vehicle updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
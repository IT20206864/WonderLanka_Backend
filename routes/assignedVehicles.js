const router = require("express").Router();
let Vehicle = require("../models/AssignedVehicles");

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

module.exports = router;

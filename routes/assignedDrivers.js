const router = require("express").Router();
let Driver = require("../models/AssignedDrivers");

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

module.exports = router;

const router = require("express").Router();
let Guide = require("../models/AssignedGuides");

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

module.exports = router;

const router = require("express").Router();
let Test = require("../models/Test");

router.route("/").get((req, res) => {
  Test.find()
    .then((test) => {
      res.json(test);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;

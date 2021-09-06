const router = require('express').Router();
let Type = require('../models/type.model');

router.route('/').get((req, res) => {
  Type.find()
    .then(types => res.json(types))
    .catch(err => res.status(400).json('Error: ' + err));
});

//add type
router.route('/add').post((req, res) => {
  const vtype = req.body.vtype;

  const newType = new Type({vtype});

  newType.save()
    .then(() => res.json('Type added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;



const router = require("express").Router();
let Booking = require("../models/Booking");

router.route("/add").post(async (req, res) => {
  let tourId;
  let loop = true;
  while (loop) {
    tourId = "T" + Math.floor(10000 + Math.random() * 90000);
    await Booking.exists({ tourId })
      .then((data) => {
        loop = data;
        console.log(loop);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  console.log(tourId);

  const {
    username,
    fullName,
    country,
    mobileNo,
    email,
    arrivalDate,
    itinerary,
    customziedItinerary,
    insurance,
    iclass,
    noOfAdults,
    noOfKids18,
    noOfKids8,
    payment,
    bookingDate,
  } = req.body.bookingDetails;

  const newBooking = new Booking({
    tourId,
    fullName,
    username,
    country,
    mobileNo,
    email,
    arrivalDate,
    itinerary,
    customziedItinerary,
    insurance,
    iclass,
    noOfAdults,
    noOfKids18,
    noOfKids8,
    payment,
    bookingDate,
  });

  console.log(customziedItinerary);

  newBooking
    .save()
    .then(() => {
      res.json("Booking Submitted");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/").get(async (req, res) => {
  await Booking.find()
    .then((bookings) => {
      res.json(bookings);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/get/:username").get(async (req, res) => {
  let username = req.params.username;
  await Booking.find({ username })
    .then((bookings) => {
      res.json(bookings);
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/get/:id").get(async(req,res) =>{
  const id = req.params.id;
  console.log(id);
  await Booking.findById(id).then((booking)=>{
    res.json(booking);
  }).catch((err) =>{
    console.log(err);
  })
})

router.route("/update/:tourid").put(async (req, res) => {
  let tourId = req.params.tourid;

  const { fullName, country, mobileNo, email, arrivalDate } = req.body.updates;

  const updateBooking = {
    fullName,
    country,
    mobileNo,
    email,
    arrivalDate,
  };

  console.log(tourId, updateBooking);
  await Booking.findOneAndUpdate({ tourId }, updateBooking)
    .then(() => {
      res.json("updated successfully!");
    })
    .catch((err) => {
      console.log(err);
    });
});

//delete bookings when a user unregsiters
router.route("/delete/:username").delete(async (req, res) => {
  let username = req.params.username;

  Booking.deleteMany({ username })
    .then(() => {
      res.json("deleted bookings");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/update/username/:username").put(async (req, res) => {
  let oldUsername = req.params.username;
  console.log(oldUsername);

  const username = req.body;
  console.log(username);
  await Booking.updateMany({ username: oldUsername }, username)
    .then(() => {
      res.json("updated successfully!");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;

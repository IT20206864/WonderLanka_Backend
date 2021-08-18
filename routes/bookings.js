const router = require("express").Router();
let Booking = require("../models/Booking");

router.route("/add").post((req, res) => {
  let tourId = "T" + Math.floor(Math.random() * 9999);
  const {
    username,
    fullName,
    country,
    mobileNo,
    email,
    arrivalDate,
    itinerary,
    insurance,
    iclass,
    noOfAdults,
    noOfKids18,
    noOfKids8,
    payment,
    bookingDate,
  } = req.body.bookingDetails;

  console.log(tourId);

  const newBooking = new Booking({
    tourId,
    fullName,
    username,
    country,
    mobileNo,
    email,
    arrivalDate,
    itinerary,
    insurance,
    iclass,
    noOfAdults,
    noOfKids18,
    noOfKids8,
    payment,
    bookingDate,
  });

  console.log(newBooking);

  newBooking
    .save()
    .then(() => {
      res.json("Booking Submitted");
    })
    .catch((err) => {
      console.log(err);
    });
});

router.route("/").get((req, res) => {
  Booking.find()
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

router.route("/delete/:username").delete(async (req, res) => {
  let username = req.params.username;

  Booking.findOneAndDelete({ username })
    .then(() => {
      res.json("deleted booking");
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;

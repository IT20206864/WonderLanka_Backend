const router = require("express").Router();
let Booking = require("../models/Booking");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "reggie.bednar43@ethereal.email",
    pass: "SBHXEKsRr8ByrjqnEn",
  },
});

router.route("/add").post(async (req, res) => {
  let tourId;
  let loop = true;
  while (loop) {
    tourId = "T" + Math.floor(10000 + Math.random() * 90000);
    await Booking.exists({ tourId })
      .then((data) => {
        loop = data;
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
      var mail = {
        from: "<no-reply@wonderlankatours.com>",
        to: newBooking.email,
        subject: "Wonder Lanka Tours",
        html:
          "<b>Hello " +
          newBooking.fullName +
          ",</b>" +
          "<p>Your booking has been confirmed! We will contact you very soon. <br> Thank you for choosing <a href='http://localhost:3000/index'><b><i>Wonder Lanka Tours.</i></b></a><br><br><div style='background-color:whitesmoke; width:500px; padding:10px 10px 10px 10px;'>Booking details<br><br>Tour ID : <i>" +
          newBooking.tourId +
          "</i><br>Tout Itinerary : <i>" +
          newBooking.itinerary +
          "</i><br>Class : <i>" +
          newBooking.iclass +
          "</i><br>Insurance Plan : <i>" +
          newBooking.insurance +
          "</i><br>Payment : <i>LKR " +
          newBooking.payment +
          "</i><br><br>Booking Date : <i>" +
          newBooking.bookingDate +
          "</i></div><br><i>Cheers,<br> Team Wonder Lanka.</i></p>",
      };
      transporter.sendMail(mail, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Email sent - " + info.response);
        }
      });
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

router.route("/get/:id").get(async (req, res) => {
  const id = req.params.id;
  console.log(id);
  await Booking.findById(id)
    .then((booking) => {
      res.json(booking);
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

//Database Connection
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const PORT = process.env.port || 8070;

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongo DB connection success!");
});
const driversRouter=require("./routes/drivers.js");
const bookingsRouter = require("./routes/bookings.js");
const assignedDriversRouter = require("./routes/assignedDrivers.js");
const assignedGuidesRouter = require("./routes/assignedGuides.js");
const assignedVehiclesRouter = require("./routes/assignedVehicles.js");
const usersRouter = require("./routes/users.js");
const unregUserRouter = require("./routes/unregisteredUsers");
const guidesRouter = require("./routes/guides");
const itinerariesRouter = require("./routes/itineraries");
const bookingmanagemntRouter = require("./routes/bookingmanagement");
const cancelbookingsRouter = require("./routes/cancelbookings");
const complaintsRouter = require("./routes/ComplaintRoute");
const hotelRoute =require('./routes/posts');
const employeesRouter=require("./routes/employees.js");
const insurenceRouter = require("./routes/Insurences.js");



const vehiclesRouter = require('./routes/vehicles');
const typesRouter = require('./routes/types');
const { connect } = require("mongodb");

app.use('/vehicles', vehiclesRouter);
app.use('/types', typesRouter);

app.use("/drivers",driversRouter);
app.use("/bookings", bookingsRouter);
app.use("/assignedDrivers", assignedDriversRouter);
app.use("/assignedGuides", assignedGuidesRouter);
app.use("/assignedVehicles", assignedVehiclesRouter);
app.use("/users", usersRouter);
app.use("/unregUser", unregUserRouter);
app.use("/guides",guidesRouter);
app.use("/itineraries",itinerariesRouter);
app.use("/bookingmanagement",bookingmanagemntRouter);
app.use("/cancelbookings",cancelbookingsRouter);
app.use("/complaint", complaintsRouter );
app.use(hotelRoute);
app.use("/employees", employeesRouter);
app.use("/insurences", insurenceRouter);

app.listen(PORT, () => {
  console.log(`Server is up and running on port number ${PORT}`);
});

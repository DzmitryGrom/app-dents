const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./core/db");
const { PatientCtrl, AppointmentCtrl } = require("./controllers");
const { check } = require("express-validator");
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());
app.use(cors());

app.get("/patients", PatientCtrl.all);
app.get("/patient/:id", PatientCtrl.show);
app.post(
  "/patient",
  [
    check("fullName").isLength({
      min: 6
    }),
    check("phone").isLength({
      min: 11
    })
  ],
  PatientCtrl.create
);
app.delete("/patient/:id", PatientCtrl.remove);
app.patch(
  "/patient/:id",
  [
    check("fullName").isLength({
      min: 6
    }),
    check("phone").isLength({
      min: 11
    })
  ],
  PatientCtrl.update
);

app.get("/appointments", AppointmentCtrl.all);
app.post(
  "/appointment",
  [
    check("dentNumber").isInt({
      min: 1,
      max: 48
    }),
    check("price").isInt({
      min: 0,
      max: 200000
    }),
    check("diagnosis").isLength({
      min: 3,
      max: 50
    }),
    check("date").isLength({
      min: 3,
      max: 50
    }),
    check("time").isLength({
      min: 3,
      max: 50
    })
  ],
  AppointmentCtrl.create
);
app.delete("/appointment/:id", AppointmentCtrl.remove);
app.patch(
  "/appointment/:id",
  [
    check("dentNumber").isInt({
      min: 1,
      max: 48
    }),
    check("price").isInt({
      min: 0,
      max: 200000
    }),
    check("diagnosis").isLength({
      min: 3,
      max: 50
    }),
    check("date").isLength({
      min: 3,
      max: 50
    }),
    check("time").isLength({
      min: 3,
      max: 50
    }),
    check("patient").isLength({
      min: 3,
      max: 50
    })
  ],
  AppointmentCtrl.update
);

app.listen(6666, function(err) {
  if (err) {
    console.log(err);
  }
  console.log("Server was starder!!!");
});

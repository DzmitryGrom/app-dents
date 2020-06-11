const { Patient } = require("../models");
const { validationResult } = require("express-validator");

function PatientController() {}

const create = function(req, res) {
  const errors = validationResult(req);
  const data = {
    fullName: req.body.fullName,
    phone: req.body.phone
  };

  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: errors.array()
    });
  }

  Patient.create(data, function(err, doc) {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err
      });
    }

    res.status(201).json({
      success: true,
      data: doc
    });
  });
};

const update = async function(req, res) {
  const patientId = req.params.id;
  const errors = validationResult(req);
  const data = {
    fullName: req.body.fullName,
    phone: req.body.phone
  };
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: errors.array()
    });
  }

  try {
    await Patient.findOne({
      _id: patientId
    });

    Patient.updateOne(
      {
        _id: patientId
      },
      {
        $set: data
      },
      function(err, doc) {
        if (err) {
          return res.status(500).json({
            success: false,
            message: err
          });
        }

        res.status(200).json({
          success: true,
          message: "PATIENT_WAS_UPDATED"
        });
      }
    );
  } catch (e) {
    return res.status(404).json({
      success: false,
      message: "PATIENT_NOT_FOUND"
    });
  }
};

const remove = async function(req, res) {
  const errors = validationResult(req);
  const patientId = req.params.id;

  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: errors.array()
    });
  }

  try {
    await Patient.findById(patientId);

    Patient.deleteOne(
      {
        _id: patientId
      },
      function(err) {
        if (err) {
          return res.status(500).json({
            success: false,
            message: err
          });
        }
        res.json({
          success: true,
          message: "PATIENT_WAS_REMOVED"
        });
      }
    );
  } catch (err) {
    return res.status(404).json({
      success: false,
      message: "PATIENT_NOT_FOUND"
    });
  }
};

const all = function(req, res) {
  Patient.find({}, function(err, docs) {
    if (err) {
      return res.status(500).json({
        success: false,
        message: err
      });
    }

    res.json({
      success: true,
      data: docs
    });
  });
};

const show = async function(req, res) {
  const patientId = req.params.id;
  try {
    const patient = await Patient.findById(patientId)
      .populate("appointments")
      .exec();

    res.json({
      status: "success",
      data: { ...patient._doc, appointments: patient.appointments }
    });
  } catch (e) {
    return res.status(404).json({
      success: false,
      message: "PATIENT_NOT_FOUND"
    });
  }
};

PatientController.prototype = {
  all,
  create,
  update,
  remove,
  show
};

module.exports = PatientController;

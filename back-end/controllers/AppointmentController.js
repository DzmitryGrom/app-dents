const {
	Appointment,
	Patient
} = require('../models')
const {
	validationResult
} = require('express-validator');
const groupBy = require('lodash/groupBy');
const reduce = require('lodash/reduce');
const SmsSendler = require('../SmsSendler');
const dayjs = require('dayjs');
require('dayjs/locale/ru');
function AppointmentController() {}

const create = async function (req, res) {
	const errors = validationResult(req);
	const data = {
		patient: req.body.patient,
		dentNumber: req.body.dentNumber,
		diagnosis: req.body.diagnosis,
		price: req.body.price,
		date: req.body.date,
		time: req.body.time
	}
	console.log(data);
	if (!errors.isEmpty()) {
		return res.status(422).json({
			success: false,
			message: errors.array()
		})
	}

	try {
		await Patient.findOne({
			_id: data.patient
		});

		Appointment.create(data, function (err, doc) {
			if (err) {
				return res.status(500).json({
					success: false,
					message: err
				})
			}

			const sendAnswer = SmsSendler(doc);

			res.status(201).json({
				success: true,
				data: doc,
				sms: sendAnswer
			})
		})
	} catch (e) {
		return res.status(404).json({
			success: false,
			message: 'APPOINTMENT_NOT_FOUND'
		})
	}
};

const update = async function (req, res) {
	const appointmentId = req.params.id;
	const errors = validationResult(req);
	const data = {
		dentNumber: req.body.dentNumber,
		diagnosis: req.body.diagnosis,
		price: req.body.price,
		date: req.body.date,
		time: req.body.time
	};

	if (!errors.isEmpty()) {
		return res.status(422).json({
			success: false,
			message: errors.array()
		})
	}

	try {
		await Patient.findOne({
			_id: appointmentId
		});

		Appointment.updateOne({
				_id: appointmentId
			}, {
				$set: data
			},
			function (err, doc) {
				if (err) {
					return res.status(500).json({
						success: false,
						message: err
					})
				}

				res.status(200).json({
					success: true,
					message: "APPOINTMENT_WAS_UPDATED"
				})
			})
	} catch (e) {
		return res.status(404).json({
			success: false,
			message: 'APPOINTMENT_NOT_FOUND'
		})
	}
};

const remove = async function (req, res) {
	const errors = validationResult(req);
	const appointmentId = req.params.id;

	if (!errors.isEmpty()) {
		return res.status(422).json({
			success: false,
			message: errors.array()
		})
	}

	try {
		await Patient.findById(
			appointmentId
		);

		Appointment.deleteOne({
			_id: appointmentId
		}, function (err) {
			if (err) {
				return res.status(500).json({
					success: false,
					message: err
				})
			}
			res.json({
				success: true,
				message: 'APPOINTMENT_WAS_REMOVED'
			})
		})
	} catch (err) {
		return res.status(404).json({
			success: false,
			message: 'APPOINTMENT_NOT_FOUND'
		})
	}
};

const all = function (req, res) {
	Appointment.find({})
		.populate('patient')
		.exec(function (err, docs) {
			if (err) {
				return res.status(500).json({
					success: false,
					message: err
				})
			}

			res.json({
				success: true,
				data: reduce(groupBy(docs, 'date'), (res, value, key) => {
					const title = dayjs(key).locale('ru').format('D  MMMM');
					return [...res, {title: title, data: value}];
				}, [])
			})
		});
};

AppointmentController.prototype = {
	all,
	create,
	update,
	remove
}

module.exports = AppointmentController;
var express = require('express');
var router = express.Router();
var AppointmentModel = require('../models/AppointmentModel');
var datetime = require('./datetime');


module.exports.postAppointment = function (req, res) {

  sess = req.session;
  sess.error = null;

  AppointmentModel.postAppointment(sess.username, req.body, function (err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.redirect('/appointmentlist');
    }
  });
};

module.exports.putAppointment = function (req, res) {

  sess = req.session;
  sess.error = null;


  AppointmentModel.putAppointment(req.params.id, req.body, function (err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
};

module.exports.getAllAppointments = function (req, res) {
  sess = req.session;
  sess.error = null;

  AppointmentModel.getAllAppointments(sess.username, function (err, result) {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  })

};

module.exports.renderAppointmentDetails = function (req, res) {
  sess = req.session;
  sess.error = null;

  var serverAddress = process.env.SERVER_ADDRESS;
  console.log(serverAddress);

  AppointmentModel.getAppointment(sess.username, req.params.id, function (err, result) {
    if (err) {
      console.log(err);
      res.end();
    } else {

      console.log(result[0]);

      var displayDate = datetime.syncGetDateInDisplayFormat(result[0].DesiredDateTime);
      var displayTime = datetime.syncGetTimeInDisplayFormat(result[0].DesiredDateTime);

      if (sess.userType == '2') {
        res.render('AppointmentDetailViewAdmin', { result, serverAddress, displayDate, displayTime });
      } else
        res.render('AppointmentDetailView', { result, serverAddress, displayDate, displayTime });
    }
  })

}

module.exports.deleteAppointment = function (req, res) {
  sess = req.session;
  sess.error = null;

  console.log(req.params);

  AppointmentModel.deleteAppointment(req.params.id, req.params.username, function (err, result) {
    if (err) {
      console.log(err);
      res.json(err);
    } else {
      console.log(result);
      res.json(result);
    }
  })



}


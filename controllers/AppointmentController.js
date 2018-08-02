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

  AppointmentModel.getAllAppointments(function (err, result) {
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
  var userType = sess.userType;

  var serverAddress = process.env.SERVER_ADDRESS;
  console.log(serverAddress);

  AppointmentModel.getAppointment(req.params.id, function (err, result) {
    if (err) {
      console.log(err);
      res.end();
    } else {

      console.log(result[0]);

      datePromise = Promise.resolve(datetime.syncGetDateInDisplayFormat(JSON.stringify(result[0].DesiredDate)));
      timePromise = Promise.resolve(datetime.syncGetTimeInDisplayFormat(JSON.stringify(result[0].DesiredTime)));

      datePromise.then(function(displayDate){
        timePromise.then(function(displayTime) {

          console.log('logging display date and time');
          console.log(displayDate);
          console.log(displayTime);

          res.render('AppointmentDetailView', { result, serverAddress, displayDate, displayTime, userType }); 
        })
      })
    }
  })

}

module.exports.deleteAppointment = function (req, res) {
  sess = req.session;
  sess.error = null;

  console.log(req.params);

  AppointmentModel.deleteAppointment(req.params.id, function (err, result) {
    if (err) {
      console.log(err);
      res.json(err);
    } else {
      console.log(result);
      res.json(result);
    }
  })



}


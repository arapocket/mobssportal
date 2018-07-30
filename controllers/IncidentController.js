var express = require('express');
var router = express.Router();
var IncidentModel = require('../models/IncidentModel');


module.exports.postIncident = function (req, res) {

  sess = req.session;
  sess.error = null;


  IncidentModel.postIncident(sess.username, req.body, function (err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.redirect('/incidentlist');
    }
  });
};

module.exports.putIncident = function (req, res) {

  sess = req.session;
  sess.error = null;


  IncidentModel.putIncident(req.params.id, req.body, function (err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
};

module.exports.getAllIncidents =  function (req, res){
  sess = req.session;
  sess.error = null;

  IncidentModel.getAllIncidents(sess.username, function (err, result) {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  })

};

module.exports.renderIncidentDetails = function (req, res){
  sess = req.session;
  sess.error = null;

  var serverAddress = process.env.SERVER_ADDRESS;
  console.log(serverAddress);

  IncidentModel.getIncident(sess.username, req.params.id, function (err, result){
    if (err){
      console.log(err);
      res.end();
    } else {
      res.render('IncidentDetailView', {result, serverAddress});
    }
  })

}

module.exports.deleteIncident = function (req, res){
  sess = req.session;
  sess.error = null;

  console.log(req.params);

  IncidentModel.deleteIncident(req.params.id, req.params.username, function (err, result){
    if (err){
      console.log(err);
      res.json(err);
    } else {
      console.log(result);
      res.json(result);
    }
  })
  


}


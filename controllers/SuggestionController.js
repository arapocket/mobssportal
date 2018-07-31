var express = require('express');
var router = express.Router();
var SuggestionModel = require('../models/SuggestionModel');

module.exports.postSuggestion = function (req, res) {

  sess = req.session;
  sess.error = null;


  SuggestionModel.postSuggestion(sess.username, req.body, function (err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.redirect('/suggestionlist');
    }
  });
};

module.exports.putSuggestion = function (req, res) {

  sess = req.session;
  sess.error = null;


  SuggestionModel.putSuggestion(req.params.id, req.body, function (err, result) {
    if (err) {
      res.json(err);
    }
    else {
      res.json(result);
    }
  });
};

module.exports.getAllSuggestions = function (req, res) {
  sess = req.session;
  sess.error = null;

  SuggestionModel.getAllSuggestions(sess.username, function (err, result) {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  })

};

module.exports.renderSuggestionDetails = function (req, res) {
  sess = req.session;
  sess.error = null;

  var serverAddress = process.env.SERVER_ADDRESS;
  console.log(serverAddress);

  SuggestionModel.getSuggestion(sess.username, req.params.id, function (err, result) {
    if (err) {
      console.log(err);
      res.end();
    } else {
      res.render('SuggestionDetailView', { result, serverAddress });
    }
  })

}

module.exports.deleteSuggestion = function (req, res) {
  sess = req.session;
  sess.error = null;

  console.log(req.params);

  SuggestionModel.deleteSuggestion(req.params.id, req.params.username, function (err, result) {
    if (err) {
      console.log(err);
      res.json(err);
    } else {
      console.log(result);
      res.json(result);
    }
  })



}




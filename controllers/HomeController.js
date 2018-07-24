var express = require('express');
var router = express.Router();
var HomeModel = require('../models/HomeModel');

module.exports.renderHome = function (req, res) {
  HomeModel.renderHome(function (err, result) {
    if (err) {
      res.json(err);
    }
    else {
        res.render('HomeView', { title: 'Mobss Customer Portal'});
    }
  });
};
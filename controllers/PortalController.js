var express = require('express');
var router = express.Router();
var UserModel = require('../models/UserModel');
var IncidentModel = require('../models/IncidentModel')

exports.renderIncidentView = function (req, res) {

    sess = req.session;
    sess.error = null;

    if (typeof sess.username == 'undefined') res.redirect('/');
        else {
        res.render('IncidentView');
    }

}

exports.renderIncidentListView = function (req, res) {

    sess = req.session;
    sess.error = null;

    if (typeof sess.username == 'undefined') res.redirect('/');
        else {
        IncidentModel.getAllIncidents(sess.username, function (err, getAllIncidentsResult){
            if (err){
                console.log(err);
                res.end();
            } else {
                console.log(getAllIncidentsResult);
                res.render('IncidentListView', {getAllIncidentsResult} );
            }
        })
    }

}



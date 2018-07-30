var express = require('express');
var router = express.Router();
var UserModel = require('../models/UserModel');
var IncidentModel = require('../models/IncidentModel')
var SuggestionModel = require('../models/SuggestionModel')

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

exports.renderSuggestionView = function (req, res) {

    sess = req.session;
    sess.error = null;

    if (typeof sess.username == 'undefined') res.redirect('/');
        else {
        res.render('SuggestionView');
    }

}

exports.renderSuggestionListView = function (req, res) {

    sess = req.session;
    sess.error = null;

    if (typeof sess.username == 'undefined') res.redirect('/');
    else {
        SuggestionModel.getAllSuggestions(sess.username, function (err, getAllSuggestionsResult) {
            if (err) {
                console.log(err);
                res.end();
            } else {
                console.log(getAllSuggestionsResult);
                res.render('SuggestionListView', { getAllSuggestionsResult });
            }
        })
    }

}



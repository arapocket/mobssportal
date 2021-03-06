var express = require('express');
var router = express.Router();
var UserModel = require('../models/UserModel');
var IncidentModel = require('../models/IncidentModel')
var SuggestionModel = require('../models/SuggestionModel')
var AppointmentModel = require('../models/AppointmentModel')

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
        IncidentModel.getAllIncidents(function (err, getAllIncidentsResult) {
            if (err) {
                console.log(err);
                res.end();
            } else {
                console.log(getAllIncidentsResult);
                res.render('IncidentListView', { getAllIncidentsResult });
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
        SuggestionModel.getAllSuggestions(function (err, getAllSuggestionsResult) {
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

exports.renderAppointmentView = function (req, res) {

    sess = req.session;
    sess.error = null;

    if (typeof sess.username == 'undefined') res.redirect('/');
    else {
        res.render('AppointmentView');
    }

}

exports.renderAppointmentListView = function (req, res) {

    sess = req.session;
    sess.error = null;

    if (typeof sess.username == 'undefined') res.redirect('/');
    else {
        AppointmentModel.getAllAppointments(function (err, getAllAppointmentsResult) {
            if (err) {
                console.log(err);
                res.end();
            } else {
                console.log(getAllAppointmentsResult);
                res.render('AppointmentListView', { getAllAppointmentsResult });
            }
        })
    }

}



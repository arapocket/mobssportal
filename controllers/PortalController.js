var express = require('express');
var router = express.Router();
var UserModel = require('../models/UserModel');


exports.renderNewWorkOrderView = function (req, res) {
    if (typeof sess.username == 'undefined') res.redirect('/');
        else {
        res.render('WorkOrderView');
    }

}



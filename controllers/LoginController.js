var express = require('express');
var router = express.Router();
var UserModel = require('../models/UserModel');

exports.renderHome = function (req, res) {

  // initiatie the session and check the Id in the console
  sess = req.session;
  sess.error = null;
  var setup = "yes"


  if (typeof sess.username == 'undefined') {
    res.render('LoginView', { title: 'Command Center', setup });
    // if user is logged in already, take them straight to the dashboard list
  } else {


    UserModel.authenticateUser(sess.username, sess.password, function (err, getUserResult) {
      if (err) {
        console.log('logging authenticate error');
        console.log(err)
        if (err == 'Authentication_fail_creds') { sess.error = 'Username and/or password are incorrect' };
        if (err == 'Authentication_fail_status') { sess.error = 'User authorization not current' };

        res.render('LoginView', { title: 'Command Center' });
      } else {

        console.log('taking user to PortalView');
        console.log(getUserResult);
        res.render('PortalView', { title: 'Mobss Customer Portal', getUserResult });

      }

    });

  }
};

exports.renderPortal = function (req, res) {

  //feb--if no username input, send back to home page
  if (typeof req.body.username == 'undefined') {
    // redirect the user back to homepage
    res.redirect('/');
  } else {
    //feb--add username to the session object.  important for this to be read in home handler
    //feb--checking the session IDs are consistent throughout 
    sess = req.session;
    sess.username = req.body.username;
    sess.password = req.body.password;
    // redirect the user to homepage
    res.redirect('/');
  }

}


// UserModel.authenticateUser(sess.username, sess.password, function (err, resAu) {
//   if (err) {
//     console.log(err)
//     if (err == 'Authentication_fail_creds') { sess.error = 'Username and/or password are incorrect' };
//     if (err == 'Authentication_fail_status') { sess.error = 'User authorization not current' };

//     res.render('LoginView', { title: 'Command Center' });
//   } else {

//     res.redirect('/portal');

//   }

// });
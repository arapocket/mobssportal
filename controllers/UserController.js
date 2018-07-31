///////////////////////////////////////////////////////////////////////////////////////
//* Process the setting up of all command center client, other than the Administrator //
///////////////////////////////////////////////////////////////////////////////////////


var mysql = require('mysql');
var fs = require('fs');
var path = require('path');
var datetime = require('./datetime');
var db = require('../models/db');
var user = require('../models/UserModel');


//////////////////////////////
//   show the list of client //
//////////////////////////////
module.exports.usersHome = function (req, res) {
  sess = req.session;
  // initializes the success/error messages for the report generation
  // ..so that messages are removed after leaving and re-entering the attendance ascreen
  sess.rptSuccess = null;
  sess.rptError = null;

  // don't let nameless people view the dashboard, redirect them back to the homepage
      if (typeof sess.username == 'undefined') res.redirect('/');
      else {

    db.createConnection(function (err, reslt) {
      if (err) {
        callback(err, null);
      } else {
        //process the i/o after successful connect.  Connection object returned in callback
        var connection = reslt;

        var _sqlQ = "SELECT * FROM client";
        connection.query(_sqlQ, function (err, results) {
          if (err) { console.log('user query bad' + err); connection.end(); callback(true); return; }

          connection.end()
          /**
           * Only show the client screen if user has privilege
           * 
           */
          if (sess.userType == '2') {
            res.render('ClientsView', { title: 'Command Center', username: req.session.username, results });
          } else {
            res.render('UnauthorizedView', { title: 'Command Center' });
          }

        });
      }
    });
      }
};

///////////////////////////////////
//* Add a new user to the system //
///////////////////////////////////
exports.userAdd = function (req, res) {
  sess = req.session;
      // don't let nameless people view the dashboard, redirect them back to the homepage
      if (typeof sess.username == 'undefined') res.redirect('/');
      else {

        var name = req.query.name;
        /**
         * Only show the client screen if user has privilege
         */
    if (sess.userType == '2') {
      res.render('userAdd', { title: 'Command Center' });
    } else {
      res.render('UnauthorizedView', { title: 'Command Center' });
    }
  };
};

//feb--handler for posting the event information to the database
module.exports.userAddToDb = function (req, res) {

  //get a connection using the common handler in models/db.js
  db.createConnection(function (err, reslt) {
    if (err) {
      console.log('Error while performing common connect query: ' + err);
      callback(err, null);
    } else {
      //process the i/o after successful connect.  Connection object returned in callback
      var connection = reslt;

      var buildUserQuery = (function () {
        var insertUser = function (field1, field2, field3, field4, field5, field6, field7, field8) {

          var _userName = field1;
          /**
           * Call common handler to hash the password with 'salt' and store both in db
           */
          var _passData = user.saltHashPassword(field2);
          var _password = _passData.hash
          var _rgen = _passData.salt
          console.log('password returned : ' + _password)

          var _lastName = field3;
          var _firstName = field4;
          var _empID = field5;
          var _userEmail = field6;
          var _status = field7;
          var _privLevel = field8;




          /**
          * Use the cmmon date handler to return the timestamp in a more usable
          * format for the database
          */
          var _date = datetime.syncCurrentDateTimeforDB();

          var _qFields = '(ClientUsername, Password, ContactLastName, ContactFirstName, ClientID, ContactEmail, Status, UpdateTime, PrivLevel, RGen)';
          var _qValues = '("' + _userName + '", "' + _password + '", "' + _lastName + '", "' + _firstName + '", "' + _empID + '", "' + _userEmail + '", "' + _status + '", "' + _date + '", "' + _privLevel + '", "' + _rgen + '")';
          var parmQuery3 = 'INSERT INTO client ' + _qFields + ' VALUES ' + _qValues;
          //console.log('parmQuery3= '+parmQuery3);
          return parmQuery3;
        };
        return { insertUser: insertUser };
      })();//end of revealing module


      //set the privilege level for database based on the user input
      var _privLevel = '';
      if (req.body.PrivLevel == 'User') {
        _privLevel = '1';
      } else if (req.body.PrivLevel == 'Administrator') {
        _privLevel = '2';
      } else { _privLevel = '3' }

      //set the Status  for database based on the user input
      var _status = '';
      if (req.body.Status == 'Active') {
        _status = '1';
      } else if (req.body.Status == 'Suspended') {
        _status = '2';
      } else { _status = '3' }

      var strSQL = buildUserQuery.insertUser(req.body.ClientUsername, req.body.Password, req.body.ContactLastName, req.body.ContactFirstName, req.body.ClientID, req.body.ContactEmail, _status, _privLevel);
      console.log('USER ADD strSQL= ' + strSQL);
      var query = connection.query(strSQL, function (err, result) {

        if (err) {
          console.log(err)
          sess.error = 'There was a problem updating the mobss database: ' + err;
          connection.end();
          res.render('userAdd', { title: 'Command Center 360' });
        } else {

          connection.end();
          res.status(301).redirect('/users');
        }
      });//end of connection.query
    }
  });

}; //end of user post handler

////////////////////////////////////////
// Get a user record for modification //
////////////////////////////////////////
module.exports.userGetOne = function (req, res) {

  sess = req.session;
      // don't let nameless people view the dashboard, redirect them back to the homepage
      if (typeof sess.username == 'undefined') res.redirect('/');
      else {

    //get a connection using the common handler in models/db.js
    db.createConnection(function (err, reslt) {
      if (err) {
        console.log('Error while performing common connect query: ' + err);
        callback(err, null);
      } else {
        //process the i/o after successful connect.  Connection object returned in callback
        var connection = reslt;

        var strSQL = 'SELECT * FROM client WHERE ClientUsername="' + req.params.userName + '"';
        console.log('here is the query string' + strSQL);
        var query = connection.query(strSQL, function (err, results) {

          console.log('logging userGetOne results');
          console.log(results)

          if (err) {
            console.log(err)
            connection.end();
            //sess.error = 'There was a problem updating the mobss database: '+err;
            res.render('ClientsView', { title: 'Command Center' });
          } else {
            connection.end();
            res.render('userModify', { title: 'Command Center', results });


          };
        });//end of connection.query
      }
    });
  };
}; //end of handler



////////////////////////////////////////////////
// Update the datebase with the modifications //
////////////////////////////////////////////////
exports.userUpdateOne = function (req, res) {
  sess = req.session;
      var name = req.query.name;

  //get a connection using the common handler in models/db.js
  db.createConnection(function (err, reslt) {
    if (err) {
      console.log('Error while performing common connect query: ' + err);
      callback(err, null);
    } else {
      //process the i/o after successful connect.  Connection object returned in callback
      var connection = reslt;

      var buildUserQuery = (function () {
        var updateUser = function (field1, field2, field3, field4, field5, field6, field7) {

          var _userName = field1;
          var _lastName = field2;
          var _firstName = field3;
          var _empID = field4;
          var _userEmail = field5;
          var _status = field6;
          var _privLevel = field7;


          /**
          * Use the cmmon date handler to return the timestamp in a more usable
          * format for the database
          */
          var _date = datetime.syncCurrentDateTimeforDB();


          var _qFields = '(ClientUsername, ContactLastName, ContactFirstName, ClientID, ContactEmail, Status, UpdateTime, PrivLevel)';
          var _qValues = '("' + _userName + '", "' + _lastName + '", "' + _firstName + '", "' + _empID + '", "' + _userEmail + '", "' + _status + '", "' + _date + '", "' + _privLevel + '")';
          var _qUpdates = 'ClientUsername="' + _userName + '", ContactLastName="' + _lastName + '"' + ', ContactFirstName="' + _firstName + '"' + ', ClientID="' + _empID + '"' + ', ContactEmail="' + _userEmail + '"' + ', Status="' + _status + '"' + ', UpdateTime="' + _date + '"' + ', PrivLevel="' + _privLevel + '"';
          var parmQuery3 = 'UPDATE client SET ' + _qUpdates + ' WHERE ClientUsername="' + _userName + '"';
          //console.log('parmQuery3= '+parmQuery3);
          return parmQuery3;
        };
        return { updateUser: updateUser };
      })();//end of revealing module

      //set the privilege level for database based on the user input
      var _privLevel = '';
      if (req.body.PrivLevel == 'User') {
        _privLevel = '1';
      } else if (req.body.PrivLevel == 'Administrator') {
        _privLevel = '2';
      } else { _privLevel = '3' }

      //set the Status  for database based on the user input
      console.log('here is the Status ' + req.body.Status)

      var _status = '';
      if (req.body.Status == 'Active') {
        _status = '1';
      } else if (req.body.Status == 'Suspended') {
        _status = '2';
      } else { _status = '3' }

      /**
       * Get the username from request object -- can't retrieve from the read-only "disabled" field
       */

      var strSQL = buildUserQuery.updateUser(req.body.ClientUsername, req.body.ContactLastName, req.body.ContactFirstName, req.body.ClientID, req.body.ContactEmail, _status, _privLevel);

      console.log('update strSQL= ' + strSQL);

      var query = connection.query(strSQL, function (err, result) {

        if (err) {
          console.log(err)
          sess.error = 'There was a problem updating the mobss database: ' + err;
          connection.end();
          res.render('userModify', { title: 'Command Center' });
        } else {
          console.log("successful update")
          connection.end();
          res.status(301).redirect('/users');

        };
      });//feb--end of connection.query
    }
  });
};



////////////////////////////////////////
// Get a user record for deletion     //
////////////////////////////////////////
module.exports.userGetOneForDelete = function (req, res) {

  sess = req.session;
      // don't let nameless people view the dashboard, redirect them back to the homepage
      if (typeof sess.username == 'undefined') res.redirect('/');
      else {

    //get a connection using the common handler in models/db.js
    db.createConnection(function (err, reslt) {
      if (err) {
        console.log('Error while performing common connect query: ' + err);
        callback(err, null);
      } else {
        //process the i/o after successful connect.  Connection object returned in callback
        var connection = reslt;

        var strSQL = 'SELECT * FROM client WHERE ClientUsername="' + req.params.userName + '"';
        console.log('here is the query string' + strSQL);
        var query = connection.query(strSQL, function (err, results) {

          if (err) {
            console.log(err)
            connection.end();
            //sess.error = 'There was a problem updating the mobss database: '+err;
            res.render('ClientsView', { title: 'Command Center' });
          } else {
            connection.end();
            res.render('userDelete', { title: 'Command Center', results });


          };
        });//end of connection.query
      }
    });
  };
}; //end of handler

////////////////////////////////////////////////
// delete the record from the database        //
////////////////////////////////////////////////
module.exports.userDeleteOne = function (req, res) {

  sess = req.session;
      // don't let nameless people view the dashboard, redirect them back to the homepage
      if (typeof sess.username == 'undefined') res.redirect('/');
      else {

    //get a connection using the common handler in models/db.js
    db.createConnection(function (err, reslt) {
      if (err) {
        console.log('Error while performing common connect query: ' + err);
        callback(err, null);
      } else {
        //process the i/o after successful connect.  Connection object returned in callback
        var connection = reslt;

        var strSQL = 'DELETE FROM client WHERE ClientUsername="' + req.params.userName + '"';
        console.log('here is the query string' + strSQL);
        var query = connection.query(strSQL, function (err, results) {

          if (err) {
            console.log(err)
            connection.end();
            //sess.error = 'There was a problem updating the mobss database: '+err;
            res.render('ClientsView', { title: 'Command Center' });
          } else {
            connection.end();
            res.status(301).redirect('/users');


          };
        });//end of connection.query
      }
    });
  };
}; //end of handler
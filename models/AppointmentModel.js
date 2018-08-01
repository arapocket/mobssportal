var db = require('./db');
var datetime = require('../controllers/datetime');
var time = datetime.syncCurrentDateTimeforDB();
var CreateRandom = require('../CreateRandom');

module.exports.getAppointment = function (username, orderID, callback) {
    db.createConnection(function (err, result) {
        if (err) {
            console.log('Error connecting to db');
            callback(err, null);
        } else {
            var connection = result;

            var query = 'SELECT * FROM appointment WHERE AppointmentID = "' + orderID + '";'
            connection.query(query, function (err, rows, fields) {
                if (!err) {
                    connection.end();
                    callback(null, rows);
                } else {
                    console.log('error with the getAppointment query');
                    connection.end();
                    callback(err, rows);
                }
            })
        }
    })
}

module.exports.deleteAppointment = function (orderID, username, callback){
    db.createConnection(function (err, result){
        if (err){
            console.log('Error connecting to db');
            callback(err, null);
        } else {
            var connection = result;

            var query = 'DELETE FROM appointment WHERE ClientUsername =  "' + username + '" AND AppointmentID = "' + orderID + '";'
            console.log(query);
            connection.query(query, function (err, rows, fields) {
                if (!err) {
                    connection.end();
                    callback(null, rows);
                } else {
                    console.log('error with the getAppointment query');
                    connection.end();
                    callback(err, rows);
                }
            })
        }
    })
}

module.exports.postAppointment = function (user, Body, callback) {

    db.createConnection(function (err, result) {
        if (err) {
            console.log('Error while performing common connect query: ' + err);
            callback(err, null);
        } else {
            //process the i/o after successful connect.  Connection object returned in callback
            var connection = result;
            var orderID = CreateRandom.create();

            var queryFields = '(ClientUsername, AppointmentID, Subject, Comment, TimePosted, DesiredDate, DesiredTime)';
            var queryValues = '"' + user + '", "' + orderID + '", "' + Body.Subject + '", "' + Body.Comment + '", "' + time + '", "' + Body.DesiredDate + '", "' + Body.DesiredTime + '");';
            var query = 'INSERT INTO appointment ' + queryFields + ' VALUES (' + queryValues;


            console.log('logging query from postAppointment');
            console.log(query);

            connection.query(query, function (err, rows, fields) {
                if (!err) {
                    connection.end();
                    callback(null, rows);

                } else {
                    console.log('error with the query');
                    connection.end();
                    callback(err, rows);
                }
            });
        }
    });
}

module.exports.putAppointment = function (id, Body, callback) {

    db.createConnection(function (err, result) {
        if (err) {
            console.log('Error while performing common connect query: ' + err);
            callback(err, null);
        } else {
            //process the i/o after successful connect.  Connection object returned in callback

            var dateTime = Body.Date + ' ' + Body.Time;

            var connection = result;
            var orderID = CreateRandom.create();
            var query = 'UPDATE appointment SET Subject = "' + Body.Subject + '", Comment = "' + Body.Comment + '", Status = "' + Body.Status + '", StatusNote = "' + Body.StatusNote + '", UpdateTime="' + time + '", DesiredDate = "' + Body.Date + ', DesiredTime = "' + Body.Time + '" WHERE AppointmentID = "' + id + '";'
            console.log('logging query from putAppointment');
            console.log(query);

            connection.query(query, function (err, rows, fields) {
                if (!err) {
                    connection.end();
                    callback(null, rows);

                } else {
                    console.log('error with the putAppointment query');
                    console.log(err);
                    connection.end();
                    callback(err, rows);
                }
            });
        }
    });
}

module.exports.getAllAppointments = function (username, callback) {

    db.createConnection(function (err, result) {
        if (err) {
            console.log('Error connecting to database')
            callback(err, null);
        } else {
            var connection = result;
            var queryField = 'ClientUsername';
            var query = 'SELECT * FROM appointment WHERE ' + queryField + ' = "' + username + '";'

            connection.query(query, function (err, rows, fields) {
                if (!err) {
                    connection.end();
                    callback(null, rows);
                } else {
                    console.log('error with the query');
                    connection.end();
                    callback(err, rows);
                }
            })
        }
    })
}
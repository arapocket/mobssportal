var db = require('./db');
var datetime = require('../controllers/datetime');
var time = datetime.syncCurrentDateTimeforDB();
var CreateRandom = require('../CreateRandom');

module.exports.getIncident = function (orderID, callback) {
    db.createConnection(function (err, result) {
        if (err) {
            console.log('Error connecting to db');
            callback(err, null);
        } else {
            var connection = result;

            var query = 'SELECT * FROM incident WHERE  IncidentID = "' + orderID + '";'
            connection.query(query, function (err, rows, fields) {
                if (!err) {
                    connection.end();
                    callback(null, rows);
                } else {
                    console.log('error with the getIncident query');
                    connection.end();
                    callback(err, rows);
                }
            })
        }
    })
}

module.exports.deleteIncident = function (orderID, callback){
    db.createConnection(function (err, result){
        if (err){
            console.log('Error connecting to db');
            callback(err, null);
        } else {
            var connection = result;

            var query = 'DELETE FROM incident WHERE  IncidentID = "' + orderID + '";'
            console.log(query);
            connection.query(query, function (err, rows, fields) {
                if (!err) {
                    connection.end();
                    callback(null, rows);
                } else {
                    console.log('error with the getIncident query');
                    connection.end();
                    callback(err, rows);
                }
            })
        }
    })


}

module.exports.postIncident = function (user, Body, callback) {

    db.createConnection(function (err, result) {
        if (err) {
            console.log('Error while performing common connect query: ' + err);
            callback(err, null);
        } else {
            //process the i/o after successful connect.  Connection object returned in callback
            var connection = result;
            var orderID = CreateRandom.create();

            var queryFields = '(ClientUsername, IncidentID, Subject, Description, TimePosted)';
            var queryValues = '"' + user + '", "' + orderID + '", "' + Body.Subject + '", "' + Body.Description + '", "' + time + '")';
            var query = 'INSERT INTO incident ' + queryFields + ' VALUES (' + queryValues;

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

module.exports.putIncident = function (id, Body, callback) {

    db.createConnection(function (err, result) {
        if (err) {
            console.log('Error while performing common connect query: ' + err);
            callback(err, null);
        } else {
            //process the i/o after successful connect.  Connection object returned in callback
            var connection = result;
            var orderID = CreateRandom.create();
            var query = 'UPDATE incident SET Subject = "' + Body.Subject + '", Description = "' + Body.Description + '", Status = "' + Body.Status + '", StatusNote = "' + Body.StatusNote + '", UpdateTime = "' + time + '" WHERE IncidentID ="' + id + '";'

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

module.exports.getAllIncidents = function (callback) {

    db.createConnection(function (err, result) {
        if (err) {
            console.log('Error connecting to database')
            callback(err, null);
        } else {
            var connection = result;
            var query = 'SELECT * FROM incident;'

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
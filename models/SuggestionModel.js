var db = require('./db');
var datetime = require('../controllers/datetime');
var time = datetime.syncCurrentDateTimeforDB();
var CreateRandom = require('../CreateRandom');

module.exports.getSuggestion = function (orderID, callback) {
    db.createConnection(function (err, result) {
        if (err) {
            console.log('Error connecting to db');
            callback(err, null);
        } else {
            var connection = result;

            var query = 'SELECT * FROM suggestion WHERE SuggestionID = "' + orderID + '";'
            connection.query(query, function (err, rows, fields) {
                if (!err) {
                    connection.end();
                    callback(null, rows);
                } else {
                    console.log('error with the getSuggestion query');
                    connection.end();
                    callback(err, rows);
                }
            })
        }
    })
}

module.exports.deleteSuggestion = function (orderID, callback){
    db.createConnection(function (err, result){
        if (err){
            console.log('Error connecting to db');
            callback(err, null);
        } else {
            var connection = result;

            var query = 'DELETE FROM suggestion WHERE SuggestionID = "' + orderID + '";'
            console.log(query);
            connection.query(query, function (err, rows, fields) {
                if (!err) {
                    connection.end();
                    callback(null, rows);
                } else {
                    console.log('error with the getSuggestion query');
                    connection.end();
                    callback(err, rows);
                }
            })
        }
    })


}

module.exports.postSuggestion = function (user, Body, callback) {

    db.createConnection(function (err, result) {
        if (err) {
            console.log('Error while performing common connect query: ' + err);
            callback(err, null);
        } else {
            //process the i/o after successful connect.  Connection object returned in callback
            var connection = result;
            var orderID = CreateRandom.create();

            var queryFields = '(ClientUsername, SuggestionID, Subject, Description, TimePosted)';
            var queryValues = '"' + user + '", "' + orderID + '", "' + Body.Subject + '", "' + Body.Description + '", "' + time + '")';
            var query = 'INSERT INTO suggestion ' + queryFields + ' VALUES (' + queryValues;

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

module.exports.putSuggestion = function (id, Body, callback) {

    db.createConnection(function (err, result) {
        if (err) {
            console.log('Error while performing common connect query: ' + err);
            callback(err, null);
        } else {
            //process the i/o after successful connect.  Connection object returned in callback
            var connection = result;
            var orderID = CreateRandom.create();
            var query = 'UPDATE suggestion SET Subject = "' + Body.Subject + '", Description = "' + Body.Description + '", Status = "' + Body.Status + '", StatusNote = "' + Body.StatusNote +  '", UpdateTime = "' + time + '" WHERE SuggestionID ="' + id + '";'

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

module.exports.getAllSuggestions = function (callback) {

    db.createConnection(function (err, result) {
        if (err) {
            console.log('Error connecting to database')
            callback(err, null);
        } else {
            var connection = result;
            var query = 'SELECT * FROM suggestion'

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
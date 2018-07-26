var db = require('./db');
var datetime = require('../controllers/datetime');
var time = datetime.syncCurrentDateTimeforDB();

module.exports.postWorkOrder = function (Body, callback) {

    db.createConnection(function (err, reslt) {
        if (err) {
            console.log('Error while performing common connect query: ' + err);
            callback(err, null);
        } else {
            //process the i/o after successful connect.  Connection object returned in callback
            var connection = reslt;

            var queryFields = '(ClientID, OrderID, Subject, Description, ContactName, ContactPhone, ContactEmail, TimePosted)';
            var queryValues = '"' + Body.ClientID + '", "' + Body.OrderID + '", "' + Body.Subject + '", "' + Body.Description + '", "' + Body.ContactName + '", "' + Body.ContactPhone + '", "' + Body.ContactEmail +  '","' + time + '")';
            var query = 'INSERT INTO work_order ' + queryFields + ' VALUES (' + queryValues;

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
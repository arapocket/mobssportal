var mysql      = require('mysql');

//Make the connection set up reusable from everywhere and also make it
// dependant on the .env environment variables
module.exports.createConnection = function(callback){
var connection = mysql.createConnection({
  
  //user     : sess.username,
  //password : sess.password,
 
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASS,
  database : process.env.DB_NAME
});
// ###### Wed Feb 7 17:13:59 PST 2018 ARA
  // console.log('does this dotenv stuff work '+process.env.DB_PASS);
  connection.connect(function(err) {
  if (err) {
    console.error('error doing the modularized connect ' + err.stack);
    // email mobss support if there is a problem connecting to the database
    callback('error connecting to database in db.js', null);
  } else {
    callback(null, connection);
};
});
};

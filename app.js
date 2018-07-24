var express = require('express');
var helmet = require('helmet')
var bodyParser = require('body-parser');
var mysql = require('mysql');
var path = require('path');


var https = require("https")
var http = require("http")
var fs = require('fs');
require('dotenv').config();


// attempt to use express 4 sessions, as express 3 method now deprecated
var session = require('express-session');

/**
 * SSL certificate set up, if SSL is ON and conditioned on
 * whether cert was generated with a passphrase or not
 */

if (process.env.CC_SSL == "YES") {
  var privateKey = fs.readFileSync(process.env.CERT_NAME + '.key').toString();
  var certificate = fs.readFileSync(process.env.CERT_NAME + '.crt').toString();
  if (process.env.CERT_PASSPHRASE == "") {
    var options = { key: privateKey, cert: certificate };
  } else {
    var passphrase = process.env.CERT_PASSPHRASE
    var options = { key: privateKey, cert: certificate, passphrase: passphrase };
  }
}

var app = express();

app.use(helmet());

// which index file to use
var routes = require('./routes/index');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');




// following two lines work for looging in but no post data is read
app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({ extended: false }));

//following lines 
//app.use(bodyParser.json({limit: '50mb'}));
//app.use(bodyParser.json({limit:1024*1024*20, type:'application/json'}));
//--> works for login not for verifyercords app.use(bodyParser.urlencoded({limit: '50mb', extended: false, parameterLimit:50000}));
//-APR 20-> x-www and multiform both work for posting (as long as using irldecode in script).  BUT log-in does not
app.use(bodyParser.urlencoded({ extended: true, limit: 1024 * 1024 * 20, type: 'application/x-www-form-urlencoding' }));
//app.use(bodyParser.json({limit:1024*1024*20, type:'application/json'}));
//--> works for verify records not for log-in  app.use(bodyParser.urlencoded({ extended:true,limit:1024*1024*20,type:'application/x-www-form-urlencoding'}));

app.use(require('stylus').middleware(__dirname + '/public'));
// feb-- .lc processing.  this line has to go BEFORE the app.use(express.static) line, or it doesnt run the engine.
// feb-- tried to do this through the router but couldnt get it to work

app.use(express.static(path.join(__dirname, 'public')));

//feb-- the new express 4 sessions stuff, as express 3 method now deprecated
app.use(session({
  secret: 'boris',
  saveUninitialized: true,
  resave: true
}));


app.use(bodyParser.urlencoded({ limit: '50mb', extended: false, parameterLimit: 50000 }));



app.use('/', routes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


var port = process.env.PORT || 3000;


var server = app.listen(port, function () {
  console.log("Listening on " + port);

});

server.listen(port);

/** 
 * If SSL enabled, create a server instance for SSL
 * 
 */

if (process.env.CC_SSL == "YES") {
  var secureServer = https.createServer(options, app).listen(443, function () {
    console.log('App listening on port 443!')
  });

} 



server.setTimeout(10 * 60 * 1000); // 10 * 60 seconds * 1000 msecs = 10 minutes




module.exports = app;

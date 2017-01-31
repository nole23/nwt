
var express = require('express');
var app  = express();
var bodyParser = require('body-parser');


var addUser = require('./app/addUserApp.js');
var addApplication = require('./app/aplication.js');
var application = require('./app/app.js');
var deleteUser = require('./app/deleteUser.js');
var procesError = require('./app/exeptionApp.js');
var index = require('./app/index.js');
var authenticate = require('./app/login.js');
var registration = require('./app/user.js');
var allUsers = require('./app/users.js');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/Napredne');

var session = require('express-session');

//konfiguracija aplikacije da koristi bodyParser
//sto ce nam omoguciti da dobijamo podatke iz POST zahteva
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
    secret: '2C44-4D44-WqpQ38s',
    resave: true,
    saveUninitialized: true
}))
//Port na kome se slusa server
var port = process.env.PORT || 8082;
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});

app.use('/api', addUser);
app.use('/api', addApplication);
app.use('/api', application);
app.use('/api', deleteUser);
app.use('/api', procesError);
app.use('/api', index);
app.use('/api', authenticate);
app.use('/api', registration);
app.use('/api', allUsers);


app.use('', express.static(__dirname + '/client'));
app.use('/lib', express.static(__dirname + '/bower_components'));


app.listen(port);
console.log('Server se slusa na portu ' + port);
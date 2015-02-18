var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var passport = require('./passport.js');
var authRouter = require('./auth/auth-router.js');
var apiRouter = require('./api/api-router.js');
var app = express();

var db = require('./database');

app.set('db', db);

app.set('port', process.env.PORT || 3000);

// for parsing JSON
app.use(bodyParser.json());

/** express sessions come before passport session to ensure that login
 *  session is restored in the correct order
 */
// app.use(express.session({ secret: 'keyboard cat' }));

// middleware required to initialize Passport.
app.use(passport.initialize());

// middleware for persistent login sessions
app.use(passport.session());

// morgan is the request logger middleware for node
app.use(morgan('combined'));

// FIXME: home page, this is temporary
app.get('/', function(req, res) {
  'use strict';
  res.set({
    'Content-Type': 'text/plain',
    'ETag': '12345'
  });
  res.status(200).send('Hello Alan!');
});

// router to handle all incoming api calls
app.use('/api', apiRouter);

// router for handling all requests to the /auth endpoint
app.use('/auth', authRouter);

module.exports = app;

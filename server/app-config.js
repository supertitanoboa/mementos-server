var express = require('express');
var morgan = require('morgan');
var mementosRouter = require('./mementos/mementos-router.js');
var momentsRouter = require('./moments/moments-router.js');
var app = express();

var db = require('./database');

app.set('db', db);

app.set('port', process.env.PORT || 3000);

// morgan is the request logger middleware for node
app.use(morgan('combined'));

// home page, this is temporary
app.get('/', function(req, res) {
  'use strict';
  res.set({
    'Content-Type': 'text/plain',
    'ETag': '12345'
  });
  res.status(200).send('Hello Alan!');
});

// router for handling all requests to the /mementos endpoint
app.use('/mementos', mementosRouter);

// router for handling all requests to the /moments endpoint
app.use('/moments', momentsRouter);

module.exports = app;

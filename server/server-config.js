var app = require('./server.js');
// var express = require('express');
var morgan = require('morgan');
// var path = require('path');
var mementosRouter = require('./mementos/mementos-router.js');
var momentsRouter = require('./moments/moments-router.js');

// morgan is the request logger middleware for node
app.use(morgan('combined'));

app.get('/', function(req, res) {
  'use strict';
  res.send('Hello Alan!');
});

// router for handling all requests to the /mementos endpoint
app.use('/mementos', mementosRouter);

// router for handling all requests to the /moments endpoint
app.use('/moments', momentsRouter);

module.exports = app;

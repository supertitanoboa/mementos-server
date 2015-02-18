var express = require('express');
var momentsRouter = express.Router();

// save a moment
momentsRouter.post('/', function(req, res) {
  'use strict';
  res.status(201).send('this is the endpoint to which we will be saving moments');
});

module.exports = momentsRouter;

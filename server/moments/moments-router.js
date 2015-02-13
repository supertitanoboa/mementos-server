var express = require('express');
var momentsRouter = express.Router();

// save a moment
momentsRouter.put('/', function(req, res) {
  'use strict';
  res.send('this is the endpoint to which we will be saving moments');
});

module.exports = momentsRouter;

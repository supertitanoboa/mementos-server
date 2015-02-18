var express = require('express');
var logoutRouter = express.Router();

logoutRouter.get('/', function(req, res) {
  'use strict';
  res.status(302).send('this is the endpoint to which we will be logging users out of the app');
});

module.exports = logoutRouter;

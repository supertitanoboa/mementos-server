var express = require('express');
var passport = require('../../passport.js');
var loginRouter = express.Router();

loginRouter.get('/', function(req, res) {
  'use strict';
  res.status(200).send('you are now on the login page');
});

// FIXME: needs proper response after successful authentication
loginRouter.post('/', 
  passport.authenticate('local'),
  function(req, res) {
    'use strict';
    res.status(201).send('user logged in');
  });

module.exports = loginRouter;

var express = require('express');
var passport = require('../../passport.js');
var loginRouter = express.Router();

// FIXME: needs proper response after successful authentication
loginRouter.post('/', 
  passport.authenticate('local'),
  function(req, res) {
    'use strict';
    res.status(201).send('user logged in');
  });

module.exports = loginRouter;

var express = require('express');
var passport = require('../../passport.js');
var signupRouter = express.Router();

// FIXME: needs proper response after successful authentication
signupRouter.post('/', 
  passport.authenticate('local'),
  function(req, res) {
    'use strict';
    // res.redirect('/');
    res.status(201).send('things');
  }); 

module.exports = signupRouter;

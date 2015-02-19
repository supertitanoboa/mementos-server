var express = require('express');
var passport = require('../../passport.js');
var signupRouter = express.Router();

signupRouter.get('/', function(req, res) {
  'use strict';
  // res.redirect('/');
  res.status(200).send('reached the signup page');
});   

// FIXME: needs proper response after successful authentication
signupRouter.post('/', 
  passport.authenticate('local'),
  function(req, res) {
    'use strict';
    // res.redirect('/');
    res.status(201).send('things');
  }); 

module.exports = signupRouter;

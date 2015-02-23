var express = require('express');
var passport = require('../../passport.js');
var loginRouter = express.Router();

loginRouter.get('/', function(req, res) {
  'use strict';
  res.status(200).send('you are now on the login page');
});

// FIXME: needs proper response after successful authentication
loginRouter.post('/', 
  // TODO: Session handling
  // passport.authenticate('local'),
  function(req, res) {
    'use strict';

    var user     = new req.db.Users({ email: req.body.email});
    var password = req.body.password; 

    user.fetch()
    .then(function(user) {
      if (user) {
        if (user.validatePass(password)) {
          res.cookie('sessionID', req.sessionID);
          res.status(201).send('User logged in');
        } else {
          res.status(400).send('Invalid username or password');
        }
      } else {
        res.status(404).send('User not found');
      }
    })
  });

module.exports = loginRouter;
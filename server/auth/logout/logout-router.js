var express = require('express');
// var app = require('../../app-config.js');
var logoutRouter = express.Router();

logoutRouter.get('/', function (req, res) {
  'use strict';
  req.session.destroy();
  res.redirect('/');
});

module.exports = logoutRouter;

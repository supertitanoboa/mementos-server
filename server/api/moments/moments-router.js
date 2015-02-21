var express = require('express');
var aws = require('../../aws/aws.js');
var momentsRouter = express.Router();

// save a moment
momentsRouter.post('/', function(req, res) {
  'use strict';
  res.status(201).send({momentID: 5});
});

momentsRouter.get('/sign_s3', function(req, res) {
  'use strict';
  aws.signedUrlAuth(req, res);
});

module.exports = momentsRouter;

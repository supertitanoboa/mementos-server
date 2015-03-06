var express = require('express');
var aws = require('../../aws/aws.js');
var momentjs = require('moment');
var async = require('async');
var momentsRouter = express.Router();
var db;

// save a moment
momentsRouter.post('/', function(req, res) {
  'use strict';
  var momentData = req.body;
  var pebbles = momentData.content;
  db = req.db;

  new db.Moments({
    title : req.body.title,
    author_id : req.userID,
    ordering : momentData.ordering,
    release_date : momentjs(momentData.releaseDate).format(),
    longitude : momentData.meta.location.longitude,
    latitude : momentData.meta.location.latitude,
    location : momentData.meta.location.place
  }).save()

  .then(function (moment) {
    var counter = 1;
    async.each(pebbles, function (pebble, done) {
      moment.addPebble(pebble.type, pebble.url, counter++)
      .then(function () {
        done();
      });
    },
    function () {
      res.status(201).send(moment.get('id'));
    });
  })
  .catch(function (err) {
    console.log('POST /moments ERROR:', err);
    res.status(500).send('ERROR while saving moment');
  });
});

momentsRouter.get('/sign_s3', function(req, res) {
  'use strict';
  aws.signedUrlAuth(req, res);
});

module.exports = momentsRouter;

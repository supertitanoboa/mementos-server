var express = require('express');
var aws = require('../../aws/aws.js');
var momentsRouter = express.Router();

// save a moment
momentsRouter.post('/', function(req, res) {
  'use strict';
  console.log('req.body', req.body);
  new req.db.Moments({
    title : req.body.title,
    author_id : req.userID,
    ordering : req.body.ordering,
    release_date : Date(req.body.releaseDate).slice(0,31),
    longitude : req.body.meta.location.longitude,
    latitude : req.body.meta.location.latitude,
    location : req.body.meta.location.place
  }).save()
  .then(function (moment) {
    var index;
    var pebble;
    var counter = 1;
    var numPebbles = req.body.content.length;
    var unfinishedPebbles = numPebbles;

    var checkFinished = function checkFinished () {
      unfinishedPebbles--;
      if(unfinishedPebbles === 0) {
        res.status(201).send(moment.get('id'));
      }
    };

    for(index = 0; index < numPebbles; index++) {
      pebble = req.body.content[index];
      moment.addPebble(pebble.type, pebble.url, counter++)
      .then(checkFinished);
    }
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

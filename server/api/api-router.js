var express = require('express');
var mementosRouter = require('./mementos/mementos-router.js');
var momentsRouter = require('./moments/moments-router.js');
var apiRouter = express.Router();

apiRouter.use(function (req, res, next) {
  'use strict';
  console.log('req.headers.sessionid: ', req.headers.sessionid);
  req.redis.redisOptions.client.get(req.headers.sessionid, function(err, reply) {
    if (err) {
      console.log('err', err);
      res.status(403).send('Error retrieving userID associated with sessionID');
    } else if (reply) {
      req.userID = reply;
      next();
    } else {
      res.status(403).send('userID associated with sessionID not found in redis');
    }
  });
});

// router for handling all requests to the /mementos endpoint
apiRouter.use('/1/mementos', mementosRouter);

// router for handling all requests to the /moments endpoint
apiRouter.use('/1/moments', momentsRouter);

module.exports = apiRouter;

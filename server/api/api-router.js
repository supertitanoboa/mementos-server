var express = require('express');
var mementosRouter = require('../mementos/mementos-router.js');
var momentsRouter = require('../moments/moments-router.js');
var apiRouter = express.Router();

// router for handling all requests to the /mementos endpoint
apiRouter.use('/1/mementos', mementosRouter);

// router for handling all requests to the /moments endpoint
apiRouter.use('/1/moments', momentsRouter);

module.exports = apiRouter;

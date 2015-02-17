var express = require('express');
var mementosRouter = express.Router();

// call to retrieve a memento
mementosRouter.get('/', function(req, res) {
  'use strict';
  res.status(200).send('this is the endpoint to which we will be retrieving mementos');
});

// save a memento 
mementosRouter.put('/', function(req, res) {
  'use strict';
  res.send('this is the endpoint to which we will be saving mementos');
});

module.exports = mementosRouter;

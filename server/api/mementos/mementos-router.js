var express = require('express');
var mementosRouter = express.Router();


// retrieve all memento metadata associated with a specific user
mementosRouter.get('/', function(req, res) {
  'use strict';
  res.status(200).send('this is the endpoint to which we will be retrieving all mementos');
});

// save a memento 
mementosRouter.post('/', function(req, res) {
  'use strict';
  res.status(201).send('this is the endpoint to which we will be saving mementos');
});

// retrieve all of the data for a specific memento
mementosRouter.get('/:id', function(req, res) {
  'use strict';
  var id = req.params.id;
  res.status(200).send('this is the endpoint to which we will retrieve all data for a specific memento');
});


// update a memento with a moment
mementosRouter.put('/:id', function(req, res) {
  'use strict';
  var id = req.params.id;
  res.status(201).send('this is the endpoint to which we will be adding moments to mementos');
});


module.exports = mementosRouter;

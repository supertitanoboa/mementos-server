var express = require('express');
var mementosRouter = express.Router();

// retrieve all memento metadata associated with a specific user
mementosRouter.get('/', function(req, res) {
  'use strict';
  res.status(200).send({created: [{title: 'Dad and Me', ID: 2}, {title: 'MAN TRIP', ID: 88}, {title: 'Daria goes to training camp in Vietnam', ID: 4389}], received: [{title: 'Kiran goes to the doctor', ID: 543}, {title: 'All the things from your childhood', ID: 8}, {title: 'Alan get\'s his hair did', ID: 750473025432}]});
});

// save a memento 
mementosRouter.post('/', function(req, res) {
  'use strict';
  // console.log('req: ', req);
  // console.log('req.body', req.body);

  res.status(201).send('this is the endpoint to which we will be saving mementos');
});

// retrieve all of the data for a specific memento
mementosRouter.get('/:id', function(req, res) {
  'use strict';
  var id = req.params.id;
  res.status(200).send({title: 'I love bioflavinoids (memento title)', moments: [{title: 'moment title :)', content: [{url: 'https://s3-us-west-1.amazonaws.com/mmntsio/CT1f7cKt-AvbldJJ8.jpeg', type: 'image/jpeg'}, {url: 'https://s3-us-west-1.amazonaws.com/mmntsio/2738e6d9-64a8-4d4a-a116-6be7a6843b8f', type: 'text/plain'}]}, {title: 'second moment', content: [{url: 'https://s3-us-west-1.amazonaws.com/mmntsio/P82diIpY-green-x-hi.png', type: 'image/png'}, {url: 'https://s3-us-west-1.amazonaws.com/mmntsio/7e24b4c0-0066-4a31-85ed-00b6ae5af972', type: 'text/plain'}]}]});
});


// update a memento with a moment
mementosRouter.put('/:id', function(req, res) {
  'use strict';
  var id = req.params.id;
  res.status(201).send({title: 'I love bioflavinoids (memento title)', moments: [{title: 'moment title :)', content: [{url: 'https://s3-us-west-1.amazonaws.com/mmntsio/CT1f7cKt-AvbldJJ8.jpeg', type: 'image/jpeg'}, {url: 'https://s3-us-west-1.amazonaws.com/mmntsio/2738e6d9-64a8-4d4a-a116-6be7a6843b8f', type: 'text/plain'}]}, {title: 'second moment', content: [{url: 'https://s3-us-west-1.amazonaws.com/mmntsio/P82diIpY-green-x-hi.png', type: 'image/png'}, {url: 'https://s3-us-west-1.amazonaws.com/mmntsio/7e24b4c0-0066-4a31-85ed-00b6ae5af972', type: 'text/plain'}]}, {title: 'third moment (just added)', content: [{url: 'https://s3-us-west-1.amazonaws.com/mmntsio/2738e6d9-64a8-4d4a-a116-6be7a6843b8f', type: 'text/plain'}, {url: 'https://s3-us-west-1.amazonaws.com/mmntsio/ee197605-8b11-4e5c-8260-f5165b1c9acb', type: 'text/plain'}]}]});
});


module.exports = mementosRouter;

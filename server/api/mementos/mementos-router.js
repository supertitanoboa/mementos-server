var express = require('express');
var async = require('async');
var mementosRouter = express.Router();
var db;

mementosRouter.use(function (req, res, next) {
  'use strict';
  db = req.db;
  next();
});

// retrieve all memento metadata associated with a specific user
mementosRouter.get('/', function(req, res) {
  'use strict';
  var authored = [];
  var received = [];
  var mementos = {
    created : authored,
    received : received
  };

  var checkReceivedMementos = function checkReceivedMementos (memento, done) {
    memento.fetch({withRelated: ['moments']})
    .then(function checkMoments(memento2) {
      var moments = memento2.related('moments');
      var added = false;

      if(moments) {
        moments.forEach(function compareMomentReleaseDate(moment) {
          if(!added && moment.get('release_date').valueOf() <= Date.now().valueOf()) {
            received.push(memento.formatJSON());
            added = true;
          }
        });
      }

      done();
    });
  };

  db.Users.where({id : req.userID})
  .fetch({withRelated : ['mementosAuthored', 'mementosReceived']})
  .then(function (user) {
    async.each(user.related('mementosReceived'), checkReceivedMementos, function sendResponse() {
      user.related('mementosAuthored').forEach(function (memento) {
        authored.push(memento.formatJSON());
      });

      res.status(200).send(mementos);
    });
  })
  .catch(function (err) {
    console.log('GET /api/1/mementos ERROR:', err);
    res.status(500).send('Error retrieving user mementos.');
  });
});

// save a memento
mementosRouter.post('/', function(req, res) {
  'use strict';

  var memento = req.body;
  var momentID = memento.moments[0];
  var user;
  var recipients;
  var counter;

  var makeQuery = function makeQuery (q) {
    for (counter = 0; counter < memento.recipients.length; counter++) {
      q = q.orWhere('email', '=', memento.recipients[counter]);
    }
  };

  //fetch the current user
  db.Users.query(makeQuery)
  .fetch().then(function (r) {
    recipients = r;
    return db.Users.where({id : req.userID}).fetch();
  })

  //add the memento to the user
  .then(function (u) {
    user = u;

    return user.addNewMemento({
      title : memento.title,
      owner_id : req.userID,
      public: memento.options.public,
      release_type : 'default'
    }, recipients);
  })

  //add a moment, if any
  .then(function (mementoID) {
    db.Moments.where({id : momentID}).fetch().then(function (moment) {
      if(moment) {
        moment.set('memento_id', mementoID).save();
      }
      res.status(201).send(mementoID);
    });
  })

  //catch all errors
  .catch(function (err) {
    console.log('POST /api/1/mementos ERROR:', err);
    res.status(500).send('error saving memento');
  });
});

// retrieve all of the data for a specific memento
mementosRouter.get('/:id/:userType', function(req, res) {
  'use strict';

  var userID = req.userID;
  var userType = req.params.userType;
  var mementoID = req.params.id;
  var memento;
  var response;

  var checkAuthorization = function checkAuthorization (cb, err) {
    if(userType === 'author') {
      memento.hasAuthor(userID)
      .then(function (isAuthor) {
        if(isAuthor) {
          cb();
        } else {
          err();
        }
      });
    }

    if(userType === 'recipient') {
      memento.hasRecipient(userID)
      .then(function (isRecipient) {
        if(isRecipient) {
          cb();
        } else {
          err();
        }
      });
    }
  };

  var attachMoment = function attachMoment (moment, done) {
    var formattedMoment = moment.formatJSON();
    formattedMoment.content = [];
    var releaseDateValue = new Date(formattedMoment.releaseDate).valueOf();

    if(userType === 'recipient' && releaseDateValue > Date.now().valueOf()) {
      done(null, undefined);
    } else {
      moment.related('pebbles').fetch()
      .then(function (pebbles) {
        async.each(pebbles, function attachPebble (pebble, done) {
          formattedMoment.content.push({
            type : pebble.get('type'),
            url : pebble.get('url'),
            order : pebble.get('order')
          });
          done();
        }, function resolveMoment () {
          done(null, formattedMoment);
        });
      });
    }
  };

  db.Mementos.where({id : mementoID}).fetch({withRelated : ['moments']})

  .then(function (fetchedMemento) {
    memento = fetchedMemento;
    response = memento.formatJSON();
    response.moments = [];

    checkAuthorization(

      function isAuthorized() {

        if(memento.related('moments').length !== 0) {
          async.map(memento.related('moments'), attachMoment, function (err, moments) {
            var index;
            for(index = 0; index < moments.length; index++) {
              if(moments[index]) {
                response.moments.push(moments[index]);
              }
            }

            console.log('GET /api/1/mementos/:id/:userType RESPONSE');
            console.log('memento_response', response);
            res.status(200).send(response);
          });
        } else {
          console.log('GET /api/1/mementos/:id/:userType RESPONSE');
          console.log('memento_response', response);
          res.status(200).send(response);
        }
      },

      function notAuthorized () {
        res.status(403).send('Unauthorized access of Memento');
      }
    );

  })

  .catch(function (err) {
    console.log('GET /api/1/mementos/:id/:userType', err);
    res.status(500).send('Failed to access Memento');
  });

});

// update a memento with a moment
mementosRouter.put('/:id', function(req, res) {
  'use strict';

  var mementoID = req.params.id;
  var momentID = req.body.momentID;

  db.Mementos.where({id : mementoID}).fetch()

  .then(function (memento) {
    return memento.hasAuthor(req.userID);
  })

  .then(function (isAuthor){
    if(isAuthor) {
      db.Moments.where({id: momentID})
      .fetch().then(function (moment) {
        // moment not found with the momentID
        if (moment === null) {
          res.status(400).send('No moment found with that moment ID');
        } else {
          moment.set('memento_id', mementoID);
          moment.save()
          .then(function () {
            res.status(201).send('save successful');
          });
        }
      })
      .catch(function (err) {
        console.log('PUT /api/1/mementos/:id ERROR1:', err);
        res.status(500).send('error adding moment to memento.');
      });
    } else {
      res.status(403).send('Unauthorized request');
    }
  })

  .catch(function (err) {
    console.log('PUT /api/1/mementos/:id ERROR2:', err);
    res.status(500).send('error adding moment to memento.');
  });
});

module.exports = mementosRouter;

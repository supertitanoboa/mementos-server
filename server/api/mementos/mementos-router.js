var express = require('express');
var mementosRouter = express.Router();
var bPromise = require('bluebird');
var db;

mementosRouter.use(function (req, res, next) {
  'use strict';
  db = req.db;
  next();
});

// retrieve all memento metadata associated with a specific user
mementosRouter.get('/', function(req, res) {
  'use strict';
  db.Users.where({id : req.userID})
  .fetch({withRelated : ['mementosAuthored', 'mementosReceived']})
  .then(function (user) {
    var authored = [];
    var received = [];

    user.related('mementosAuthored').forEach(function (memento) {
      authored.push(memento.formatJSON());
    });

    user.related('mementosReceived').forEach(function (memento) {
      received.push(memento.formatJSON());
    });

    var mementos = {
      created : authored,
      received : received
    };

    res.status(200).send(mementos);
  });
});

// save a memento
mementosRouter.post('/', function(req, res) {
  'use strict';

  var memento = req.body;
  var momentID = memento.moments[0];
  var counter;

  var makeQuery = function makeQuery (q) {
    for (counter = 0; counter < memento.recipients.length; counter++) {
      q = q.orWhere('email', '=', memento.recipients[counter]);
    }
  };

  db.Users.query(makeQuery)
  .fetch().then(function (recipients) {
    db.Users.where({id : req.userID}).fetch().then(function (user) {
      user.addNewMemento({
        title : memento.title,
        owner_id : req.userID,
        public: memento.options.public,
        release_type : 'default'
      },recipients)
      .then(function (mementoID) {
        db.Moments.where({id : momentID}).fetch().then(function (moment) {
          moment.set('memento_id', mementoID).save().then(function () {
            res.status(201).send(mementoID);
          });
        });
      })
      .catch(function (err) {
        console.log('POST /api/1/mementos ERROR:', err);
        res.status(500).send('error saving memento');
      });
    });
  });
});

// retrieve all of the data for a specific memento
mementosRouter.get('/:id', function(req, res) {
  'use strict';

  var mementoID = req.params.id;
  var memento;

  db.Mementos.where({id : mementoID})
  .fetch({withRelated : ['moments']}).then(function (fetchedMemento) {
    memento = fetchedMemento;
    return new bPromise(function (resolve) {
      var response = memento.formatJSON();
      var unfinishedMoments = memento.related('moments').length;
      response.moments = [];

      memento.related('moments').forEach(function (moment) {
        var formattedMoment = moment.formatJSON();
        formattedMoment.content = [];
        moment.related('pebbles').fetch()
        .then(function (pebbles) {
          pebbles.forEach(function (pebble) {
            formattedMoment.content.push({
              type : pebble.get('type'),
              url : pebble.get('url'),
              order : pebble.get('order')
            });
          });

          response.moments.push(formattedMoment);
          unfinishedMoments--;
          if(unfinishedMoments === 0) {
            resolve(response);
          }
        });
      });

    });
  })

  .then(function (response) {
    memento.hasAuthor(req.userID)
    .then(function (isAuthor) {
      if(isAuthor) {
        res.status(200).send(response);
      } else {
        memento.hasRecipient(req.userID)
        .then(function (isRecipient) {
          if(isRecipient) {
            res.status(200).send(response);
          }else {
            res.status(403).send('Unauthorized access of Memento');
          }
        });
      }
    });
  });
});


// update a memento with a moment
mementosRouter.put('/:id', function(req, res) {
  'use strict';

  var mementoID = req.params.id;
  var momentID = req.body.momentID;

  db.Mementos.where({id : mementoID})
  .fetch().then(function (memento) {
    memento.hasAuthor(req.userID).then(function (isAuthor){
      if(isAuthor) {
        db.Moments.where({id: momentID})
        .fetch().then(function (moment) {
          moment.set('memento_id', mementoID);
          moment.save()
          .then(function () {
            res.status(201).send('save successful');
          })
          .catch(function (err) {
            console.log('PUT /api/1/mementos/:id ERROR1:', err);
            res.status(500).send('error adding moment to memento.');
          });
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
});


module.exports = mementosRouter;

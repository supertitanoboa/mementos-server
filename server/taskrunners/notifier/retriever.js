var bPromise = require('bluebird');
var moment = require('moment');

var retrieverConstructor = function (db) {
  'use strict';

  return function retriever (notifyQueue, runningFlag, thisMinute) {
    var momentsToBeReleased = [];

    console.log('running retriever');

    new bPromise(function (resolve) {
      var running = 0;


      db.Moments.collection().query(function(q) {
        q.where('release_date', '>=', thisMinute.format())
         .where('release_date', '<',  moment(thisMinute).add(1, 'minute').format());
      }).fetch({withRelated : ['memento']})
      .then(function (moments) {
        running = moments.length;

        if(moments.length) {
          moments.forEach(function (moment) {
            var mementoID = moment.related('memento').get('id');
            moment.related('memento').getRecipients()
            .then(function (recipients) {

              recipients.forEach(function(recipient) {
                momentsToBeReleased.push({
                  userID : recipient.get('id'),
                  mementoID : mementoID
                });
              });

              running--;
              if(running === 0) {
                resolve(momentsToBeReleased);
              }
            });
          });
        } else {
          resolve(momentsToBeReleased);
        }
      });
    })

    .then(function () {
      notifyQueue.push(momentsToBeReleased);

      if(moment().utc().startOf('minute').valueOf() > thisMinute.valueOf()) {
        retriever(notifyQueue, runningFlag, moment(thisMinute).add(1, 'minute'));
      } else {
        runningFlag.retriever = false;
      }
    });
  };
};

module.exports = retrieverConstructor;

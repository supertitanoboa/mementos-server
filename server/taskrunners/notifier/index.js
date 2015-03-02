var schedule = require('node-schedule');
var moment = require('moment');

var notifierTaskRunner = function notifierTaskRunner (db, redis, io) {
  'use strict';

  var retriever = require('./retriever.js')(db);
  var notifier = require('./notifier.js')(redis, io);

  var releasedMoments = [[]];

  var runningTasks = {
    retriever : false,
    notifier : false
  };

  var rule = new schedule.RecurrenceRule();

  schedule.scheduleJob(rule, function(){
    var thisMinute = moment().startOf('minute').utc();

    console.log('scheduler running at ', thisMinute.toDate());

    if(!runningTasks.notifier) {
      runningTasks.notifier = true;
      notifier(releasedMoments, runningTasks, thisMinute.valueOf());
    }

    if(!runningTasks.retriever) {
      runningTasks.retriever = true;
      retriever(releasedMoments, runningTasks, thisMinute);
    }
  });
};

module.exports = notifierTaskRunner;

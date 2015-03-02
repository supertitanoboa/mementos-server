var moment = require('moment');

var notifierConstructor = function (redis, io) {

  return function notifier (notifyQueue, runningFlag, thisMinute) {
    var moments = notifyQueue.shift();

    console.log('running notifier');

    if(moments) {
      for (var i = 0; i < moments.length; i++) {
        (function (moment) {
          var mementoID = moment.mementoID;
          var userID = moment.userID;

          redis.redisOptions.client.get(userID, function (err, socketID) {
            if (err) {
              console.log('error retrieving userID from redis: ', err);
            } else {
              // send the memento id of the moment to the client
              io.to(socketID).emit('releaseMoment', {'mementoID': mementoID});
            }
          });
        })(moments[i]);
      }
    }
    
    if(moment().utc().startOf('minute').valueOf() > thisMinute.valueOf()) {
      notifier(notifyQueue, runningFlag, moment(thisMinute).add(1, 'minute'));
    } else {
      runningFlag.notifier = false;
    }
  }

};

module.exports = notifierConstructor;

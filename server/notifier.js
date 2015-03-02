var notifierConstructor = function (redis, io) {
  
  return function notifier (notifyQueue, toggleFlagObject) {
    var moments = notifyQueue.shift();

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

    //turn off notifier flag
    toggleFlagObject.notifier = false;
  }

};

module.exports = notifierConstructor;

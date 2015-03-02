var app = require('./app-config.js');
var server = app.listen(app.get('port'));
var io = require('socket.io')(server);
var db = app.get('db');
var redis = app.get('redis');

console.log('server is listening on port : ', app.get('port'));

io.on('connection', function (socket) {
  var socketID = socket.id;

  console.log('socket ' + socketID + ' has connected');

  socket.on('sendUser', function (data) {
    redis.redisOptions.client.set(data.userID, socketID);
    redis.redisOptions.client.set(socketID, data.userID);
  });

  socket.on('disconnect', function () {
    console.log('user with the socket: ' + socketID + ' has disconnected');
    // remove the socket id and the user id from redis
    redis.redisOptions.client.get(socketID, function (err, reply) {
      redis.redisOptions.client.get(reply, function (err, response) {
        // deleting both socket id and user id's for the user's socket connection
        redis.redisOptions.client.del(socketID);
        redis.redisOptions.client.del(reply);
      });
    });
  });
});

var notifier = require('./taskrunners/notifier')(db, redis, io);

module.exports = server;

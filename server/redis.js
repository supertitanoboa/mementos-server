var redis = require('redis');
var url = require('url');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var redisCloud = {};
var redisURL;

redisCloud.session = session;
redisCloud.RedisStore = RedisStore;
redisCloud.redisOptions = {};

// autheticate redisCloud client
if (process.env.REDISCLOUD_URL){
  // if heroku environment, use heroku process.env variables
  redisURL = url.parse(process.env.REDISCLOUD_URL);
  redisCloud.redisOptions.client = redis.createClient(redisURL.port, redisURL.hostname, {no_ready_check: true});
  redisCloud.redisOptions.client.auth(redisURL.auth.split(':')[1]);
} else {
  // local environment
  redisCloud.redisOptions.client = redis.createClient();
}

// testing redisCloud Client
redisCloud.redisOptions.client.set('string key', 'string val', redis.print);
redisCloud.redisOptions.client.get('string key', function(err, replies) {
  'use strict';
  console.log('response from string key: ', replies);
});

redisCloud.redisOptions.client.hset('hash key', 'hashtest 1', 'some value', redis.print);
redisCloud.redisOptions.client.hset(['hash key', 'hashtest 2', 'some other value'], redis.print);
redisCloud.redisOptions.client.hkeys('hash key', function (err, replies) {
  'use strict';
  console.log(replies.length + ' replies:');
  replies.forEach(function (reply, i) {
      console.log('    ' + i + ': ' + reply);
  });
});

module.exports = redisCloud;

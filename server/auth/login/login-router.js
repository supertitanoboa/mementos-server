var express = require('express');
var loginRouter = express.Router();

loginRouter.get('/', function(req, res) {
  'use strict';
  res.status(200).send('you are now on the login page');
});

// FIXME: needs proper response after successful authentication
loginRouter.post('/', 
  // TODO: Session handling
  function(req, res) {
    'use strict';
    var user     = new req.db.Users({ email: req.body.email });
    var password = req.body.password;
    user.fetch()
    .then(function(dbUser) {
      if (dbUser) {
        if (dbUser.validatePass(password)) {
          // set sessionID and user id in redis cache
          req.redis.redisOptions.client.set(req.sessionID, dbUser.get('id'));
          res.status(201).send({sessionID: req.sessionID, userID: dbUser.get('id')});
        } else {
          res.status(400).send('Invalid username or password');
        }
      } else {
        res.status(404).send('User not found');
      }
    });
  });

module.exports = loginRouter;

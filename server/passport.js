var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

// user id is serialized to the session
passport.serializeUser(function(user, done) {
  'use strict';
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  'use strict';
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

/** FIXME: local strategy for authenticating users, need to add in 
 *  the proper ORM calls to the db here for authentication
 */
passport.use(new LocalStrategy(
  function localCallback(username, password, done) {
    'use strict';
    User.findOne({
      username: username 
    }, function queryCallback(err, user) {
      if (err) { 
        return done(err); 
      }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

module.exports = passport;

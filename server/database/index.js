var db = require('./dbConfig');
var bookshelf = db.bookshelf;

var models = {
  Users : 'users.js',
  // UserProfiles : 'userprofiles.js',
  // Mementos : 'mementos.js',
  // Moments : 'moments.js'
};


var attacherMaker = function attacherMaker (key) {
  'use strict';
  return function modelAttacher (model) {
    db[key] = model;
  };
};

for(var key in models) {
  if(models.hasOwnProperty(key)) {
    require('./schema/' + models[key])(bookshelf)
    .then(attacherMaker(key));
  }
}

module.exports = db;

var db = require('./dbConfig');
var models;
var key;

require('./schema.js')(db);

models = require('./models.js')(db);

for(key in models) {
  if(models.hasOwnProperty(key)) {
    db[key] = models[key];
  }
}

module.exports = db;

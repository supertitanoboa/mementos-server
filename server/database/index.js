var dbConfig = require('./config');

var knex = require('knex')(dbConfig);

var bookshelf = require('bookshelf')(knex);

module.exports = {
  'bookshelf': bookshelf,
  'destroy' : function() {
    'use strict';
    knex.destroy();
  }
};

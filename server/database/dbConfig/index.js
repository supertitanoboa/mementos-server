var knexConfig = require('./knexConfig');
var knex = require('knex')(knexConfig);
var bookshelf = require('bookshelf')(knex);

module.exports = {
  'bookshelf': bookshelf,
  'knex': knex,
  'destroy': function(cb) {
    'use strict';
    return knex.destroy();
  }
};

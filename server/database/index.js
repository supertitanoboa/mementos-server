var dbConfig = require('./config');

var knex = require('knex')(dbConfig);

var bookshelf = require('bookshelf')(knex);

module.exports = bookshelf;

var bPromise = require('bluebird');

var momentsMaker = function momentsMaker (db) {
  'use strict';

  var bookshelf = db.bookshelf;
  var knex = bookshelf.knex;
  var Users = db.Users;
  var Mementos = db.Mementos;

  var config = {
    tableName : 'moments'
  };

  //mementos schema
  return knex.schema.hasTable(config.tableName).then(function hasUsersTable(exists) {
    if (!exists) {
      return knex.schema.createTable(config.tableName, function createModelTable(table) {
        table.bigIncrements('id').primary();
        table.string('title', 254).notNullable();
        table.bigInteger('author_id').unsigned().notNullable().references('id').inTable('users');
        table.bigInteger('memento_id').unsigned().notNullable().references('id').inTable('mementos');
        table.integer('ordering').notNullable();
        table.float('longitude').nullable();
        table.float('latitude').nullable();
        table.string('location', 254).nullable();
        table.dateTime('release_date').notNullable();
        table.timestamps();
      });
    }
  })

  // pebbles table
  .then(function mementosAuthorsSchema() {
    return knex.schema.hasTable('pebbles')
    .then(function hasRelationTable(exists) {
      if (!exists) {
        return knex.schema.createTable('pebbles', function createRelationTable(table) {
          table.bigIncrements('id').primary();
          table.bigInteger('memento_id').unsigned().references('id').inTable('mementos').index();
          table.enu('type', ['audio', 'video', 'image', 'text']).notNullable();
          table.string('url', 300).notNullable().unique();
          table.integer('ordering').notNullable();
        });
      }
    });
  })

  .then(function createModel() {
    var Pebbles = bookshelf.Model.extend({
      tableName : 'pebbles'
    });

    return new bPromise(function (resolve) {
      var Moments = bookshelf.Model.extend({

        tableName : config.tableName,

        author : function author () {
          return this.belongsTo(Users, 'author_id');
        },

        pebbles : function pebbles () {
          return this.hasMany(Pebbles, 'moment_id');
        },

        addPebble : function addPebble(type, url, ordering) {
          var addedPebble = new Pebbles({
            memento_id : this.id,
            type : type,
            url : url,
            ordering : ordering
          });

          return addedPebble.save();
        },

        removePebble : function removePebble(ordering) {
          Pebbles.where({ordering : ordering}).fetch().then(function (pebble) {
            pebble.destroy();
          });
        },

        memento : function memento () {
          return this.belongsTo(Mementos, 'memento_id');
        }
      });

      resolve(Moments);
    });
  });

};

module.exports = momentsMaker;

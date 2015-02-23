var bPromise = require('bluebird');

var mementosMaker = function mementosMaker (db) {
  'use strict';

  var bookshelf = db.bookshelf;
  var knex = bookshelf.knex;
  var Users = db.Users;

  var config = {
    tableName : 'mementos'
  };

  //mementos schema
  return knex.schema.hasTable(config.tableName).then(function hasUsersTable(exists) {
    if (!exists) {
      return knex.schema.createTable(config.tableName, function createModelTable(table) {
        table.bigIncrements('id').primary();
        table.string('title', 254).notNullable();
        table.bigInteger('owner_id').unsigned().notNullable().references('id').inTable('users');
        table.boolean('public').defaultTo(false);
        table.string('releaseType', 100).defaultTo('default');
      });
    }
  })

  // mementos_authors relational table
  .then(function mementosAuthorsSchema() {
    return knex.schema.hasTable(config.tableName.concat('_authors'))
    .then(function hasRelationTable(exists) {
      if (!exists) {
        return knex.schema.createTable(config.tableName.concat('_authors'), function createRelationTable(table) {
          table.bigInteger('memento_id').unsigned().references('id').inTable('mementos').index();
          table.bigInteger('author_id').unsigned().references('id').inTable('users').index();
        });
      }
    });
  })

  //mementos_recipients relational table
  .then(function mementosRecipientsSchema() {
    return knex.schema.hasTable(config.tableName.concat('_recipients'))
    .then(function hasRelationTable(exists) {
      if (!exists) {
        return knex.schema.createTable(config.tableName.concat('_recipients'), function createRelationTable(table) {
          table.bigInteger('memento_id').unsigned().references('id').inTable('mementos').index();
          table.bigInteger('recipient_id').unsigned().references('id').inTable('users').index();
        });
      }
    });
  })

  .then(function createModel() {
    return new bPromise(function(resolve) {
      var Mementos = bookshelf.Model.extend({

        tableName : config.tableName,

        owner : function owner () {
          return this.belongsTo(Users, 'owner_id');
        },

        changeOwner : function changeOwner (owner) {
          this.set('owner_id', owner.get('id'));
        },

        authors : function authors () {
          return this.belongsToMany(Users, 'mementos_authors', 'memento_id', 'author_id');
        },

        getAuthors : function getAuthors () {
          return this.authors().query({where : {'memento_id' : this.id}}).fetch();
        },

        addAuthors : function addAuthor (user) {
          return this.authors().attach(user);
        },

        removeAuthors : function removeAuthor (user) {
          return this.authors().detach(user);
        },

        recipients : function recipients () {
          return this.belongsToMany(Users, 'mementos_recipients', 'memento_id', 'recipient_id');
        },

        getRecipients : function getRecipients () {
          return this.recipients().query({where : {'memento_id' : this.id}}).fetch();
        },

        addRecipients : function addRecipients (user) {
          return this.recipients().attach(user);
        },

        removeRecipients : function removeRecipients (user) {
          return this.recipients().detach(user);
        },


        //reorder
        reorder : function reorder() {

        }

      });

      resolve(Mementos);
    });
  });

};

module.exports = mementosMaker;

var schemaBuilder = function schemaBuilder (db) {
  'use strict';
  var knex = db.bookshelf.knex;

  //users table
  return knex.schema.hasTable('users').then(function hasUsersTable(exists) {
    if (!exists) {
      return knex.schema.createTable('users', function createUsersTable(table) {
        table.bigIncrements('id').primary();
        table.string('password', 254).notNullable();
        table.string('email', 150).unique().notNullable().index();
        table.timestamps();
      });
    }
  })

  //mementos table
  .then(function mementosSchema (){
    return knex.schema.hasTable('mementos').then(function hasMementosTable(exists) {
      if (!exists) {
        return knex.schema.createTable('mementos', function createMementosTable(table) {
          table.bigIncrements('id').primary();
          table.string('title', 254).notNullable();
          table.bigInteger('owner_id').unsigned().notNullable().references('id').inTable('users');
          table.boolean('public').defaultTo(false);
          table.string('release_type').defaultTo('default');
          table.timestamps();
        });
      }
    });
  })

  // mementos_authors relation table
  .then(function mementosAuthorsSchema() {
    return knex.schema.hasTable('mementos_authors')
    .then(function hasMementosAuthorsSchema(exists) {
      if (!exists) {
        return knex.schema.createTable('mementos_authors', function createMementoAuthorsTable(table) {
          table.bigInteger('memento_id').unsigned().references('id').inTable('mementos').index();
          table.bigInteger('author_id').unsigned().references('id').inTable('users').index();
        });
      }
    });
  })

  //mementos_recipients relation table
  .then(function mementosRecipientsSchema() {
    return knex.schema.hasTable('mementos_recipients')
    .then(function hasMementosRecipientsTable(exists) {
      if (!exists) {
        return knex.schema.createTable('mementos_recipients', function createMementosRecipientsTable(table) {
          table.bigInteger('memento_id').unsigned().references('id').inTable('mementos').index();
          table.bigInteger('recipient_id').unsigned().references('id').inTable('users').index();
        });
      }
    });
  })

  //moments table
  .then(function momentsSchema() {
    return knex.schema.hasTable('moments').then(function hasMomentsTable(exists) {
      if (!exists) {
        return knex.schema.createTable('moments', function createMomentsTable(table) {
          table.bigIncrements('id').primary();
          table.string('title', 254).notNullable();
          table.bigInteger('author_id').unsigned().notNullable().references('id').inTable('users');
          table.bigInteger('memento_id').unsigned().references('id').inTable('mementos');
          table.integer('ordering');
          table.float('longitude').nullable();
          table.float('latitude').nullable();
          table.string('location', 254).nullable();
          table.dateTime('release_date').notNullable();
          table.timestamps();
        });
      }
    });
  })

  // pebbles table
  .then(function pebblesSchema() {
    return knex.schema.hasTable('pebbles')
    .then(function hasPebblesTable(exists) {
      if (!exists) {
        return knex.schema.createTable('pebbles', function createPebblesTable(table) {
          table.bigIncrements('id').primary();
          table.bigInteger('moment_id').unsigned().references('id').inTable('moments').index();
          table.string('type').notNullable();
          table.string('url', 300).notNullable().unique();
          table.integer('ordering').notNullable();
          table.timestamps();
        });
      }
    });
  });
};

module.exports = schemaBuilder;

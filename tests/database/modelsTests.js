var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var async = require('async');
var sinon = require('sinon');

var dbPath = '../../server/database';
var db = require(dbPath);
var bookshelf = db.bookshelf;
var knex = bookshelf.knex;

describe('Models Tests', function () {
  'use strict';

  describe('Schema', function () {

    describe('"users" Schema', function () {
      var tableName = 'users';

      it('should have a table named "users"', function (done) {
        knex.schema.hasTable(tableName).then(function(exists) {
          expect(exists).to.equal(true);
          done();
        });
      });

      it('should have a column named "id"', function (done) {
        knex.schema.hasColumn(tableName, 'id').then(function(exists) {
          expect(exists).to.equal(true);
          done();
        });
      });

      it('should have a column named "email"', function (done) {
        knex.schema.hasColumn(tableName, 'email').then(function(exists) {
          expect(exists).to.equal(true);
          done();
        });
      });

      it('should have a column named "password"', function (done) {
        knex.schema.hasColumn(tableName, 'password').then(function(exists) {
          expect(exists).to.equal(true);
          done();
        });
      });

      it('should have a column named "created_at"', function (done) {
        knex.schema.hasColumn(tableName, 'created_at').then(function(exists) {
          expect(exists).to.equal(true);
          done();
        });
      });

      it('should have a column named "updated_at"', function (done) {
        knex.schema.hasColumn(tableName, 'updated_at').then(function(exists) {
          expect(exists).to.equal(true);
          done();
        });
      });
    });

    describe('"mementos" Schema', function () {
      var tableName = 'mementos';

      it('should have a table named "mementos"', function (done) {
        knex.schema.hasTable(tableName).then(function(exists) {
          expect(exists).to.equal(true);
          done();
        });
      });

      it('should have a column named "id"', function (done) {
        knex.schema.hasColumn(tableName, 'id').then(function(exists) {
          expect(exists).to.equal(true);
          done();
        });
      });

      it('should have a column named "title"', function (done) {
        knex.schema.hasColumn(tableName, 'title').then(function(exists) {
          expect(exists).to.equal(true);
          done();
        });
      });

      it('should have a column named "owner_id"', function (done) {
        knex.schema.hasColumn(tableName, 'owner_id').then(function(exists) {
          expect(exists).to.equal(true);
          done();
        });
      });

      it('should have a column named "public"', function (done) {
        knex.schema.hasColumn(tableName, 'public').then(function(exists) {
          expect(exists).to.equal(true);
          done();
        });
      });

      it('should have a column named "release_type"', function (done) {
        knex.schema.hasColumn(tableName, 'release_type').then(function(exists) {
          expect(exists).to.equal(true);
          done();
        });
      });

      it('should have a column named "created_at"', function (done) {
        knex.schema.hasColumn(tableName, 'created_at').then(function(exists) {
          expect(exists).to.equal(true);
          done();
        });
      });

      it('should have a column named "updated_at"', function (done) {
        knex.schema.hasColumn(tableName, 'updated_at').then(function(exists) {
          expect(exists).to.equal(true);
          done();
        });
      });
    });

    describe('"mementos_authors" Schema', function () {
      var tableName = 'mementos_authors';

      it('should have a table named "mementos_authors"', function (done) {
        knex.schema.hasTable(tableName).then(function(exists) {
          expect(exists).to.equal(true);
          done();
        });
      });

      it('should have a column named "memento_id"', function (done) {
        knex.schema.hasColumn(tableName, 'memento_id').then(function(exists) {
          expect(exists).to.equal(true);
          done();
        });
      });

      it('should have a column named "author_id"', function (done) {
        knex.schema.hasColumn(tableName, 'author_id').then(function(exists) {
          expect(exists).to.equal(true);
          done();
        });
      });
    });

    describe('"mementos_recipients" Schema', function () {
      var tableName = 'mementos_recipients';

      it('should have a table named "mementos_recipients"', function (done) {
        knex.schema.hasTable(tableName).then(function(exists) {
          expect(exists).to.equal(true);
          done();
        });
      });

      it('should have a column named "memento_id"', function (done) {
        knex.schema.hasColumn(tableName, 'memento_id').then(function(exists) {
          expect(exists).to.equal(true);
          done();
        });
      });

      it('should have a column named "recipient_id"', function (done) {
        knex.schema.hasColumn(tableName, 'recipient_id').then(function(exists) {
          expect(exists).to.equal(true);
          done();
        });
      });
    });

    describe('"moments" Schema', function () {
      var tableName = 'moments';

      it('should have a table named "moments"', function (done) {
        knex.schema.hasTable(tableName).then(function(exists) {
          expect(exists).to.equal(true);
          done();
        });
      });

      it('should have a column named "id"', function (done) {
        knex.schema.hasColumn(tableName, 'id').then(function(exists) {
          expect(exists).to.equal(true);
          done();
        });
      });

      it('should have a column named "title"', function (done) {
        knex.schema.hasColumn(tableName, 'title').then(function(exists) {
          expect(exists).to.equal(true);
          done();
        });
      });

      it('should have a column named "author_id"', function (done) {
        knex.schema.hasColumn(tableName, 'author_id').then(function(exists) {
          expect(exists).to.equal(true);
          done();
        });
      });

      it('should have a column named "memento_id"', function (done) {
        knex.schema.hasColumn(tableName, 'memento_id').then(function(exists) {
          expect(exists).to.equal(true);
          done();
        });
      });

      it('should have a column named "ordering"', function (done) {
        knex.schema.hasColumn(tableName, 'ordering').then(function(exists) {
          expect(exists).to.equal(true);
          done();
        });
      });

      it('should have a column named "longitude"', function (done) {
        knex.schema.hasColumn(tableName, 'longitude').then(function(exists) {
          expect(exists).to.equal(true);
          done();
        });
      });

      it('should have a column named "latitude"', function (done) {
        knex.schema.hasColumn(tableName, 'latitude').then(function(exists) {
          expect(exists).to.equal(true);
          done();
        });
      });

      it('should have a column named "location"', function (done) {
        knex.schema.hasColumn(tableName, 'location').then(function(exists) {
          expect(exists).to.equal(true);
          done();
        });
      });

      it('should have a column named "release_date"', function (done) {
        knex.schema.hasColumn(tableName, 'release_date').then(function(exists) {
          expect(exists).to.equal(true);
          done();
        });
      });

      it('should have a column named "created_at"', function (done) {
        knex.schema.hasColumn(tableName, 'created_at').then(function(exists) {
          expect(exists).to.equal(true);
          done();
        });
      });

      it('should have a column named "updated_at"', function (done) {
        knex.schema.hasColumn(tableName, 'updated_at').then(function(exists) {
          expect(exists).to.equal(true);
          done();
        });
      });
    });

    describe('"pebbles" Schema', function () {
      var tableName = 'pebbles';

      it('should have a table named "pebbles"', function (done) {
        knex.schema.hasTable(tableName).then(function(exists) {
          expect(exists).to.equal(true);
          done();
        });
      });

      it('should have a column named "id"', function (done) {
        knex.schema.hasColumn(tableName, 'id').then(function(exists) {
          expect(exists).to.equal(true);
          done();
        });
      });

      it('should have a column named "moment_id"', function (done) {
        knex.schema.hasColumn(tableName, 'moment_id').then(function(exists) {
          expect(exists).to.equal(true);
          done();
        });
      });

      it('should have a column named "type"', function (done) {
        knex.schema.hasColumn(tableName, 'type').then(function(exists) {
          expect(exists).to.equal(true);
          done();
        });
      });

      it('should have a column named "url"', function (done) {
        knex.schema.hasColumn(tableName, 'url').then(function(exists) {
          expect(exists).to.equal(true);
          done();
        });
      });

      it('should have a column named "ordering"', function (done) {
        knex.schema.hasColumn(tableName, 'ordering').then(function(exists) {
          expect(exists).to.equal(true);
          done();
        });
      });

      it('should have a column named "created_at"', function (done) {
        knex.schema.hasColumn(tableName, 'created_at').then(function(exists) {
          expect(exists).to.equal(true);
          done();
        });
      });

      it('should have a column named "updated_at"', function (done) {
        knex.schema.hasColumn(tableName, 'updated_at').then(function(exists) {
          expect(exists).to.equal(true);
          done();
        });
      });
    });

  });

  describe('Models', function () {

    describe('"Users" Model', function () {
      it('should create a user', function () {

      });
    });
  });

});

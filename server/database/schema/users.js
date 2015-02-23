var bPromise = require('bluebird');
var bcrypt = require('bcrypt');

var usersMaker = function usersMaker (db) {
  'use strict';

  var bookshelf = db.bookshelf;
  var knex = bookshelf.knex;

  var config = {
    tableName : 'users'
  };

  //users schema
  return knex.schema.hasTable(config.tableName).then(function hasUsersTable(exists) {
    if (!exists) {
      return knex.schema.createTable(config.tableName, function createUsersTable(table) {
        table.bigIncrements('id').primary();
        table.string('password', 254).notNullable();
        table.string('email', 150).unique().notNullable().index();
      });
    }
  })

  .then(function createUsersModel() {
    return new bPromise(function(resolve) {
      var User = bookshelf.Model.extend({

        tableName : config.tableName,

        setPass : function setPass(password) {
          var _this = this;
          return new bPromise(function (resolve, reject) {
            bcrypt.hash(password, 10, function (err, hash) {
              if(err) { reject(err); } else {
                _this.set('password', hash);
                resolve(_this);
              }
            });
          });
        },

        changeEmail : function changeEmail(email) {
          if(require('valid-email')(email)) {
            this.set('email', email);
          } else {
            throw new Error('Error: Invalid Email.');
          }
        },

        validatePass : function validatePass(password) {
          if(typeof password !== 'string' || !password) {
            return false;
          }

          return bcrypt.compareSync(password, this.get('password'));
        }
      });

      resolve(User);
    });
  });
};

module.exports = usersMaker;

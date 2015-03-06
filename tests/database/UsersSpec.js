// var chai = require('chai');
// var assert = chai.assert;
// var expect = chai.expect;
// var sinon = require('sinon');
//
// var relativePath = '../../server/database';
// var usersPath = relativePath + '/schema/users.js';
// var db = require(relativePath + '/dbConfig');
// var bookshelf = db.bookshelf;
// var knex = db.knex;
//
// before(function (done) {
//   'use strict';
//   knex.schema.dropTableIfExists('users').then(function () {
//     done();
//   });
// });
//
// describe('User Tests', function() {
//   'use strict';
//   var sandbox;
//   var Users;
//
//   beforeEach(function (done) {
//     sandbox = sinon.sandbox.create();
//
//     require(usersPath)(db).then(function (model) {
//       Users = model;
//       done();
//     });
//   });
//
//   afterEach(function () {
//     sandbox.restore();
//   });
//
//   describe('Table Creation', function() {
//
//     it('should have created the Users Table', function (done) {
//       knex.schema.hasTable('users').then(function (exists) {
//         assert.isTrue(exists, 'Users Table does not exist');
//         done();
//       });
//     });
//   });
//
//   describe('Users Model', function () {
//
//     before(function (done) {
//       Users.where({'email' : 'ab@cd.com'}).destroy()
//       .then(function() {
//         done();
//       });
//     });
//
//     after(function (done) {
//       Users.where({'email' : 'ab@cd.com'}).destroy()
//       .then(function() {
//         done();
//       });
//     });
//
//     it('should add a User Object to the database', function (done) {
//
//       var account = new Users({
//         email: 'ab@cd.com'
//       });
//
//       account.setPass('12345').then(function (user) {
//         return user.save();
//       })
//       .then(function() {
//         knex.select().from('users').where({'email' : 'ab@cd.com'})
//         .then(function(row) {
//           expect(row.length).to.equal(1);
//           expect(row[0].email).to.equal('ab@cd.com');
//           done();
//         }).catch(function (err) {
//           done(err);
//         });
//       });
//     });
//
//     describe('validatePass', function () {
//
//       var account;
//
//       beforeEach(function (done) {
//         account = new Users({
//           email: 'temp@test.com'
//         });
//         account.setPass('12345').then(function () {
//           done();
//         });
//       });
//
//       it('should return false when given no password', function () {
//         assert.isFalse(account.validatePass(), 'accepting no password as valid.');
//         assert.isFalse(account.validatePass(null), 'accepting null password as valid.');
//       });
//
//       it('should return true when given an invalid password', function () {
//         assert.isFalse(account.validatePass('123456'), 'accepting invalid password as valid.');
//       });
//
//       it('should return true when given a valid password', function () {
//         assert.isTrue(account.validatePass('12345'), 'rejecting valid password as invalid.');
//       });
//
//     });
//   });
// });

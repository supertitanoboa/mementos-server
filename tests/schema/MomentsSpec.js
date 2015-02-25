// var chai = require('chai');
// var assert = chai.assert;
// var expect = chai.expect;
// var sinon = require('sinon');
//
// var relativePath = '../../server/database';
// var modelPath = relativePath + '/schema/moments.js';
// var mementosPath = relativePath + '/schema/mementos.js';
// var usersPath = relativePath + '/schema/users.js';
// var db = require(relativePath + '/dbConfig');
// var knex = db.knex;
//
// before(function (done) {
//   'use strict';
//   knex.schema.dropTableIfExists('moments')
//   .then(function() {
//     done();
//   });
// });
//
// describe('Moments Tests', function() {
//   'use strict';
//   var sandbox;
//   var Model;
//   var Mementos;
//   var Users;
//
//   beforeEach(function (done) {
//     sandbox = sinon.sandbox.create();
//     require(mementosPath)(db).then(function(MementosModel) {
//       db.Mementos = MementosModel;
//       Mementos = MementosModel;
//     })
//     .then(function () {
//       require(usersPath)(db).then(function(UsersModel) {
//         db.Users = UsersModel;
//         Users = UsersModel;
//       });
//     })
//     .then(function () {
//       require(modelPath)(db).then(function (model) {
//         Model = model;
//         done();
//       });
//     });
//   });
//
//   afterEach(function () {
//     sandbox.restore();
//   });
//
//   describe('Table Creation', function() {
//
//     it('should have created the Moments Table', function (done) {
//       knex.schema.hasTable('moments').then(function (exists) {
//         assert.isTrue(exists, 'Moments Table does not exist');
//         done();
//       });
//     });
//   });
//
//   describe('Moments Model', function () {
//     var memento;
//     var author;
//     var recipient;
//
//     before(function (done) {
//
//       author = new Users({
//           email: 'ef@gh.com'
//       });
//
//       recipient = new Users({
//           email: 'st@uv.com'
//       });
//
//       author.setPass('12345')
//       .then(function (user) {
//         return user.save();
//       })
//       .then(function () {
//         return recipient.setPass('12345')
//         .then(function (user) {
//           return user.save();
//         });
//       })
//       .then(function () {
//         memento = new Model({'owner_id' : author.id});
//
//         memento.authors().detach();
//         memento.recipients().detach();
//         memento.where({'owner_id' : author.id}).destroy();
//       })
//       .then(function() {
//         done();
//       });
//
//     });
//
//     afterEach(function (done) {
//
//         memento.authors().detach()
//         .then(function () {
//           memento.recipients().detach();
//         }).then(function () {
//           memento.where({'owner_id' : author.id}).destroy();
//         }).then(function () {
//           Users.where({'id' : author.id}).destroy();
//         }).then(function () {
//           Users.where({'id' : recipient.id}).destroy();
//         }).then(function () {
//           done();
//         });
//     });
//
//     it('should add a Memento Object to the database', function (done) {
//       memento = new Model({
//         title: 'Test Memento',
//         owner_id: author.id
//       });
//
//       memento.save()
//       .then(function() {
//         return memento2.save();
//       })
//       .then(function () {
//         return memento.addAuthors([author]);
//       })
//       .then(function () {
//         return memento.addRecipients([recipient]);
//       })
//       .then(function () {
//         return memento.getAuthors().then(function (authors) {
//           var author = authors.first();
//
//           expect(authors.length).to.equal(1);
//           expect(author.get('email')).to.equal('ef@gh.com');
//         });
//       })
//       .then(function () {
//         return memento.getRecipients().then(function (recipients) {
//           var recipient = recipients.first();
//
//           expect(recipients.length).to.equal(1);
//           expect(recipient.get('email')).to.equal('st@uv.com');
//         });
//       })
//       .then(function () {
//         return memento2.getAuthors().then(function (authors) {
//           var author = authors.first();
//
//           expect(authors.length).to.equal(1);
//           expect(author.get('email')).to.equal('ij@kl.com');
//         });
//       })
//       .then(function () {
//         return memento2.getRecipients().then(function (recipients) {
//           var recipient = recipients.first();
//
//           expect(recipients.length).to.equal(1);
//           expect(recipient.get('email')).to.equal('wx@yz.com');
//         });
//       })
//       .then(function () {
//         done();
//       }).catch(function (err) {
//         done(err);
//       });
//     });
//   });
// });

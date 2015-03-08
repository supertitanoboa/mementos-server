var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var async = require('async');
var sinon = require('sinon');
var bcrypt = require('bcrypt');

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
    }); //users Schema End

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
    }); //mementos Schema End

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
    }); //mementos_authors Schema End

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
    }); //mementos_recipients Schema End

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
    }); //moments Schema End

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
    }); //pebbles Schema End

  }); //Schema End

  describe('Models', function () {

    var Users = db.Users;
    var Mementos = db.Mementos;
    var Moments = db.Moments;

    var user1;
    var user2;
    var memento1;
    var memento2;
    var moment1;

    after(function (done) {
      Moments.where({
        title : 'My Moment'
      }).destroy()

      .then(function () {
        return Mementos.where({
          title : 'My Memento'
        }).destroy();
      })

      .then(function () {
        return Mementos.where({
          title : 'My Second Memento'
        }).destroy();
      })

      .then(function () {
        return Users.where({
          email: 'user1@test.com'
        }).destroy();
      })

      .then(function () {
        return Users.where({
          email: 'user2@test.com'
        }).destroy();
      })

      .then(function () {
        done();
      });
    });

    describe('"Users" Models', function () {

      before(function (done) {
        user2 = new Users({
          email: 'user2@test.com'
        });
        user2.setPass('12345').then(function () {
          return user2.save();
        })
        .then(function () {
          done();
        });
      });

      it('should create a new user', function (done) {
        user1 = new Users({
          email: 'user1@test.com'
        });
        user1.setPass('12345').then(function () {
          return user1.save();
        })
        .then(function (user) {
          user1 = user;

          var id = parseInt(user.get('id'));

          assert.isNumber(id, 'returned user id is not a number');

          knex.raw('select * from "users" where id = ?', [id]).then(function (resp) {
            expect(resp.rows.length).to.be.equal(1);
            expect(resp.rows[0].email).to.equal('user1@test.com');
            expect(bcrypt.compareSync('12345', resp.rows[0].password)).to.equal(true);
            done();
          });
        });
      }); //new user End

      describe('validatePass', function () {

        it('should return false when given no password', function () {
          assert.isFalse(user1.validatePass(), 'accepting no password as valid.');
          assert.isFalse(user1.validatePass(null), 'accepting null password as valid.');
        });

        it('should return true when given an invalid password', function () {
          assert.isFalse(user1.validatePass('123456'), 'accepting invalid password as valid.');
        });

        it('should return true when given a valid password', function () {
          assert.isTrue(user1.validatePass('12345'), 'rejecting valid password as invalid.');
        });

      }); //validatePass End

      describe('changeEmail', function () {

        it('should change the user email successfully', function (done) {
          var oldEmail = user1.get('email');
          var newEmail = 'temp2@test.com';
          user1.changeEmail(newEmail)

          .then(function() {
            return knex.raw('select * from "users" where id = ?', [user1.attributes.id]);
          })

          .then(function (resp) {
            expect(resp.rows.length).to.be.equal(1);
            expect(resp.rows[0].email).to.equal('temp2@test.com');
          })

          .then(function () {
            knex.raw('select * from "users" where email = ?', [oldEmail]).then(function (resp) {
              expect(resp.rows.length).to.equal(0);

              //clean up. set email back to old email
              user1.changeEmail(oldEmail)
              .then(function() {
                done();
              });
            });
          });

        });

      }); //changeEmail End

    }); //Users Models End

    describe('"Mementos" Model', function () {

      it('should create a new memento', function (done) {
        memento1 = new Mementos({
          title: 'My Memento',
          owner_id: user1.get('id')
        }).save()
        .then(function (memento) {
          memento1 = memento;
          var id = parseInt(memento.get('id'));

          assert.isNumber(id, 'returned user id is not a number');

          knex.raw('select * from "mementos" where id = ?', [id]).then(function (resp) {
            expect(resp.rows.length).to.equal(1);
            expect(resp.rows[0].title).to.equal('My Memento');
            expect(resp.rows[0].owner_id).to.equal(user1.get('id'));
            done();
          });
        });
      }); //new memento End

      describe('changeOwner', function () {

        it('should transfer the ownership successfully', function (done) {
          memento1.changeOwner(user2);
          memento1.save().then(function () {
            knex.raw('select * from "mementos" where id = ?', [memento1.get('id')]).then(function (resp) {
              expect(resp.rows.length).to.equal(1);
              expect(resp.rows[0].title).to.equal('My Memento');
              expect(resp.rows[0].owner_id).to.equal(user2.get('id'));

              memento1.changeOwner(user1);
              memento1.save().then(function () {
                done();
              });
            });
          });
        });
      }); //changeOwner End

      describe('Mementos Authors', function () {

        it('should be able to add an author to a memento', function (done) {
          memento1.addAuthors(user1)
          .then(function () {
            knex.raw('select * from "mementos_authors" where memento_id = ? and author_id = ?', [memento1.get('id'), user1.get('id')])
            .then(function (resp) {
              expect(resp.rows.length).to.equal(1);
              done();
            });
          });
        });

        it('should be able to check an author is part of a memento', function (done) {
          memento1.hasAuthor(user1.get('id'))
          .then(function (isAuthor) {
            expect(isAuthor).to.equal(true);
            done();
          });
        });

        it('should be able to check an author is not part of a memento', function (done) {
          memento1.hasAuthor(user2.get('id'))
          .then(function (isAuthor) {
            expect(isAuthor).to.equal(false);
            done();
          });
        });

        it('should successfully retrieve the list of authors', function (done) {
          memento1.addAuthors(user2)
          .then(function () {
            return memento1.getAuthors();
          })
          .then(function (authors) {
            var correctAuthors = false;

            if(
              (authors.models[0].get('id') === user1.get('id') && authors.models[1].get('id') === user2.get('id'))
              ||
              (authors.models[1].get('id') === user1.get('id') && authors.models[0].get('id') === user2.get('id'))
            ) {
              correctAuthors = true;
            }

            expect(authors.length).to.equal(2);
            expect(correctAuthors).to.equal(true);
          })
          .then(function () {
            return memento1.removeAuthors(user2);
          })
          .then(function () {
            done();
          });
        });

        it('should be able to remove an author from a memento', function (done) {
          memento1.removeAuthors([user1, user2])
          .then(function () {
            knex.raw('select * from "mementos_authors" where memento_id = ? and author_id = ?', [memento1.get('id'), user1.get('id')])
            .then(function (resp) {
              expect(resp.rows.length).to.equal(0);
            })
            .then(function () {
              knex.raw('select * from "mementos_authors" where memento_id = ? and author_id = ?', [memento1.get('id'), user2.get('id')])
              .then(function (resp) {
                expect(resp.rows.length).to.equal(0);
                done();
              });
            });

          });
        });

      }); //Mementos Authors End

      describe('Mementos Recipients', function () {

        it('should be able to add a recipient to a memento', function (done) {
          memento1.addRecipients(user1)
          .then(function () {
            knex.raw('select * from "mementos_recipients" where memento_id = ? and recipient_id = ?', [memento1.get('id'), user1.get('id')])
            .then(function (resp) {
              expect(resp.rows.length).to.equal(1);
              done();
            });
          });
        });

        it('should be able to check a recipient is part of a memento', function (done) {
          memento1.hasRecipient(user1.get('id'))
          .then(function (isRecipient) {
            expect(isRecipient).to.equal(true);
            done();
          });
        });

        it('should be able to check a recipient is not part of a memento', function (done) {
          memento1.hasRecipient(user2.get('id'))
          .then(function (isRecipient) {
            expect(isRecipient).to.equal(false);
            done();
          });
        });

        it('should successfully retrieve the list of recipient', function (done) {
          memento1.addRecipients(user2)
          .then(function () {
            return memento1.getRecipients();
          })
          .then(function (recipients) {
            var correctRecipients = false;

            if(
              (recipients.models[0].get('id') === user1.get('id') && recipients.models[1].get('id') === user2.get('id'))
              ||
              (recipients.models[1].get('id') === user1.get('id') && recipients.models[0].get('id') === user2.get('id'))
            ) {
              correctRecipients = true;
            }

            expect(recipients.length).to.equal(2);
            expect(correctRecipients).to.equal(true);
          })
          .then(function () {
            return memento1.removeRecipients(user2);
          })
          .then(function () {
            done();
          });
        });

        it('should be able to remove a recipient from a memento', function (done) {
          memento1.removeRecipients([user1, user2])
          .then(function () {
            knex.raw('select * from "mementos_recipients" where memento_id = ? and recipient_id = ?', [memento1.get('id'), user1.get('id')])
            .then(function (resp) {
              expect(resp.rows.length).to.equal(0);
            })
            .then(function () {
              knex.raw('select * from "mementos_recipients" where memento_id = ? and recipient_id = ?', [memento1.get('id'), user2.get('id')])
              .then(function (resp) {
                expect(resp.rows.length).to.equal(0);
                done();
              });
            });

          });
        });

      }); //Mementos Recipients End

      describe('Users#addNewMemento method', function () {

        it('should be able to be created through the User#addNewMemento method', function (done) {
          user1.addNewMemento({
            title: 'My Second Memento'
          }, user2)
          .then(function (mementoID) {
            Mementos.where({id : mementoID}).fetch()
            .then(function (memento) {
              memento2 = memento;

              knex.raw('select * from "mementos" where id = ? ', [mementoID])
              .then(function (resp) {
                expect(resp.rows.length).to.equal(1);
                expect(resp.rows[0].title).to.equal('My Second Memento');
                expect(resp.rows[0].owner_id).to.equal(user1.get('id'));

                memento2.removeAuthors([user1]);
                memento2.removeRecipients([user2]);

                done();
              });
            });
          });
        });

      });  //Users.addNewMemento End

    }); //Mementos Model End

    describe('Moments Model', function () {

      it('should create a new moment', function (done) {
        moment1 = new Moments({
          title : 'My Moment',
          author_id : user1.get('id'),
          ordering : 1,
          longitude : parseFloat(99.9999),
          latitude : parseFloat(33.3333),
          location : 'somewhere over the rainbow',
          release_date : 'Sun, 14 Feb 2016 12:00:00 GMT'
        }).save()
        .then(function (moment) {
          moment1 = moment;
          var id = parseInt(moment.get('id'));

          assert.isNumber(id, 'returned user id is not a number');

          knex.raw('select * from "moments" where id = ?', [id]).then(function (resp) {
            expect(resp.rows.length).to.equal(1);
            expect(resp.rows[0].title).to.equal('My Moment');
            expect(resp.rows[0].author_id).to.equal(user1.get('id'));
            expect(resp.rows[0].ordering).to.equal(1);
            expect(parseFloat(resp.rows[0].longitude)).to.equal(99.9999);
            expect(parseFloat(resp.rows[0].latitude)).to.equal(33.3333);
            expect(resp.rows[0].location).to.equal('somewhere over the rainbow');
            console.log(typeof resp.rows[0].release_date);
            expect(resp.rows[0].release_date.toUTCString()).to.equal('Sun, 14 Feb 2016 12:00:00 GMT');
            done();
          });
        });
      }); //new memento End

      // it('should create')

    }); //Moments Model End

  }); //Models End

});

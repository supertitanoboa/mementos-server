var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var sinon = require('sinon');

var relativePath = '../../server/database';
var modelPath = relativePath + '/schema/mementos.js';
var usersPath = relativePath + '/schema/users.js';
var db = require(relativePath + '/dbConfig');
var knex = db.knex;

before(function (done) {
  'use strict';
  knex.schema.dropTableIfExists('mementos_authors')
  .then(function () {
    return knex.schema.dropTableIfExists('mementos_recipients');
  })
  .then(function () {
    return knex.schema.dropTableIfExists('mementos');
  }).then(function() {
    done();
  });
});

describe('Mementos Tests', function() {
  'use strict';
  var sandbox;
  var Model;
  var Users;

  beforeEach(function (done) {
    sandbox = sinon.sandbox.create();
    require(usersPath)(db).then(function(UsersModel) {
      db.Users = UsersModel;
      Users = UsersModel;

      require(modelPath)(db).then(function (model) {
        Model = model;
        done();
      });
    });
  });

  afterEach(function () {
    sandbox.restore();
  });

  describe('Table Creation', function() {

    it('should have created the Mementos Table', function (done) {
      knex.schema.hasTable('mementos').then(function (exists) {
        assert.isTrue(exists, 'Mementos Table does not exist');
        done();
      });
    });

    it('should have created the Mementos_Authors Table', function (done) {
      knex.schema.hasTable('mementos_authors').then(function (exists) {
        assert.isTrue(exists, 'Mementos_Authors Table does not exist');
        done();
      });
    });

    it('should have created the Mementos_Recipients Table', function (done) {
      knex.schema.hasTable('mementos_recipients').then(function (exists) {
        assert.isTrue(exists, 'Mementos_Recipients Table does not exist');
        done();
      });
    });
  });

  describe('Mementos Model', function () {
    var author;
    var author2;
    var recipient;
    var recipient2;
    var memento;
    var memento2;

    beforeEach(function (done) {

      author = new Users({
          email: 'ef@gh.com'
      });

      author2 = new Users({
          email: 'ij@kl.com'
      });

      recipient = new Users({
          email: 'st@uv.com'
      });

      recipient2 = new Users({
          email: 'wx@yz.com'
      });

      author.setPass('12345')
      .then(function (user) {
        return user.save();
      })
      .then(function () {
        return author2.setPass('12345')
        .then(function (user) {
          return user.save();
        });
      })
      .then(function () {
        return recipient.setPass('12345')
        .then(function (user) {
          return user.save();
        });
      })
      .then(function () {
        return recipient2.setPass('12345')
        .then(function (user) {
          return user.save();
        });
      })
      .then(function () {
        memento = new Model({'owner_id' : author.id});
        memento2 = new Model({'owner_id' : author2.id});

        memento.authors().detach();
        memento.recipients().detach();
        memento2.authors().detach();
        memento2.recipients().detach();
        memento.where({'owner_id' : author.id}).destroy();
        memento2.where({'owner_id' : author.id}).destroy();
      })
      .then(function() {
        done();
      });

    });

    afterEach(function (done) {

        memento.authors().detach()
        .then(function () {
          memento.recipients().detach();
        }).then(function () {
          memento2.authors().detach();
        }).then(function () {
          memento2.recipients().detach();
        }).then(function () {
          memento.where({'owner_id' : author.id}).destroy();
        }).then(function () {
          memento2.where({'owner_id' : author2.id}).destroy();
        }).then(function () {
          Users.where({'id' : author.id}).destroy();
        }).then(function () {
          Users.where({'id' : author2.id}).destroy();
        }).then(function () {
          Users.where({'id' : recipient.id}).destroy();
        }).then(function () {
          Users.where({'id' : recipient2.id}).destroy();
        }).then(function () {
          done();
        });
    });

    it('should add a Memento Object to the database', function (done) {
      memento = new Model({
        title: 'Test Memento',
        owner_id: author.id
      });

      memento2 = new Model({
        title: 'Test Memento 2',
        owner_id: author2.id
      });

      memento.save()
      .then(function() {
        return memento2.save();
      })
      .then(function () {
        return memento.addAuthors([author]);
      })
      .then(function () {
        return memento.addRecipients([recipient]);
      })
      .then(function () {
        return memento2.addAuthors([author2]);
      })
      .then(function () {
        return memento2.addRecipients([recipient2]);
      })
      .then(function () {
        return memento.getAuthors().then(function (authors) {
          var author = authors.first();

          expect(authors.length).to.equal(1);
          expect(author.get('email')).to.equal('ef@gh.com');
        });
      })
      .then(function () {
        return memento.getRecipients().then(function (recipients) {
          var recipient = recipients.first();

          expect(recipients.length).to.equal(1);
          expect(recipient.get('email')).to.equal('st@uv.com');
        });
      })
      .then(function () {
        return memento2.getAuthors().then(function (authors) {
          var author = authors.first();

          expect(authors.length).to.equal(1);
          expect(author.get('email')).to.equal('ij@kl.com');
        });
      })
      .then(function () {
        return memento2.getRecipients().then(function (recipients) {
          var recipient = recipients.first();

          expect(recipients.length).to.equal(1);
          expect(recipient.get('email')).to.equal('wx@yz.com');
        });
      })
      .then(function () {
        memento.fetch({withRelated : 'owner'}).then(function (mementos) {
          expect(mementos.related('owner').get('email')).to.equal('ef@gh.com');
        });
      })
      .then(function () {
        done();
      }).catch(function (err) {
        done(err);
      });
    });
  });
});

var bPromise = require('bluebird');
var bcrypt = require('bcrypt');

var modelsBuilder = function modelsBuilder (db) {
  'use strict';

  var bookshelf = db.bookshelf;
  var models = {};

  var Users;
  var Mementos;
  var Moments;
  var Pebbles;

  //Users Model
  models.Users = Users = bookshelf.Model.extend({

    tableName : 'users',

    hasTimestamps: ['created_at', 'updated_at'],

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
        return this.save({id: this.get('id'), email : email}, {method : 'update'});
      } else {
        throw new Error('Error: Invalid Email.');
      }
    },

    validatePass : function validatePass(password) {
      if(typeof password !== 'string' || !password) {
        return false;
      }

      return bcrypt.compareSync(password, this.get('password'));
    },

    mementosAuthored : function mementos () {
      return this.belongsToMany(Mementos, 'mementos_authors', 'author_id', 'memento_id');
    },

    getMementosAuthored : function getMementosAuthored (id) {
      var query = {where : {'author_id' : this.id}};

      if (typeof id === 'number') {
          query.where.memento_id = id;
      }

      return this.mementosAuthored().query(query).fetch();
    },

    addNewMemento : function addNewMemento (data, recipients) {
      var _this = this;

      data.owner_id = _this.get('id');

      return new bPromise(function (resolve, reject) {
        new Mementos(data).save()
        .then(function (memento) {
          memento.addAuthors([_this.get('id')]);
          memento.addRecipients(recipients);
          resolve(memento.get('id'));
        })
        .catch(function (err) {
          reject(err);
        });
      });
    },

    mementosReceived : function mementosReceived () {
      return this.belongsToMany(Mementos, 'mementos_recipients', 'recipient_id', 'memento_id');
    },

    getMementosReceived : function getMementosReceived (id) {
      var query = {where : {'recipient_id' : this.id}};

      if (typeof id === 'number') {
          query.where.memento_id = id;
      }

      return this.mementosReceived().query(query).fetch();
    }
  });

  //Mementos Model
  models.Mementos = Mementos = bookshelf.Model.extend({

    tableName : 'mementos',

    hasTimestamps: ['created_at', 'updated_at'],

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

    hasAuthor : function hasAuthor (userID) {
      var _this = this;
      return new bPromise(function (resolve, reject) {
        _this.authors().query({where : {'memento_id' : _this.id, 'author_id' : userID}}).fetch()
        .then(function (authors) {
          if(authors.length === 1) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(function (err) {
          reject(err);
        });
      });
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

    hasRecipient : function hasRecipient (userID) {
      var _this = this;
      return new bPromise(function (resolve, reject) {
        _this.recipients().query({where : {'memento_id' : _this.id, 'recipient_id' : userID}}).fetch()
        .then(function (recipients) {
          if(recipients.length === 1) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(function (err) {
          reject(err);
        });
      });
    },

    removeRecipients : function removeRecipients (user) {
      return this.recipients().detach(user);
    },

    moments : function moments () {
      return this.hasMany(Moments, 'memento_id');
    },

    //reorder
    reorder : function reorder() {

    },

    formatJSON : function formattedJSON() {
      return {
        ID : this.get('id'),
        title : this.get('title'),
        owner : this.get('owner_id'),
        options : {
          public : this.get('public'),
          releaseType : this.get('release_type')
        }
      };
    }

  });

  models.Pebbles = Pebbles = bookshelf.Model.extend({
    tableName : 'pebbles',

    hasTimestamps: ['created_at', 'updated_at'],
  });

  models.Moments = Moments = bookshelf.Model.extend({

    tableName : 'moments',

    hasTimestamps: ['created_at', 'updated_at'],

    author : function author () {
      return this.belongsTo(Users, 'author_id');
    },

    pebbles : function pebbles () {
      return this.hasMany(Pebbles, 'moment_id');
    },

    addPebble : function addPebble(type, url, ordering) {
      var addedPebble = new Pebbles({
        moment_id : this.id,
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
    },

    formatJSON : function formatJSON () {
      return {
        ID : this.get('id'),
        title : this.get('title'),
        author : this.get('author_id'),
        releaseDate : this.get('release_date'),
        meta : {
          creationDate : this.get('created_at'),
          location : {
            latitude : this.get('latitude'),
            longitude : this.get('longitude'),
            location : this.get('location')
          }
        }
      };
    }
  });

  return models;
};

module.exports = modelsBuilder;

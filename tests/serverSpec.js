var supertest = require('supertest');
var chai = require('chai');
var assert = chai.assert;
var should = chai.should();
var expect = chai.expect;
var server = require('../server/server.js');
var app = require('../server/app-config.js');
var port = app.get('port');

describe('Server Unit Tests', function() {  
  it('server port should be a number', function(){
    expect(port).to.be.a('number');
    assert.typeOf(port, 'number');
  });

  describe('GET /', function(){
    it('respond with plain text and 200 status code', function(done){
      supertest(app)
        .get('/')
        .expect('Content-Type', 'text/plain; charset=utf-8')
        .expect('ETag', '12345')
        .expect(200)
        .expect('Hello Alan!', done);
    });
  });

  describe('GET /mementos', function(){
    xit('respond with plain text and 200 status code', function(done){
      supertest(server)
        .get('/mementos')
        .expect(200)
        .expect('this is the endpoint to which we will be retrieving mementos', done);
    });
  });

  describe('PUT /mementos', function(){
    xit('respond with plain text and 200 status code', function(done){
      supertest(server)
        .put('/mementos')
        .expect(200)
        .expect('this is the endpoint to which we will be retrieving mementos', done);
    });
  });

  describe('PUT /moments', function(){
    xit('respond with plain text and 200 status code', function(done){
      supertest(server)
        .get('/')
        .expect('Content-Type', 'text/plain; charset=utf-8')
        .expect('ETag', '12345')
        .expect(200, done);
    });
  });

  server.close();
});


// process.exit();



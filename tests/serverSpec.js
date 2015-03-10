var chai = require('chai');
var assert = chai.assert;
var expect = chai.expect;
var should = chai.should();
var app = require('../server/app-config.js');
var aws = require('../server/aws/aws.js');
var supertest = require('supertest');
var port = app.get('port');

describe('Server Unit Tests', function() {
  'use strict';

  it('server port should be a number', function(){
    expect(port).to.be.a('number');
    assert.typeOf(port, 'number');
  });
  //
  // describe('GET /', function(){
  //   it('respond with plain text and 200 status code', function(done){
  //     supertest(app)
  //       .get('/')
  //       .expect('Content-Type', 'text/plain; charset=utf-8')
  //       .expect('ETag', '12345')
  //       .expect(200)
  //       .expect('Hello Alan!', done);
  //   });
  // });

  describe('GET /mementos without session authentication', function(){
    it('respond with 403 status code', function(done){
      supertest(app)
        .get('/api/1/mementos')
        .expect(403, done);
    });
  });

  describe('POST /mementos without session authentication', function(){
    it('respond with 403 status code', function(done){
      supertest(app)
        .post('/api/1/mementos')
        .expect(403, done);
    });
  });

  describe('GET /mementos/:id without session authentication', function(){
    it('respond with 403 status code', function(done){
      supertest(app)
        .get('/api/1/mementos/:id')
        .expect(403, done);
    });
  });

  describe('PUT /mementos/:id without session authentication', function(){
    it('respond with 403 status code', function(done){
      supertest(app)
        .put('/api/1/mementos/:id')
        .expect(403, done);
    });
  });

  describe('POST /moments without session authentication', function(){
    it('respond with 403 status code', function(done){
      supertest(app)
        .post('/api/1/moments')
        .expect(403, done);
    });
  });

  describe('GET /auth/signup', function(){
    it('respond with 200 status code', function(done){
      supertest(app)
        .get('/auth/signup')
        .expect(200, done);
    });
  });

  describe('POST /auth/signup', function(){
    xit('respond with 201 status code', function(done){
      supertest(app)
        .post('/auth/signup')
        .expect(201, done);
    });
  });

  describe('GET /auth/login', function(){
    it('respond with 200 status code', function(done){
      supertest(app)
        .get('/auth/login')
        .expect(200, done);
    });
  });

  describe('POST /auth/login', function(){
    xit('respond with 201 status code', function(done){
      supertest(app)
        .post('/auth/login')
        .expect(201, done);
    });
  });

  describe('GET /auth/logout', function(){
    it('respond with 302 redirect status code', function(done){
      supertest(app)
        .get('/auth/logout')
        .expect(302, done);
    });
  });

  describe('AWS configuration', function() {
    xit('aws.signedUrlAuth should be a function', function() {
      assert.typeOf(aws.signedUrlAuth, 'function');
    });

    xit('node.env AWS credentials should exist (not applicable for dev environment)', function() {
      should.exist(process.env.AWS_ACCESS_KEY_ID);
      should.exist(process.env.AWS_SECRET_ACCESS_KEY);
      should.exist(process.env.S3_BUCKET_NAME);
    });

  });

});

after(function(done) {
  'use strict';
  app.get('redis').redisOptions.client.quit();

  //db connection is trying to be torn down too quickly.
  setTimeout(function () {
    app.get('db').destroy()
    .then(function () {
      done();
    });
  }, 200);
});

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cors = require('cors');
var redis = require('./redis.js');
var authRouter = require('./auth/auth-router.js');
var apiRouter = require('./api/api-router.js');
var s3Router = require('./aws/aws.js').s3Router;
var db = require('./database');
var app = express();

console.log('process.pid', process.pid);

app.set('db', db);
app.set('redis', redis);
app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

// Attaching the DB object to every request
app.use(function (req, res, next) {
  'use strict';
  req.db = db;
  req.redis = redis;
  next();
});

app.use(redis.session({
  store: new redis.RedisStore(redis.redisOptions),
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

// FIXME: home page, this is temporary
app.get('/', function(req, res) {
  'use strict';
  res.set({
    'Content-Type': 'text/plain',
    'ETag': '12345'
  });
  res.cookie('sessionID', req.sessionID);
  res.status(200).send('Hello Alan!');
});

// router to handle all incoming api calls
app.use('/api', apiRouter);

// router for handling all requests to the /auth endpoint
app.use('/auth', authRouter);

// router for handling all requests to the /s3 endpoint
app.use('/s3', s3Router);

module.exports = app;

console.log('==============================================================\n' +
'=  =====  ====================================================\n' +
'=   ===   ====================================================\n' +
'=  =   =  ==================================  ================\n' +
'=  == ==  ===   ===  =  = ====   ===  = ===    ===   ====   ==\n' +
'=  =====  ==  =  ==        ==  =  ==     ===  ===     ==  =  =\n' +
'=  =====  ==     ==  =  =  ==     ==  =  ===  ===  =  ===  ===\n' +
'=  =====  ==  =====  =  =  ==  =====  =  ===  ===  =  ====  ==\n' +
'=  =====  ==  =  ==  =  =  ==  =  ==  =  ===  ===  =  ==  =  =\n' +
'=  =====  ===   ===  =  =  ===   ===  =  ===   ===   ====   ==\n' +
'==============================================================');


console.log('app port set as:', app.get('port'));

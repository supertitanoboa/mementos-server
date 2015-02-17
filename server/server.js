var http = require('http');
var app = require('./app-config.js');
var server;

server = http.createServer(app).listen(app.get('port'));

module.exports = server;

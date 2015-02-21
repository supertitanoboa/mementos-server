var app = require('./app-config.js');
var server;

server = app.listen(app.get('port'));

module.exports = server;

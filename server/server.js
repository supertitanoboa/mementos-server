var express = require('express');
var app = express();
var server;

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res) {
  res.send('Hello Alan!');
});

app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'));
});




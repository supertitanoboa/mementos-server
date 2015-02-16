var express = require('express');
var app = express();

app.set('port', process.env.PORT || 3000);

app.get('/', function(req, res) {
  'use strict';
  res.send('Hello Alan!');
});

app.listen(app.get('port'), function() {
  'use strict';
  console.log('Listening on port ' + app.get('port'));
});

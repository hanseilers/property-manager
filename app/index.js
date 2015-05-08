var express = require('express'),
    http = require('http')

var app = express();

app.get('/', function(req, res, next) {
	res.send('this is the our property management API');
});

http.createServer(app).listen(process.env.PORT || 3000, function() {
  console.log('Listening on port ' + (process.env.PORT || 3000));
});
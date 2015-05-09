var util = require('util');
var express = require('express');
var app = express();
var expressValidator = require('express-validator');

app.use(express.bodyParser());
app.use(expressValidator());

//Store a property
app.post('/properties', function(req, res) {
  	req.checkBody('houseNumber', 'houseNumber is requird').notEmpty();
	console.log(req.body.houseNumber);
	var errors = req.validationErrors();

  	if (errors) {
  		res.status(400);
  		res.json({ msg: 'There have been validation errors. //TODO', errors: errors});
  		return;
  	}
  	res.json({ msg: 'Property saved. //TODO'});

});


// Initial route
app.all('/', function(req, res) {
  res.json({ msg: 'This our property management API' });
});

module.exports = app;
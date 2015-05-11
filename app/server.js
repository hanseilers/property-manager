// Get the packages we need
var express = require('express');
var routesApiV1 = require('./routes/routes');
var passport = require('passport');
var models = require('./models');
var authController = require('./controllers/auth');

// Create our Express application
var app = express();

// Use the passport package in our application
app.use(passport.initialize());

// Use environment defined port or 3000
var port = process.env.PORT || 3000;

// Register all our routes with /api
app.use('/api/v1', routesApiV1);

models.sequelize.sync().then(function () {
  	// Start the server
	app.listen(port);
	console.log('Property management API started on ' + port);  	
});


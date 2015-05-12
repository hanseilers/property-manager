var express = require('express');
var models = require('../models');
var bodyParser = require('body-parser')
var propertyController = require('../controllers/properties');
var userController = require('../controllers/users');
var app = express();
var expressValidator = require('express-validator');
var authController = require('../controllers/auth');

app.use(bodyParser.json());
app.use(expressValidator());

//Store a property
app.route('/properties')
  .post(authController.isAuthenticated, propertyController.postProperty)
  .get(propertyController.getAllProperties)
  .delete(propertyController.deleteAllProperties);

app.route('/properties/:id')
  .get(propertyController.getProperty);

app.route('/users')
  .post(userController.postUser)
  .delete(userController.deleteUserbyUsername);

app.route('/users/:id')
  .get(userController.getUser)
  .delete(userController.deleteUserbyId);
  
// Initial route
app.all('/', function (req, res) {
  res.json({
    msg: 'This our property management API'
  });
});

module.exports = app;
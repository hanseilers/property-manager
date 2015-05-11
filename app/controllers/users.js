// Load required packages
var Users = require('../models/users');
var utils = require('../common/utils');

// Create endpoint /api/users for POST
exports.postUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  Users.create({
    username: username,
    password: password
  }).then(function(instance) {
    res.json(utils.createdResponseTemplate('User created', instance.dataValues.id));
  });
};

// Create endpoint /api/users for GET
exports.getUser = function(req, res) {
   Users.findOne({
      where: {
        id: req.param('id')
      }
    })
    .then(function(users) {
      res.json(utils.multipleItemsResponseTemplate('', users, users.length));
    }); 
};

// Create endpoint /api/users for GET
exports.authenticateUser = function(req, res) {
   Users.findOne({
      where: {
        username: req.param('username'),
        password: req.param('password')
      }
    })
    .then(function(users) {
      res.json(utils.multipleItemsResponseTemplate('', users, users.length));
    }); 
};
// Load required packages
var model = require('../models');
var utils = require('../common/utils');

// Create endpoint /api/users for POST
exports.postUser = function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  model.Users.create({
    username: username,
    password: password
  }).then(function(instance) {
    res.json(utils.createdResponseTemplate('User created', 0, instance.dataValues.id));
  });
};

// Create endpoint /api/users for GET
exports.getUser = function(req, res) {
   model.Users.findAll({
      where: {
        id: req.params.id
      }
    })
    .then(function(users) {
      res.json(utils.multipleItemsResponseTemplate('', 0, users, users.length));
    }); 
};


// Create endpoint /api/users for GET
exports.deleteUserbyUsername = function(req, res) {
   model.Users.destroy({
      where: {
        username: req.body.username
      }
    })
    .then(function(affectedRows) {
      res.json(utils.affectedRowsTemplate(' were affected',0, affectedRows));
    }); 
};

// Create endpoint /api/users for GET
exports.deleteUserbyId = function(req, res) {
   model.Users.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function(affectedRows) {
      res.json(utils.affectedRowsTemplate(' were affected',0, affectedRows));
    }); 
};

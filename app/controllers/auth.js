// Load required packages
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var model = require('../models');

passport.use(new BasicStrategy(
  function(username, password, callback) {
    
     model.Users.findOne({
      where: {
        username: username
      }
    })
    .then(function(data) {
      var user = data.dataValues;
      return callback(null, user);
    }); 
    
   
  }
));

exports.isAuthenticated = passport.authenticate('basic', { session : false });
// Load required packages
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var Users = require('../models/users');

passport.use(new BasicStrategy(
  function(username, password, callback) {
    
     Users.findOne({
      where: {
        username: password
      }
    })
    .then(function(users) {
      var user = users[0];
      return callback(null, user);
    }); 
    
   
  }
));

exports.isAuthenticated = passport.authenticate('basic', { session : false });
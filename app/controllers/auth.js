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
    .then(function(user) {
      if(!user){ return callback(null, false); }
      
      // Make sure the password is correct
      user.validatePassword(password, function(err, isMatch) {
        if (err) { return callback(err); }

        // Password did not match
        if (!isMatch) { return callback(null, false); }

        // Success
        return callback(null, user);
      });
    }); 
    
  }
));

exports.isAuthenticated = passport.authenticate('basic', { session : false });
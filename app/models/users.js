"use strict";
var bcrypt = require('bcrypt-nodejs');

module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
      id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
      },
      username: DataTypes.STRING,
      password: DataTypes.STRING
    }, 
    {
        classMethods: {
        associate: function(models) {
          Users.hasMany(models.Users, {
            as: 'Seller'
          });
          Users.hasMany(models.Users, {
            as: 'Bidder'
          });
          Users.hasMany(models.Users, {
            as: 'Buyer'
          });
        }
      }, 
      instanceMethods: {
        validatePassword: function(password, next) {
          bcrypt.compare(password, this.password, next);
        }
      }
    }
  );

  Users.beforeCreate(function(model, options, done) {
    // Break out if the password hasn't changed
    // Password changed so we need to hash it
    bcrypt.genSalt(5, function(err, salt) {
      if (err) return done(err);

      bcrypt.hash(model.password, salt, null, function(err, hash) {
        if (err) return done(err);
        model.password = hash;
        done();
      });
    });
  });
  return Users;
};



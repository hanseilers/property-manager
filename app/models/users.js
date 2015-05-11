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
  }, {
    classMethods: {
      associate: function(models) {
        Users.hasMany(models.Users,{as: 'Seller'});
        Users.hasMany(models.Users,{as: 'Bidder'});
        Users.hasMany(models.Users,{as: 'Buyer'});
      }
    }
  });
  
  return Users;
};
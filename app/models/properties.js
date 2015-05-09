"use strict";

module.exports = function(sequelize, DataTypes) {
  var Properties = sequelize.define("Properties", {
    street: DataTypes.STRING,
    houseNumber: DataTypes.STRING,
    city: DataTypes.STRING,
    postalCode: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Properties.belongsTo(models.Users);
      }
    }
  });

  return Properties;
};
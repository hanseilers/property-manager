"use strict";

module.exports = function(sequelize, DataTypes) {
  var Properties = sequelize.define("Properties", {
    id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    street: DataTypes.STRING,
    houseNumber: DataTypes.STRING,
    city: DataTypes.STRING,
    postalCode: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Properties.hasMany(models.Sales);
      }
    }
  });

  return Properties;
};
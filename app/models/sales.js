"use strict";

module.exports = function(sequelize, DataTypes) {
  var Sales = sequelize.define("Sales", {
   id: {
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
     m2: DataTypes.INTEGER,
    m3: DataTypes.INTEGER,
    askingPrice:DataTypes.INTEGER,
    photo1Url: DataTypes.STRING,
    photo2Url: DataTypes.STRING,
    movie1Url: DataTypes.STRING,
  }, {
    classMethods: {
      associate: function(models) {
        Sales.belongsTo(models.Properties);
        Sales.belongsTo(models.Users,{as: 'Seller'});
        Sales.belongsTo(models.Users,{as: 'Bidder'});
        Sales.belongsTo(models.Users,{as: 'Buyer'});
      }
    }
  });

  return Sales;
};
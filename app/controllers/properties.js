var models = require('../models');
var utils = require('../common/utils');

//Store a property
exports.postProperty = function(req, res) {
  req.checkBody('houseNumber', 'houseNumber is required').notEmpty();
  req.checkBody('street', 'houseNumber is required').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    res.status(400);
    res.json({
      msg: 'There are validation errors. //TODO',
      errors: errors
    });
    return;
  }

  var houseNumber = req.body.houseNumber;
  var street = req.body.street;
  models.Properties.create({
    houseNumber: houseNumber,
    street: street
  }).then(function(instance) {
    res.json(utils.createdResponseTemplate('Property created',0, instance.dataValues.id));
  });

};

exports.getProperty = function(req, res) {
  models.Properties.findOne({
      where: {
        id: req.param('id'),
        include: [models.Sales]
      }
    })
    .then(function(properties) {
      res.json(utils.multipleItemsResponseTemplate('', 0,properties, properties.length));
    }); 
}; //app.get

//TODO use paging
exports.getAllProperties = function(req, res) {
  models.Properties.findAll()
    .then(function(properties) {
      res.json(utils.multipleItemsResponseTemplate('', 0,properties, properties.length));
    }); //findall
}; //app.get

exports.deleteAllProperties = function(req, res) {
  models.Properties.destroy({
      where: {
        id: {
          ne: '0'
        }
      }
    })
    .then(function(affectedRows) {
      res.json({
        msg: 'Deleted ' + affectedRows + ' properties.'
      });
    }); //destroy
}; //app.get
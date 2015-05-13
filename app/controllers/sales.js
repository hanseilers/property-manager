var models = require('../models');
var utils = require('../common/utils');

//Store a Sale
exports.postSale = function(req, res) {
  req.checkBody('m2', 'Square meters is required').notEmpty();
  req.checkBody('m3', 'Qubic meters is required').notEmpty();

  var errors = req.validationErrors();

  if (errors) {
    res.status(400);
    res.json({
      msg: 'There are validation errors. //TODO',
      errors: errors
    });
    return;
  }

  var m2 = req.body.m2;
  var m3 = req.body.m3;
  models.Sales.create({
    m2: m2,
    m3: m3
  }).then(function(instance) {
    res.json(utils.createdResponseTemplate('Sale created',0, instance.dataValues.id));
  });

};

exports.getSale = function(req, res) {
  models.Sales.findOne({
      where: {
        id: req.param('id'),
        include: [models.Sales]
      }
    })
    .then(function(Sales) {
      res.json(utils.multipleItemsResponseTemplate('', 0,Sales, Sales.length));
    }); 
}; //app.get

//TODO use paging
exports.getAllSales = function(req, res) {
  models.Sales.findAll()
    .then(function(Sales) {
      res.json(utils.multipleItemsResponseTemplate('', 0,Sales, Sales.length));
    }); //findall
}; //app.get

exports.deleteAllSales = function(req, res) {
  models.Sales.destroy({
      where: {
        id: {
          ne: '0'
        }
      }
    })
    .then(function(affectedRows) {
      res.json({
        msg: 'Deleted ' + affectedRows + ' Sales.'
      });
    }); //destroy
}; //app.get

exports.baseTemplate = function (msg, code) {
  return {
    msg: msg,
    code: 0
  };
};

exports.multipleItemsResponseTemplate = function (msg, code, items, totalResults) {
  console.log("totalResults"+totalResults);
  var msg = exports.baseTemplate(msg, code);
  msg.results = { items: items, totalResults: totalResults };
  return msg;

};

exports.createdResponseTemplate = function (msg, code, id) {
  var msg = exports.baseTemplate(msg, code);
  msg.id = id;

  return msg;
};

exports.affectedRowsTemplate = function (msg, code, affectedRows) {
  var msg = exports.baseTemplate(msg, code);
  msg.affectedRows = affectedRows;
  return msg;
};
exports.multipleItemsResponseTemplate = function(msg, items, totalResults) {
  return {
    msg: msg,
    code: 0,
    results: {
      items: items,
      total: totalResults
    }
  };
};

exports.createdResponseTemplate = function(msg, item) {
  return {
    msg: msg,
    code: 0,
    id: ''
  };
};
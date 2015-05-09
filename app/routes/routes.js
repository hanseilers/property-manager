var express = require('express');
var router = express();

// Initial route
router.all('/', function(req, res) {
  res.json({ message: 'This our property management API' });
});

//Store a property
router.post('/properties', function(req, res) {
  res.json({ message: 'Property must be stored. //TODO' });
});

module.exports = router;
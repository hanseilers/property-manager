module.exports = function (app) {

	app.get('/', function(req, res) {
  		res.json({ message: 'This our property management API' });
	});

}
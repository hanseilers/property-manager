var assert = require("assert");
var should = require('should');
var request = require('supertest');

describe('Routing', function() {
  var url = 'http://localhost:3000';
  before(function(done) { 
	done();
  });

  // use describe to give a title to your test suite, in this case the tile is "Account"
  // and then specify a function in which we are going to declare all the tests
  // we want to run. Each test starts with the function it() and as a first argument 
  // we have to provide a meaningful title for it, whereas as the second argument we
  // specify a function that takes a single parameter, "done", that we will use 
  // to specify when our test is completed, and that's what makes easy
  // to perform async test!
  describe('Base', function() {
    it('should return the title of the API on get', function(done) {
    request(url)
	.get('/api/v1')
	.expect(200)
    // end handles the response
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          // this is should.js syntax, very clear
         // res.should.have.statusCode(200);
          done();
        });
    });

    it('should return the title of the API on post', function(done) {
    request(url)
	.post('/api/v1')
	.expect(200)
    // end handles the response
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          // this is should.js syntax, very clear
         // res.should.have.statusCode(200);
          done();
        });
    });

  });

  describe('Property', function() {

  	var property = {
        city: 'Blijham',
        streetname: 'Winschoterweg ',
        houseNumber: '17',
        postalCode: '9697XC'
      };

    it('should return 200 on posting a property', function(done) {
	    request(url)
		.post('/api/v1/properties')
		.send(property)
		.set('Accept', 'application/json')
		.expect(200)
		.expect('Content-Type', /json/)
		// end handles the response
		.end(function(err, res) {
	     	if (err) {
	        	throw err;
	         }
	          // this is should.js syntax, very clear
	         res.body.msg.should.containEql('Property saved');
	         done();
	     });
    });

    var emptyProperty = {};

    it('should return 400 on posting a property with invalid attributes', function(done) {
    request(url)
	.post('/api/v1/properties')
	.send(emptyProperty)
	.expect(400)
	// end handles the response
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          // this is should.js syntax, very clear
          res.body.msg.should.containEql('errors');
          done();
        });
    });

  });

});

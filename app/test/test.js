var assert = require("assert");
var should = require('should');
var request = require('supertest');

describe('Routing', function() {
  var url = 'http://someurl.com';
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
    it('should return the title of the API', function(done) {
    request(url)
	.post('/api/v1')
    // end handles the response
	.end(function(err, res) {
          if (err) {
            throw err;
          }
          // this is should.js syntax, very clear
          res.should.have.status(200);
          done();
        });
    });
  });
});

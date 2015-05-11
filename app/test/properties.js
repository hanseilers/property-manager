var assert = require("assert");
var should = require('should');
var request = require('supertest');
var url = 'http://localhost:3000';

  describe('Property', function() {
    //clean test database   
    before(function(done) {
      request(url)
        .delete('/api/v1/properties')
        .expect(200)
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          // this is should.js syntax, very clear
          res.body.msg.should.containEql('Deleted');
          done();
        });

    });
    var property = {
      city: 'Blijham',
      street: 'Winschoterweg ',
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
          res.body.msg.should.containEql('Property created');
          res.body.should.have.property('id');
          done();
        });
    });

    it('should contain exactly one property', function(done) {
      request(url)
        .get('/api/v1/properties')
        .expect(200)
        .expect('Content-Type', /json/)
        // end handles the response
        .end(function(err, res) {
          if (err) {
            throw err;
          }

          res.body.results.should.have.property('totalResults');
          res.body.results.totalResults.should.equal(1);
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

    it('should still contain exactly one property, because previous save should fail.', function(done) {
      request(url)
        .get('/api/v1/properties')
        .expect(200)
        .expect('Content-Type', /json/)
        // end handles the response
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          res.body.results.should.have.property('totalResults');
          res.body.results.totalResults.should.equal(1);
          done();
        });
    });

  });



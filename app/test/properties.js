var assert = require("assert");
var should = require('should');
var request = require('supertest');
var testConfig = require('./testconfig');

describe('Property', function() {
  //clean test database   
  before(function(done) {
    request(testConfig.url)
      .delete('/api/v1/properties')
      .auth(testConfig.testUser1.username, testConfig.testUser1.password)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          throw err;
        }
        // this is should.js syntax, very clear
        res.body.msg.should.containEql('Deleted');
        
      });

  //create user
   request(testConfig.url)
        .post('/api/v1/users')
        .send(testConfig.testUser1)
        .set('Accept', 'application/json')
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          // this is should.js syntax, very clear
          res.body.msg.should.containEql('User created');
          res.body.should.have.property('id');
          testConfig.testUser1.id= res.body.id;
          done();
        });
  });

  it('should return 200 on posting a property', function(done) {
    request(testConfig.url)
      .post('/api/v1/properties')
      .auth(testConfig.testUser1.username, testConfig.testUser1.password)
      .send(testConfig.testProperty)
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
    request(testConfig.url)
      .get('/api/v1/properties')
      .auth(testConfig.testUser1.username, testConfig.testUser1.password)
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


  it('should return 400 on posting a property with invalid attributes', function(done) {
    request(testConfig.url)
      .post('/api/v1/properties')
      .auth(testConfig.testUser1.username, testConfig.testUser1.password)
      .send(testConfig.emptyTestProperty)
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
    request(testConfig.url)
      .get('/api/v1/properties')
      .auth(testConfig.testUser1.username, testConfig.testUser1.password)
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
  
   after(function(done) {
    request(testConfig.url)
      .delete('/api/v1/properties')
      .auth(testConfig.testUser1.username, testConfig.testUser1.password)
      .expect(200)
      .end(function(err, res) {
        if (err) {
          throw err;
        }
        // this is should.js syntax, very clear
        res.body.msg.should.containEql('Deleted');
        done();
      });

  //create user
   request(testConfig.url)
        .delete('/api/v1/users/' + testConfig.testUser1.id)
        .set('Accept', 'application/json')
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          console.dir(res);
          console.dir(err);
          res.body.msg.should.containEql('affected');
          res.body.should.have.property('id');
          done();
        });
  });

});
var assert = require("assert");
var should = require('should');
var request = require('supertest');
var testConfig = require('./testconfig');

describe('Users', function() {
  
   //clean test database   
    before(function(done) {
      request(testConfig.url)
        .delete('/api/v1/users/')
        .send({username:testConfig.testUser1.username})
        .expect(200)
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          // this is should.js syntax, very clear
          res.body.msg.should.containEql('were affected');
          done();
        });

    });
    
    it('should return 200 on posting a user', function(done) {
      request(testConfig.url)
        .post('/api/v1/users')
        .send(testConfig.testUser1)
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        // end handles the response
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          // this is should.js syntax, very clear
          res.body.msg.should.containEql('User created');
          res.body.should.have.property('id');
          testConfig.testUser1.id = res.body.id;
          done();
        });
    });
    
     it('should return 200 on getting user', function(done) {
      request(testConfig.url)
        .get('/api/v1/users/' + testConfig.testUser1.id)
        .send(testConfig.testUser1)
        .set('Accept', 'application/json')
        .expect(200)
        // end handles the response
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          // this is should.js syntax, very clear
          res.body.results.totalResults.should.equal(1);
          done();
        });
    });
    
    //clean test database   
    after(function(done) {
      request(testConfig.url)
        .delete('/api/v1/users/' + testConfig.testUser1.id)
        .expect(200)
        .end(function(err, res) {
          if (err) {
            throw err;
          }
          // this is should.js syntax, very clear
          res.body.msg.should.containEql('were affected');
          done();
        });

    });
});
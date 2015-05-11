var assert = require("assert");
var should = require('should');
var request = require('supertest');

describe('Users', function() {
  var url = 'http://localhost:3000';
  
   //clean test database   
    before(function(done) {
      request(url)
        .delete('/api/v1/users/')
        .send({username:'hans'})
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
    
     var user = {
      username: 'hans',
      password: 'Winschoterweg '
    };

    it('should return 200 on posting a user', function(done) {
      request(url)
        .post('/api/v1/users')
        .send(user)
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
          done();
        });
    });
});
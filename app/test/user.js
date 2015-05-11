var assert = require("assert");
var should = require('should');
var request = require('supertest');

describe('Routing', function() {
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
          res.body.msg.should.containEql('Deleted');
          done();
        });

    });
});
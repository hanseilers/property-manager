var assert = require("assert");
var should = require('should');
var request = require('supertest');
var url = 'http://localhost:3000';

describe('Base', function() {
    it('should return the title of the API on get', function(done) {
      request(url)
        .get('/api/v1')
        .expect(200);
		done();
    });

    it('should return the title of the API on post', function(done) {
      request(url)
        .post('/api/v1')
        .expect(200);
		done();
    });

  });
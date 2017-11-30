const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const {app} = require('../server');

chai.use(chaiHttp);

describe('index page', function() {
    it('exists', function(done) {
        chai.request(app)
            .get('/')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.html;
                done();
            });
    });
});

describe('departments page', function() {
    it('exists', function(done) {
        chai.request(app)
            .get('/')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.html;
                done();
            });
    });
});

describe('lists page', function() {
    it('exists', function(done) {
        chai.request(app)
            .get('/')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.html;
                done();
            });
    });
});

describe('signup page', function() {
    it('exists', function(done) {
        chai.request(app)
            .get('/')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.html;
                done();
            });
    });
});
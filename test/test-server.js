const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const {app} = require('../server');

chai.use(chaiHttp);

describe('index page', function() {
    it('is real', function(done) {
        chai.request(app)
            .get('/')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.html;
                done();
            });
    });
});
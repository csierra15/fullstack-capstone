const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();

const {app} = require('../server');

chai.use(chaiHttp);

describe('server', function() {
    it('should see what\'s in files', function() {
        return chai.request(app)
            .get('/')
            .then(function(res) {
                res.should.have.status(200);
                res.should.be.html;
            });
    });
});
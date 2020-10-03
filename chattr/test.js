let assert = require('assert');
let app = require('./server/server.js');
let chai = require('chai');
let chaiHttp = require('chai-http');
const { describe } = require('mocha');
let should = chai.should();
chai.use(chaiHttp);

// Unit and integration tests for each node.js route
// A positive test case and a negative test case is provided for each route
// In terms of layout: tests are grouped by the main data structure (groups, messages, users etc.)
describe("Node Server Test", function(){
    before(function() {
        console.log("Before test");
    });
    after(function() {
        console.log("After test");
    });

    // Login Tests
    // Test user login works
    describe('/api-login', () => {
        it('should return valid == true and status 200 when user exists', (done) => {
            chai.request(app)
                .post('/api/auth')
                .send({'username': 'user222',
                        'pwd': 'nothing'})
                .end((err, res) => {
                    console.log(res.body);
                    res.should.have.status(200);
                    res.body.should.have.property('valid', true);
                    done();
                });
        });
    });
    // Test login captures bad username/pwd
    describe('/api-login', () => {
        it('should return valid == false', (done) => {
            chai.request(app)
                .post('/api/auth')
                // Random numbers for user fields
                .send({'username':'123890123123', 'pwd':'91023981027450'})
                .end((err, res) => {
                    console.log(res.body);
                    res.body.should.have.property('valid', false);
                    done();
                });
        });
    });
    // Test login captures empty fields
    describe('/api-login', () => {
        it('should return 400 status when no body in request', (done) => {
            chai.request(app)
                .post('/api/auth')
                .send({'username':'', 'pwd':''})
                .end((err, res) => {
                    console.log(res.body);
                    res.should.have.status(400);
                    done();
                });
        });
    });

    // Add Message Tests
    // Test that empty content is captured
    describe('/api-addmessage', () => {
        it('should have status 500 when message has no content', (done) => {
            chai.request(app)
                .post('/api/addmessage')
                .send({})
                .end((err, res) => {
                    res.should.have.status(500);
                    done();
                });
        });
    });



});

    // add tests

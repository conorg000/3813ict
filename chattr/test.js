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

    // Add User Test
    // Test it can add user
    describe('/api-adduser', () => {
        it('should POST new user with status 200 and err == null', (done) => {
            chai.request(app)
                .post('/api/adduser')
                .send({'email': 'test@gmail.com',
                    'username': 'testUser',
                    'id': 99999,
                    'role': 'user',
                    'pwd': 'password01'})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('err', null);
                    done();
                });
        });
    });
    // Test it doesn't add duplicate user
    describe('/api-adduser', () => {
        it('should fail to POST new user if it exists', (done) => {
            chai.request(app)
                .post('/api/adduser')
                .send({'email': 'test@gmail.com',
                    'username': 'testUser',
                    'id': 99999,
                    'role': 'user',
                    'pwd': 'password01'})
                .end((err, res) => {
                    res.body.should.have.property('err', 'duplicate item');
                    done();
                });
        });
    });

    // Delete User Test
    // Test it deletes the user and status 200
    describe('/api-deleteuser', () => {
        it('should POST to delete user and give status 200', (done) => {
            chai.request(app)
                .post('/api/deleteuser')
                .send({'id': 99999})
                .end((err, res) => {
                    //console.log(res.body);
                    res.should.have.status(200);
                    done();
                });
        });
    });

    // Add User to a Room Test
    // Test that empty content is captured
    describe('/api-adduserroom', () => {
        it('should have status 400 when body has no content', (done) => {
            chai.request(app)
                .post('/api/adduserroom')
                .send({'username': ''})
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });   


    // Get Users Test
    // Test it fetches an array of users and status 200
    describe('/api-getusers', () => {
        it('should GET array of users and have status 200', (done) => {
            chai.request(app)
                .get('/api/getusers')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an.instanceOf(Array);
                    done();
                });
        });
    });

    // Get Groups Test
    // Test it fetches an array of groups and status 200
    describe('/api-getgroups', () => {
        it('should GET array of groups and have status 200', (done) => {
            chai.request(app)
                .get('/api/getgroups')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.an.instanceOf(Array);
                    done();
                });
        });
    });

    // Update User Test
    // Test it updates user and status 200
    describe('/api-updateuser', () => {
        it('should POST update existing user and return status 200 and an array', (done) => {
            chai.request(app)
                .post('/api/updateuser')
                .send({'email': 'user22@gmail.com',
                        'username': 'user222',
                        'role': 'super admin',
                        'pwd': 'nothing'})
                .end((err, res) => {
                    res.should.have.status(200);
                    //console.log(res.body);
                    //res.body.should.be.an.instanceOf(Array);
                    done();
                });
        });
    });
    // Test it fails with status 400 if no body
    describe('/api-updateuser', () => {
        it('should fail if any fields are missing', (done) => {
            chai.request(app)
                .post('/api/updateuser')
                .send({'email': ''})
                .end((err, res) => {
                    res.should.have.status(400);
                    done();
                });
        });
    });

    // Add Group Test
    // Test it adds group and status 200
    describe('/api-addgroup', () => {
        it('should POST new group with status 200 and err == null', (done) => {
            chai.request(app)
                .post('/api/addgroup')
                .send({'name': 'unit test group'})
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('err', null);
                    done();
                });
        });
    });
    // Test it doesn't add duplicate group
    describe('/api-addgroup', () => {
        it('should fail to POST new group if it exists', (done) => {
            chai.request(app)
                .post('/api/addgroup')
                .send({'name': 'TestGroup'})
                .end((err, res) => {
                    res.body.should.have.property('err', 'duplicate item');
                    done();
                });
        });
    });


    // Delete Group Test
    // Test it deletes the test group and status 200
    describe('/api-deletegroup', () => {
        it('should POST to delete group and give status 200', (done) => {
            chai.request(app)
                .post('/api/deletegroup')
                .send({'group': {'name': 'unit test group'}})
                .end((err, res) => {
                    //console.log(res.body);
                    res.should.have.status(200);
                    done();
                });
        });
    });
    
    // Add Room Test
    // Test it adds room and status 200
    describe('/api-addroom', () => {
        it('should POST new room with status 200', (done) => {
            chai.request(app)
                .post('/api/addroom')
                .send({'group':{'name': 'TestGroup', 'rooms': [{'name': 'a'}]},
                        'newroom': {'name': 'test room'}})
                .end((err, res) => {
                    res.should.have.status(200);
                    //res.body.should.have.property('err', null);
                    done();
                });
        });
    });
    // Test it doesn't add duplicate room
    describe('/api-addroom', () => {
        it('should fail to POST new room if it exists', (done) => {
            chai.request(app)
                .post('/api/addroom')
                .send({'group':{'name': 'TestGroup', 'rooms': [{'name': 'a'}]},
                        'newroom': {'name': 'a'}})
                .end((err, res) => {
                    res.body.should.have.property('ok', false);
                    done();
                });
        });
    });


    // Delete Room Test
    // Test it deletes the test room and status 200
    describe('/api-deleteroom', () => {
        it('should POST to delete room and give status 200', (done) => {
            chai.request(app)
                .post('/api/deleteroom')
                .send({'group':{'name': 'TestGroup', 'rooms': [{'name': 'a'}, {'name': 'test room'}]},
                'room': {'name': 'test room'}})
                .end((err, res) => {
                    //console.log(res.body);
                    res.should.have.status(200);
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


const request = require("supertest");
const app = require('../server');
const chai = require('chai');

const expect = chai.expect;

describe('Admin Suite', function() {
    /*  
        Test Case 1:
        Admin login

        POST /api/auth/login

        Pre-condition: 
        1) Have an account with ACNAPI

        Post-condition: 
        1) Successfully logged in
    */

    it('Login with Admin, POST /api/auth/login', function(done){

        admin = {
            email: "cyberform.jys@gmail.com",
            password: "MEWMEWMEW"
        };
        request(app)
        .post('/api/auth/login')
        .set('Accept', 'application/json')
        .send(admin)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end((err, res)=> {
            // console.log(res.body)
            expect(res.body.token).is.a('string');
            token = res.body.token;
            
            if (err) return done(err);
            done();
        });
    });

    /*
        Test Case 2:
        View all tickets

        Pre-condition:
        1) Admin account
        2) To show that admin can view all ticket. Need more than 1 account

        Post-condition:
        1) Return all tickets
        2) Check that there are 2 accounts.
    */

   it('View everyone\'s tickets, GET /api/admin/tickets', function(done){
        request(app)
        .get('/api/admin/tickets')
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end((err, res)=> {
            console.log(res.body)
            expect(res.body).to.have.lengthOf(2);
            if (err) return done(err);
            done();
        });
    });

    /*
        Test Case 3:
        Filter tickets by email

        Pre-condition:
        1) Admin account
        2) To show that admin can filter tickets by email. Need more than 1 account
        3) Filtered account has 1 ticket

        Post-condition:
        1) Return 1 ticket
        2) Check if returned json has the same email address of the filter.
    */

    it('Filter ticket by email, GET /api/admin/tickets?email=seeyijie.74@gmail.com', function(done){
        request(app)
        .get('/api/admin/tickets?email=seeyijie.74@gmail.com')
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end((err, res)=> {
            console.log(res.body)
            expect(res.body.email).to.equal('seeyijie.74@gmail.com');
            expect(res.body.tickets).to.have.lengthOf(1);
            if (err) return done(err);
            done();
        });
    });


});

const request = require("supertest");
const app = require('../server');
const chai = require('chai');
const sinon = require('sinon');
const {createUserAccount} = require('./testHelper');

const expect = chai.expect;
const should = chai.should;


describe('GET /', function(){
    it('successfully get main page', (done)=> {
      request(app)
        .get('/')
        .expect(200, done());
    });
});



describe('Non-Admin Suite', function() {

    before(function(done){
        User.deleteMany({}, (err,res)=> console.log(`Collection cleared! ${res.deletedCount} documents are deleted.`))
            .then(res => createUserAccount())
            .then(res => done())
            .catch(err => done(err));
    });

    /* 
        Test Case 1:
        First time user submitting a ticket
        POST /api/auth/register

        Pre-condition: 
        1) No records in database

        Post-condition:
        1) Records found in database
    */
    it.skip('Submitting of contact form', function(done) {
        nonAdmin = {
            name: "Yi Jie",
            email: "seeyijie.94@gmail.com",
            contact: "91312374",
            isAdmin: false,
            tickets: {
                label: "API Demo Services",
                content: "Hi I would like to request a demo for this API",
                status: "new"
            }
        };
        request(app)
            .post('/api/auth/register')
            .send(nonAdmin)
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .end((err, res)=> {
            if (err) return done(err);
            
            // Client side should handle the validation
            expect(res.body["contact"]).to.have.lengthOf(8);
            expect(res.body["tickets"][0]["content"]).to.have.lengthOf.above(14);
            expect(res.body["tickets"][0]["content"]).to.have.lengthOf.at.most(300);
            expect(res.body["name"]).to.equal(nonAdmin.name);
            expect(res.body["isEmailSent"]).to.be.true;
            done();
        });
    });


    /*  
        Test Case 2: 
        Non-admin login

        POST /api/auth/login

        Pre-condition: 
        1) Have an account with ACNAPI

        Post-condition: 
        1) Successfully logged in
    */
    it('Login with POST /api/auth/login', function(done){

        nonAdmin2 = {
            email: "seeyijie.74@gmail.com",
            password: "MEWMEWMEW"
        };
        request(app)
        .post('/api/auth/login')
        .set('Accept', 'application/json')
        .send(nonAdmin2)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end((err, res)=> {
            console.log(res.body)

            expect(res.body.token).is.a('string');
            token = res.body.token;
            
            if (err) return done(err);
            done();
        });
    });

    /*  
        Test Case 3
        View all tickets from the user
        GET /api/auth/current

        Pre-condition:
        1) Got the JWT token

        Post condition:
        1) See all tickets belonging to the user
    */
    it('View his/her own ticket with GET /api/auth/current', function(done){

        nonAdmin2 = {
            email: "seeyijie.74@gmail.com",
            password: "MEWMEWMEW"
        };
        request(app)
        .get('/api/auth/current')
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end((err, res)=> {
            // console.log(res.body);
            expect(res.body.tickets).to.have.lengthOf(1);
            if (err) return done(err);
            done();
        });
    });

    /*  
        Test Case 4
        Attempts to access protected route meant for admin
        GET /api/admin tickets

        Pre-condition:
        1) Have their JWT token

        Post-condition:
        1) Forbidden 403. Do not have the permission.
    */
    it('Attempts to access protected route', function(done){
        request(app)
        .get('/api/admin/tickets')
        .set('Authorization', token)
        .expect(403)
        .end((err, res)=> {
            if (err) return done(err);
            done();
        });
    })
    /*  
        Test Case 5
        Creates new ticket
        POST /api/tickets

        Pre-condition:
        1) Have their JWT token

        Post-condition:
        1) Expect 2 tickets to be in the database. 
           First ticket was upon automatic creation of ACNACPI account.
    */

    it('Creates new ticket', function(done){
        newTicket = {
            label: "demo",
            content: "Hi I would like to try the sandbox chatbot API for PwC Singapore"
        }
        request(app)
        .post('/api/tickets')
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .send(newTicket)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end((err, res)=>{
            expect(res.body.tickets).to.have.lengthOf(2); // Added one more document into MongoDB
            if (err) return done(err);
            done();
        })

    })

});

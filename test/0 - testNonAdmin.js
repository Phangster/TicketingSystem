const request = require("supertest");
const app = require('../server');
const chai = require('chai');
const mongoose = require('mongoose');

const expect = chai.expect;

describe('GET /', function(done){
    it('successfully get main page', (done)=> {
      request(app)
        .get('/')
        .expect(200, done());
    });
});



describe('Non-Admin Suite', function() {
    /* 
        Test Case 1:
        First time user submitting a ticket
        POST /api/auth/register
        Pre-condition: 
        1) No records in database
        Post-condition:
        1) Records found in database
    */


    it('Submitting of contact form', function(done) {

        // afterEach("Submitting of contact form", function(){
        //     User.findOneAndDelete({email: "seeyijie.94@gmail.com"}, (err, res)=> console.log(`${res} documents are deleted.`))
        // });    
        userId = new mongoose.Types.ObjectId();

        nonAdmin = {
            _id: userId,
            name: "See Yi Jie",
            email: "seeyijie.94@gmail.com",
            contact: "91312374",
            isAdmin: false,
        };

        ticket = {
            userId:userId,
            name: "See Yi Jie",
            email: "seeyijie.94@gmail.com",
            label: "API Demo Services",
            content: "Hi I would like to request a demo for this API",
            status: "new"

        }
        request(app)
            .post('/api/auth/register')
            .send(nonAdmin)
            .send(ticket)
            .set('Accept', 'application/json')
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .end((err, res)=> {
            if (err) return done(err);
                // console.log(res.body)
                // Client side should handle the validation
                expect(res.body["name"]).to.equal(nonAdmin.name);
                // expect(res.body["isEmailSent"]).to.be.true;
                done();
            });
    });


    /*  
        Test Case 2: 
        Non-admin login with seeyijie.74@gmail.com
        POST /api/auth/login
        Pre-condition: 
        1) Have an account with ACNAPI
        Post-condition: 
        1) Successfully logged in
    */
    it('Login with User, POST /api/auth/login', function(done){

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
            // console.log(res.body)
            expect(res.body.token).is.a('string');

            // JWT token saved to be used for the subsequent test cases
            token = res.body.token;
            
            if (err) return done(err);
            done();
        });
    });

    /*  
        Test Case 3
        View all tickets from the user (seeyijie.74@gmail.com)
        GET /api/tickets
        Pre-condition:
        1) Got the JWT token
        Post condition:
        1) See all tickets belonging to the user

        Never view comments in that particular ticket?
    */
    it('View his/her own ticket with GET /api/tickets', function(done){

        nonAdmin2 = {
            email: "seeyijie.74@gmail.com",
            password: "MEWMEWMEW"
        };
        request(app)
        .get('/api/tickets')
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end((err, res)=> {
            // console.log(res.body);
            expect(res.body).to.have.lengthOf(1);
            if (err) return done(err);
            done();
        });
    });

    /*  
        Test Case 4
        Attempts to access protected route meant for admin
        GET /api/admin/tickets
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
        Creates new ticket (seeyijie.74@gmail.com)
        POST /api/tickets
        Pre-condition:
        1) Have their JWT token
        Post-condition:
        1) Expect 2 tickets to be in the database. 
           First ticket was upon automatic creation of ACNACPI account.
    */

    it('Creates new ticket', function(done){
        newTicket = {
            label: "API Demo Services",
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
            expect(res.body.content).is.eql(newTicket.content);
            expect(res.body.label).is.eql(newTicket.label);
            expect(res.body.email).is.eql("seeyijie.74@gmail.com")
            if (err) return done(err);
            done();
        })

    })

    it('Add new comments to ticket', function(done){
        
        comment = {
            message: "I would also be interested in enterprise solution and follow up support",
            content: "Hi I would like to try the sandbox chatbot API for PwC Singapore"
        }
        request(app)
        .post('/api/comments')
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .send(comment)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end((err, res)=>{
            console.log(res.body)
            // assert ticketId if possible
            expect(res.body.name).to.eql("Yi Jie");
            expect(res.body.message).to.eql("I would also be interested in enterprise solution and follow up support");
            if (err) return done(err);
            done();
            
        })

    })

    it('View all comments of a ticket with that content name' , function(done){
        // ticket = {
        //     content: "Hi I would like to try the sandbox chatbot API for PwC Singapore"
        // }
        // where content is used as a query string
        // /api/comments?content=Hi I would like to try the sandbox chatbot API for PwC Singapore
        // Fill up the space with %20 automatically
        request(app)
        .get('/api/comments?content=Hi%20I%20would%20like%20to%20try%20the%20sandbox%20chatbot%20API%20for%20PwC%20Singapore')
        .set('Accept', 'application/json')
        .set('Authorization', token)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end((err, res)=>{
            expect(res.body).to.have.lengthOf(1);
            expect(res.body).to.be.an('array');
            // assert ticketId if possible
            if (err) return done(err);
            done();
            
        })

    })

});

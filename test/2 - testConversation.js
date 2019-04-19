const request = require("supertest");
const app = require('../server');
const chai = require('chai');
const User = require('../models/User');
const Ticket = require('../models/Ticket');

const expect = chai.expect;

describe('Conversation Suite', function() {

    // Only admin can subscribe to a ticket
    // User will be notified automatically when an admin message
    // Obtained adminToken for admin operations
    it('Successful admin login', function(done){
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
            adminToken = res.body.token;
            
            if (err) return done(err);
            done();
        });
    })

    // User login. Obtained userToken for user operations
    it('Successful user login', function(done){
        user = {
            email: "seeyijie.74@gmail.com",
            password: "MEWMEWMEW"
        };
        request(app)
        .post('/api/auth/login')
        .set('Accept', 'application/json')
        .send(user)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end((err, res)=> {
            // console.log(res.body)
            expect(res.body.token).is.a('string');
            userToken = res.body.token;
            
            if (err) return done(err);
            done();
        });
    })


    // Admin (cyberform.jys@gmail.com) has subscribed to the ticket owned by the user (seeyijie.74@gmail.com)
    it('Add subscription, POST /api/admin/subscribe' , function(done){
        subscribing = {
            content: "Hello,I would like to find out more about the API for chat bots and databases for a new project.Regards,Tom Lee",
            email: "seeyijie.74@gmail.com"
        }

        request(app)
        .post('/api/admin/subscribe')
        .set('Accept', 'application/json')
        .set('Authorization', adminToken)
        .send(subscribing)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end((err, res)=> {
            expect(res.body).to.be.an('object'); // return an object of the previous user state if it is successful.
            if (err) return done(err);
            done();
        });
    })

    // Admin (cyberform.jys@gmail.com) has adds comment to the ticket owned by the user (seeyijie.74@gmail.com) 
    it('Admin added a comment to ticket', function(done){
        comment = {
            content: "Hello,I would like to find out more about the API for chat bots and databases for a new project.Regards,Tom Lee",
            message: "Sure. Will you be free later at 1pm? I can share with you over lunch"
        }

        request(app)
        .post('/api/comments')
        .set('Accept', 'application/json')
        .set('Authorization', adminToken)
        .send(comment)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end((err, res)=>{
            expect(res.body.message).to.eql(comment.message);
            if (err) return done(err);
            done();
        })
    })

    // User (seeyijie.74@gmail.com) logins and check his ticket after receiving an email notification about it
    it('User checks his ticket and comments', function(done){
        request(app)
        .get('/api/tickets')
        .set('Authorization', userToken)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end((err, response)=>{

            // Check comments
            request(app)
            .get('/api/comments?content=Hello,I would like to find out more about the API for chat bots and databases for a new project.Regards,Tom Lee')
            .set('Authorization', userToken)
            .expect('Content-Type', 'application/json; charset=utf-8')
            .expect(200)
            .end((err, res)=>{

                // Checks comment
                expect(res.body).is.an("array").lengthOf(1);

                // Checks ticket 
                expect(response.body[0].status).is.eql("awaitUser");
                expect(response.body[0].subscribedBy).is.an("array").lengthOf(1);    

                if (err) return done(err);
                done();
            });
        });
    });

    // Admin should receive email
    it('User reply (comment) to the ticket' , function(done){
        userReply = {
            content: "Hello,I would like to find out more about the API for chat bots and databases for a new project.Regards,Tom Lee",
            message: "Okay. See you!"
        }
        request(app)
        .post('/api/comments')
        .set('Accept', 'application/json')
        .set('Authorization', userToken)
        .send(userReply)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end((err, res)=>{
            expect(res.body.message).is.eql(userReply.message);
            if (err) return done(err);
            done();
        });
    });

    it('Unsubscribe to ticket, POST /api/admin/unsubscribe', function(done){
        unsubscribing = {
            content: "Hello,I would like to find out more about the API for chat bots and databases for a new project.Regards,Tom Lee",
            email: "seeyijie.74@gmail.com"
        }

        request(app)
        .post('/api/admin/unsubscribe')
        .set('Accept', 'application/json')
        .set('Authorization', adminToken)
        .send(unsubscribing)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end((err, res)=> {
            expect(res.body).to.be.an('object'); // return an object of the previous user state if it is successful.
            if (err) return done(err);
            done();
        });

    })

});
const request = require("supertest");
const chai = require("chai");
const app = require('../server');
const User = require('../models/User');
const {createUserAccount, createAdminAccount} = require('./testHelper');
const isEmpty = require('../validation/is-empty');

// const assert = chai.assert;
// const bcrypt = require('bcryptjs');
const expect = chai.expect;

before(function(){
  // Delete all documents
  User.deleteMany({}, (err,res)=> {
    console.log(`Collection cleared! ${res.deletedCount} documents are deleted.`);
  })
  // For: 'userB: POST /login'
  createUserAccount();
  createAdminAccount();
})

describe('GET /', function(){
    it('successfully get main page', (done)=> {
      request(app)
        .get('/')
        .expect(200, done);
    });
});

// Test if email is sent
describe.skip('userA: POST /register', function() {
  it('submitting of contact form', function(done) {
    userA = {
      name: "Yi Jie",
      email: "cyberform.jys@gmail.com",
      contact: "91312374",
      tickets: {
          label: "API Demo Services",
          content: "Hi I would like to request a demo for this API",
          status: "new"
        }
      };
    request(app)
      .post('/api/auth/register')
      .send(userA)
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .end((err, res)=> {
        if (err) return done(err);
        
        // Client side should handle the validation
        expect(res.body["contact"]).to.have.lengthOf(8);
        expect(res.body["tickets"][0]["content"]).to.have.lengthOf.above(14);
        expect(res.body["tickets"][0]["content"]).to.have.lengthOf.at.most(300);
        expect(res.body["name"]).to.equal(userA.name);
        expect(res.body["isEmailSent"]).to.be.true;
        done();
      });
  });
});


describe('userB: POST /login', function(){
  it('submitting of contact form', function(done) {
    userB = {
      email: "tomlee.abc@gmail.com",
      password: "MEWMEWMEW"
};
  request(app)
    .post('/api/auth/login')
    .send(userB)
    .set('Accept', 'application/json')
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200)
    .end((err, res)=> {
      // console.log("\n\nHeader is: ")
      // console.log(res)
      if (err) return done(err);
      done();
    });
  });
});


describe('Admin Test Suite', function(){
  let token = "";
  it('Test login',function(done){
    adminAccount = {
      email: "seeyijie.74@gmail.com",
      password: "MEWMEWMEW"
    };
    request(app)
      .post('/api/auth/login')
      .send(adminAccount)
      .set('Accept', 'application/json')
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect(200)
      .end((err, res)=> {
        // console.log(res.body);
        expect(res.body.token).to.be.a('string')
        // assertTrue(res.body.token, !isEmpty)
        token = res.body.token
        if (err) return done(err);
        done();
      });
    })

  it('Test accesing protected route', function(done){
    request(app)
    .get('/api/auth/test2')
    .set('Authorization', token)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200)
    .end((err, res)=> {
      console.log(res.body)
      if (err) return done(err);
      done();
    });
  })

  it('Test for GET /api/admin/tickets to search for all tickets'), function(done){
    request(app)
    .get('/api/admin/tickets')
    .set('Authorization', token)
    // .expect('Content-Type', 'application/json; charset=utf-8')
    .expect(200)
    .end((err, res)=> {
      console.log(res);
      if (err) return done(err);
      done();
    });
  }
});
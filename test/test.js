// const request = require("supertest");
// const chai = require("chai");
// const app = require('../server');
// const User = require('../models/User');
// const {createUserAccount, createAdminAccount} = require('./testHelper');
// const chaiAsPromised = require('chai-as-promised');

// const expect = chai.expect;

// chai.use(chaiAsPromised);

// let setUpUserAccount = () => {
//   before(function(done){
//     // Delete all documents
//     User.deleteMany({}, (err,res)=> {
//       console.log(`Collection cleared! ${res.deletedCount} documents are deleted.`);
//     })
//       .then(createUserAccount())
//       .then(done())
//   })
// }

// let setUpAdminAccount = () => {
//   before(function(done){
//     // createAdminAccount();
//     // Delete all documents
//     User.deleteMany({}, (err,res)=> {
//       console.log(`Collection cleared! ${res.deletedCount} documents are deleted.`);
//     })
//       .then(createAdminAccount())
//       .then(done())
//   })
// }

// describe('GET /', function(){
//     it('successfully get main page', (done)=> {
//       request(app)
//         .get('/')
//         .expect(200, done());
//     });
// });

// /*
//     Scenario 1:
//     First time user submitting a ticket
//     POST /api/auth/register

//     Pre-condition: 
//     1) No records in database

//     Post-condition: 
//     1) Records found in database
// */
// describe.skip('userA: POST /register', function() {
//   it('submitting of contact form', function(done) {
//     userA = {
//       name: "Yi Jie",
//       email: "seeyijie.94@gmail.com",
//       contact: "91312374",
//       tickets: {
//           label: "API Demo Services",
//           content: "Hi I would like to request a demo for this API",
//           status: "new"
//         }
//       };
//     request(app)
//       .post('/api/auth/register')
//       .send(userA)
//       .set('Accept', 'application/json')
//       .expect('Content-Type', 'application/json; charset=utf-8')
//       .expect(200)
//       .end((err, res)=> {
//         if (err) return done(err);
        
//         // Client side should handle the validation
//         expect(res.body["contact"]).to.have.lengthOf(8);
//         expect(res.body["tickets"][0]["content"]).to.have.lengthOf.above(14);
//         expect(res.body["tickets"][0]["content"]).to.have.lengthOf.at.most(300);
//         expect(res.body["name"]).to.equal(userA.name);
//         expect(res.body["isEmailSent"]).to.be.true;
//         done();
//       });
//   });
// });

// /*  
//     User test suite

//     Scenario 2a: 
//     Non-admin login and view all tickets using

//     POST /api/auth/login
//     GET /api/auth/current

//     Pre-condition: 
//     1) Have an account with ACNAPI

//     Post-condition: 
//     1) Successfully logged in
//     2) Successfully view all their tickets
// */

// /*
//     Not implemented:
//     Scenario 2b:
//     Attempt to access admin API routes (view all user tickets & update ticket statuses)

//     POST /api/auth/login
//     GET /api/admin/tickets
//     PUT /api/admin/tickets

//     Pre-condition:
//     1) isAdmin: false
//     2) Has an account

//     Post-condition:
//     1) Return error 403 for each route.
// */
// describe('Non-admin logging in', function(){
//   setUpUserAccount();
//   it('Non-admin: POST /api/auth/login', function(done) {
//     userB = {
//       email: "seeyijie.74@gmail.com",
//       password: "MEWMEWMEW"
//     };
//     request(app)
//       .post('/api/auth/login')
//       .set('Accept', 'application/json')
//       .send(userB)
//       .expect('Content-Type', 'application/json; charset=utf-8')
//       .expect(200)
//       .end((err, res)=> {
//         // console.log(res)
//         if (err) return done(err);
//         done();
//       });
//   });
// });

// /*  
//     Admin test suite

//     Scenario 3a:
//     Login and view of ALL user tickets

//     POST /api/auth/login
//     GET /api/admin/tickets

//     Pre-condition: 
//     1) Has an account with ACNAPI
//     2) isAdmin: true

//     Post-condition:
//     1) Successfully logged in
//     2) View ALL tickets.

//     Scenario 3b:
//     Admin test suite: See ALL tickets by email

//     POST /api/auth/login
//     GET /api/admin/tickets

//     Pre-condition:
//     1) Have an account with ACNAPI
//     2) isAdmin: true

//     Post-condition:
//     1) Successfully logged in 
//     2) View ALL tickets.

//     Scenario 3c:
//         Admin test suite: See ALL tickets by email

//     POST /api/auth/login
//     GET /api/admin/tickets

//     Pre-condition:
//     1) Have an account with ACNAPI
//     2) isAdmin: true

//     GET /api/admin/tickets?email=cyberform.jys@gmail.com

//     Post-condition:
//     1) Successfully logged in 
//     2) View ALL tickets.

// */
// describe('Admin Test Suite', function(){
//   setUpAdminAccount();
//   let token = "";
//   it('Admin login',function(done){
//     adminAccount = {
//       email: "cyberform.jys@gmail.com",
//       password: "MEWMEWMEW"
//     };
//     request(app)
//       .post('/api/auth/login')
//       .set('Accept', 'application/json')
//       .send(adminAccount)
//       .expect('Content-Type', 'application/json; charset=utf-8')
//       .expect(200)
//       .expect(res => {
//         expect(res.body.token).to.be.a('string');
//       })
//       .end((err, res)=> {
//         if (err) return done(err);
//         done();
//       });
//   })

//   it('Test for GET /api/admin/tickets to search for all tickets', function(done){
//     request(app)
//     .get('/api/admin/tickets')
//     // .buffer(true)
//     .set('Accept', 'application/json')
//     .set('Authorization', token)
//     // .expect('Content-Type', 'application/json; charset=utf-8')
//     .expect(200)
//     .expect(res => {
//       expect(res.body.length).to.equal(2);
//     })
//     .end((err, res)=> {  
//       if (err) return done(err);
//       done();
//     });
//   })

//   it.skip('Test for GET /api/admin/tickets?seeyijie.74@gmail.com to filter for tickets', function(done){
//     request(app)
//     .get('/api/admin/tickets?email=seeyijie.74@gmail.com')
//     // .buffer(true)
//     .set('Accept', 'application/json')
//     .set('Authorization', token)
//     .expect('Content-Type', 'application/json; charset=utf-8')
//     .expect(200)
//     .end((err, res)=> {  
//       // let tickets = new Promise(function(resolve, reject){
//       //   resolve(res.body.length)
//       // })
//       // tickets
//       //   .then(tickets => {
//       //     expect(tickets).to.equal(1); // Check the array has 1 total tickets (from non-admin tomlee)
//       //     done();
//       // })
//       //   .catch(err => done(err));

//       if (err) return done(err);
//       console.log("Body length is: " + res.body.length)
//       done()
//     });
//   })

// });
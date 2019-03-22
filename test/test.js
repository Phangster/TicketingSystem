const request = require("supertest");
const chai = require("chai");
const app = require('../server');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

const assert = chai.assert;
const expect = chai.expect;

before(done=>{

  // Delete all documents
  User.deleteMany({}, (err,res)=> {
    console.log(`Collection cleared! ${res.deletedCount} documents are deleted.`);
  })

  // Creating a fake user
  userB = {
    name: "Tom Lee",
    email: "tomlee.abc@gmail.com",
    contact: "91234567",
    access: "user",
    tickets: [
      {
        status: "new",
        content: "I want to have access to the API demo!",
        label:"API Demo Services"
      }
    ],
    password: "MEWMEWMEW"
  }

  // Encrypting the password and editing it
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(userB.password, salt, (err, hash)=>{
        if (err) throw err;
        userB.password = hash;
        console.log(hash)
        User.create(userB).then(res => console.log(res)).catch(err => console.log(err))

    });
});


  done();
})

  
describe('GET /', ()=> {
    it('successfully get main page', (done)=> {
        request(app)
            .get('/')
            .expect(200, done);
    });
});

// Test if email is sent
describe('userA: POST /register', ()=> {
    it('submitting of contact form', (done)=> {
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
        .post('/api/users/register')
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

  describe('userA: POST /login', ()=> {
    it('submitting of contact form', (done)=> {
      userB = {
        email: "tomlee.abc@gmail.com",
        password: "MEWMEWMEW"
  };
      request(app)
        .post('/api/users/login')
        .send(userB)
        .set('Accept', 'application/json')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .end((err, res)=> {
          if (err) return done(err);
          done();
        });
    });
  });

  /*
    Test all the validators.
    Test display of errors.
  */
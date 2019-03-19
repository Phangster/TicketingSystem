const request = require("supertest");
const app = require('../server');
const User = require('../models/User');

before(done=>{
  User.deleteMany({}, (err,res)=> {
    console.log(`Collection cleared! ${res.deletedCount} documents are deleted.`);
  })
  done();
})

  
describe('GET /', function () {
    it('successfully get main page', function (done) {
        request(app)
            .get('/')
            .expect(200, done);
    });
});

describe('POST /register', function() {
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
        .post('/api/users/register')
        .send(userA)
        .set('Accept', 'application/json')
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200)
        .expect(res => console.log(res))
        // .expect(userA.contact.length == 8)
        .end(function(err, res) {
          if (err) return done(err);
          done();
        });
    });
  });

  
  
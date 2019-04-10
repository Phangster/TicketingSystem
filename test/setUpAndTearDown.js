const sinon = require('sinon');
const User = require('../models/User');
const Ticket = require('../models/Ticket');
const Comment = require('../models/Comment');
const {createAdminAccount, createUserAccount} = require('./testHelper');

let sandbox;

before(function(done){
    User.deleteMany({}, (err,res)=> console.log(`User collection cleared! ${res.deletedCount} documents are deleted.`))
        .then(res=> {
            return Ticket.deleteMany({})
                .catch(err=>console.log(err))
        })
        .then(res=>{
            return Comment.deleteMany({})
                .catch(err=>console.log(err))
        })
        .then(res => createUserAccount())
        .then(res => createAdminAccount())
        .then(res => done())
        .catch(err => done(err));
});

// beforeEach(function(){
//     console.log("Sandbox created")
//     sandbox = sinon.createSandbox();
// })

// afterEach(function(){
//     sandbox.restore();
// })

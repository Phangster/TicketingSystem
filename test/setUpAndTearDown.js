const sinon = require('sinon');
const User = require('../models/User');
const Ticket = require('../models/Ticket');
const {createAdminAccount, createUserAccount} = require('./testHelper');

let sandbox;

before(function(done){
    User.deleteMany({}, (err,res)=> console.log(`Collection cleared! ${res.deletedCount} documents are deleted.`))
        .then(res=> {
            Ticket.deleteMany({}).then((err,res)=>console.log(res)).catch(err=>console.log(err))
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

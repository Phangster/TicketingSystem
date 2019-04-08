const sinon = require('sinon');

let sandbox;

beforeEach(function(){
    console.log("Sandbox created")
    sandbox = sinon.createSandbox();
})

afterEach(function(){
    sandbox.restore();
})

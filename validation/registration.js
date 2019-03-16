const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validateRegisterInput=(data)=>{
    let errors = {};

    // console.log(data.ticket.content);

    // if data.name is not empty, it is just data.name. Otherwise, it will be an empty string.
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.contact = !isEmpty(data.contact) ? data.contact : '';
    // data.ticket.content = isEmpty(data.inputMessage) ? data.ticket.content : '';


    if (!Validator.isLength(data.name, {min:2, max:30})){
        errors.name = 'Name must be between 2 and 30 characters';
    }

    if (!Validator.isEmail(data.email)){
        errors.email = 'Email is invalid';
    }

    if (!Validator.isNumeric(data.contact,{no_symbols:true})	){
        errors.contact = 'Key in a valid contact number';
    }

    if (!Validator.isLength(data.contact,{min:7})	){
        errors.contact = 'Key in a valid contact number';
    }

    // if (data.inputMessage === undefined || data.inputMessage === ""){
    //     // errors.inputMessage = 'You cannot leave this section blank';
    //     console.log(errors.inputMessage)
    //     console.log(data.inputMessage === undefined)
    // }



    return {
        errors,
        isValid: isEmpty(errors)
    }
}
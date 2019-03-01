const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validateRegisterInput=(data)=>{
    let errors = {};

    // if data.name is not empty, it is just data.name. Otherwise, it will be an empty string.
    data.name = !isEmpty(data.name) ? data.name : '';
    data.email = !isEmpty(data.email) ? data.email : '';
    data.contact = !isEmpty(data.contact) ? data.contact : '';

    if (!Validator.isLength(data.name, {min:2, max:30})){
        errors.name = 'Name must be between 2 and 30 characters!';
    }

    if (!Validator.isEmail(data.email)){
        errors.email = 'Email is invalid';
    }

    if (!Validator.isNumeric(data.contact,{no_symbols:true})	){
        errors.contact = 'Key in a valid contact number!';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
}
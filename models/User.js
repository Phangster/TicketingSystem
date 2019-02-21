const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    enquiry: {
        type: Array,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    access: {
        type: String,
        default: 'user'
    }
});

module.exports = User = mongoose.model('users', UserSchema);
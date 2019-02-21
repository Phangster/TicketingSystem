const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const generator = require('generate-password');

// Load User model:
const User = require('../../models/User');

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({msg: 'Users works!'}));

// @route   POST api/users/register
// @desc    Register users
// @access  Public
router.post('/register', (req, res) => {
    User.findOne({email:req.body.email}).then(user => {
        if (user) {
            return res.status(400).json({email: "Email already exists"});

        } else {

            let password = generator.generate({
                length: 10,
                numbers: true
            });

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: password,
                contact: req.body.contact,
                enquiry: req.body.enquiry
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash)=>{
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

module.exports = router;
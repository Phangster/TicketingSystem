const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const generator = require('generate-password');
const passport = require('passport');
const sendgrid = require('../../services/sendgrid');

// Load Input Validation:
const validateRegisterInput = require('../../validation/registration');
const validateLoginInput = require('../../validation/login');


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

    const {errors, isValid} = validateRegisterInput(req.body);

    // Check Validation
    if (!isValid){
        return res.status(400).json(errors);
    }

    User.findOne({email:req.body.email}).then(user => {
        console.log("Register!")
        if (user) {
            return res.status(400).json({email: "Email already exists"});

        } else {

            const password = generator.generate({
                length: 10,
                numbers: true
            });

            // Sent this via email
            console.log(password);

            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: password,
                contact: req.body.contact,
                tickets: req.body.tickets
            });

            sendgrid(newUser.email, password);

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash)=>{
                    if (err) throw err;
                    newUser.password = hash;
                    newUser
                        .save()
                        .then(user => {
                            res.json(user)
                        })
                        .catch(err => console.log(err));
                });
            });
        }
    });
});

// @route   GET api/users/login
// @desc    Login User / Returning JWT Token
// @access  Public
router.post('/login', (req,res) => {
    const {errors, isValid} = validateLoginInput(req.body);

    // Check Validation
    if (!isValid){
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    // Find user
    User.findOne({email})
        .then(user => {
            if (!user){
                errors.email = "User not found!"
                return res.status(404).json(errors);
            }
            
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        // User Matched
                        const payload = {id: user.id, name: user.name} // Create JWT payload
                        
                        // Sign Token
                        jwt.sign(
                            payload, 
                            keys.secretOrKey, 
                            {expiresIn: 3600},
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                });
                        });

                    } else {
                        errors.password = "Password incorrect!"
                        return res.status(400).json(errors);
                    }
                });
        });
});

// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    // res.json(req.user);
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        contact: req.user.contact,
        enquiry: req.user.enquiry
    });
});

// @route   GET api/users/home
// @desc    Home page of user
// @access  Successfully login users

router.get('/home', (req,res) => {
    res.render()
})


module.exports = router;
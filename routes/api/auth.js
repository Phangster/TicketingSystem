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

// @route   GET api/auth/test
// @desc    Tests auth route
// @access  Protected

router.get('/test2', (req, res) => {
    jwt.verify(req.token, 'privatekey', (err, authorizedData) => {
        if(err){
            //If error send Forbidden (403)
            console.log('ERROR: Could not connect to the protected route');
            res.sendStatus(403);
        } else {
            //If token is successfully verified, we can send the autorized data 
            res.json({
                message: 'Successful log in',
                authorizedData
            });
            console.log('SUCCESS: Connected to protected route');
        }
    });
})


router.get('/test', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({msg: 'this works!'});
})

// @route   POST api/auth/register
// @desc    Register auth
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
            return res.status(601).send({ success: false, msg: "Email already exist" });
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
                tickets: req.body.tickets,
                isEmailSent: false
            });

            sendgrid(newUser.email, password);

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash)=>{
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.isEmailSent = true;
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

// @route   POST api/auth/login
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
                        const payload = {id: user.id, email: user.email, tickets: user.tickets, isAdmin: user.isAdmin} // Create JWT payload
                        
                        // Sign Token
                        jwt.sign(
                            payload, 
                            keys.secretOrKey, 
                            // {expiresIn: 3600},
                            (err, token) => {
                                res.json({
                                    success: true,
                                    token: 'Bearer ' + token
                                });

                                res.header('Authorization', 'Bearer ' + token).send(token);

                        });


                    } else {
                        errors.password = "Password incorrect!"
                        return res.status(400).json(errors);
                    }
                });
        });
});

// @route   GET api/auth/current
// @desc    Return current user
// @access  Private
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    // res.json(req.user);
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        contact: req.user.contact,
        tickets: req.user.tickets
    });

    User.findOne({email: req.user.email})
        .then(user => console.log(user))

    res.send(req.user.name)
});

// @route   GET api/auth/home
// @desc    Home page of user
// @access  Successfully login

router.get('/home', (req,res) => {
    res.render()
})


module.exports = router;
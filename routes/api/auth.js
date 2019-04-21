const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const generator = require('generate-password');
const passport = require('passport');
const {sendgridWelcome} = require('../../services/sendgrid');
const jwt_decode = require('jwt-decode');
const mongoose = require('mongoose');
// Load Input Validation:
const validateRegisterInput = require('../../validation/registration');
const validateLoginInput = require('../../validation/login');


// Load model:
const User = require('../../models/User');
const Ticket = require('../../models/Ticket');

// @route   GET api/auth/test
// @desc    Tests auth route. Sanity check.
// @access  Protected

router.get('/test2', (req, res) => {
    const decoded = jwt_decode(req.headers.authorization)
    // console.log(decoded)
    // console.log("Admin Status: " + decoded.isAdmin)
    if (decoded.isAdmin === false){
        res.sendStatus(401);
        // console.log(decoded.isAdmin)
    }
    else{
        res.json({"msg": "Welcome Mr Admin"})
    }
})


// @route   POST api/auth/register
// @desc    Register auth.
// @params  Need these in body: name, email, contact, label, content
// @access  Public
router.post('/register', (req, res) => {

    const {errors, isValid} = validateRegisterInput(req.body);

    // Check Validation
    if (!isValid){
        return res.status(400).json(errors);
    }

    User.findOne({email:req.body.email.toLowerCase()}).then(user => {
        // console.log("Register!")
        if (user) {
            return res.status(601).send({ success: false, msg: "Email already exist" });
        } 
        else {
                const password = generator.generate({
                    length: 10,
                    numbers: true
                });

                // Sent this via email
                // console.log(password);

                userId = new mongoose.Types.ObjectId();
                // ticketId = new mongoose.Types.ObjectId();

                const newUser = new User({
                    _id: userId,
                    name: req.body.name,
                    email: req.body.email.toLowerCase(),
                    password: password,
                    contact: req.body.contact,
                    isEmailSent: false
                });

                const newTicket = new Ticket({
                    userId: userId,
                    name: req.body.name,
                    email: req.body.email.toLowerCase(),
                    content: req.body.content,
                    label: req.body.label,
                })

                // console.log(newTicket)

                sendgridWelcome(newUser.email, password);

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
                        newTicket
                            .save()
                            .then(ticket => res.json(ticket))
                            .catch(err=>console.log(err));
                    });
                });

            // newTicket.save()
            // .then(ticket=> {
            //     res.json(ticket)
            // })
            // .catch(err=>console.log(err))

        }
    });
});

// @route   POST api/auth/login
// @desc    Login User / Returning JWT Token
// @params  Requires username and password in body
// @access  Public
router.post('/login', (req,res) => {
    const {errors, isValid} = validateLoginInput(req.body);

    // Check Validation
    if (!isValid){
        return res.status(400).json(errors);
    }

    const email = req.body.email.toLowerCase();
    const password = req.body.password;
    console.log(email)
    // Find user
    User.findOne({email})
        .then(user => {
            if (!user){
                errors.email = "User not found!"
                return res.status(404).json(errors);
            }
            else {
                bcrypt
                    .compare(password, user.password)
                    .then(isMatch => {
                        if (isMatch){
                            // User Matched
                            // Create JWT payload
                            const payload = {
                                id: user.id,
                                name: user.name,
                                email: user.email,
                                isAdmin: user.isAdmin
                            }
                            // Sign Token
                            jwt.sign(
                                payload, 
                                keys.secretOrKey, 
                                {expiresIn: 3600},
                                (err, token) => {
                                    res.json({
                                        success: true,
                                        token: 'Bearer ' + token,
                                        isAdmin: user.isAdmin
                                    });

                                    res.header('Authorization', 'Bearer ' + token).send(token);
                                });
                        } 
                        else {
                            errors.password = "Password incorrect!"
                            return res.status(400).json(errors);
                        }
                        
                });
            }
    });
});

// @route   GET api/auth/current
// @desc    Return current user
// @params  No params required
// @access  Private
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    // console.log(req)
    // res.json(req.user);
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        contact: req.user.contact,
        isAdmin: req.user.isAdmin
    });
});

// For password reset but adapted from admin
// @route   POST api/admin/reset
// @params  email of the user, new password
// @access  protected
// router.post('/reset', passport.authenticate('jwt', {session: false}), (req, res) => {
//     const decoded = jwt_decode(req.headers.authorization)
//     console.log("Admin Status: " + decoded.isAdmin)
//     if (decoded.isAdmin === false){
//         res.sendStatus(403);
//         console.log(decoded.isAdmin)
//     }
//     else {
//         const email = req.body.email.toLowerCase();
//         let password = req.body.password;

//         bcrypt.genSalt(10, (err, salt) => {
//             bcrypt.hash(password, salt, (err, hash)=>{
//                 if (err) throw err;
//                 password = hash;

//                 User.findOneAndUpdate({
//                     email: email
//                 }, { $set:
//                     {
//                         password: password
//                     }
//                 })
//                 .then(data => {
//                     res.json({msg: "Password changed!"})
//                     console.log(data);
//                 })
//                 .catch(err => console.log(err))        
//             });
//         });
//     }
// })


module.exports = router;
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const express = require('express');
const jwt_decode = require('jwt-decode');


const router = express.Router();

// Load User model:
const User = require('../../models/User');


// @route   GET api/tickets/read
// @desc    Read all tickets
// @access  protected

router.get('/read', passport.authenticate('jwt', {session: false}), (req, res) => {
    console.log(req.user.tickets)
    res.json(req.user.tickets)
    console.log(req.headers.authorization)
    console.log(jwt_decode(req.headers.authorization))

})

// @route   POST api/tickets/post
// @desc    Post a tickets
// @access  protected

router.post('/post', passport.authenticate('jwt', {session: false}), (req, res) => {
    const post = {
        content: req.body.content,
        status: "new",
        label: req.body.label
    }

    // Decode JWT token from headers
    const decoded = jwt_decode(req.headers.authorization)
    console.log(decoded)
    User.findOneAndUpdate({_id: decoded.id}, {$push: {tickets:[{content: req.body.content, label: req.body.label, status: "new"}]}}, {new: true})
        .then(posts => {
            res.send(posts)
            console.log(posts)
        })
        .catch(err => console.log(err))

    // User.find(req.)
})


module.exports = router
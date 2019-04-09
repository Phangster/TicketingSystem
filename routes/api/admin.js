// const jwt = require('jsonwebtoken');
// const keys = require('../../config/keys');
const passport = require('passport');
const express = require('express');
const jwt_decode = require('jwt-decode');


const router = express.Router();

// Load User model:
const User = require('../../models/User');
const Ticket = require('../../models/Ticket');


// @route   GET api/admin/tickets
// @desc    Get all tickets
// @access  private

router.get('/tickets', passport.authenticate('jwt', {session: false}), (req, res) => {
    const decoded = jwt_decode(req.headers.authorization)
    console.log("Admin Status: " + decoded.isAdmin)


    if (decoded.isAdmin === false){
        res.sendStatus(403);
        console.log(decoded.isAdmin)
    }
    else{
        const email = req.query.email;

        // Checks the query.
        // E.g: /api/admin/tickets?email=seeyijie.74@gmail.com

        // If not set, show all tickets
        if (!email){
            Ticket.find({})
                .then(data => {
                    // console.log("Showing all tickets: ");
                    // console.log(data);
                    res.send(data);
                })
                .catch(err => console.log(err));
        }
        else{
            // If set, show the tickets from the email
            Ticket.find({email:email})
            .then(data => {
                res.json(data);
            })
            .catch(err => console.log(err));
        }
    }
})
    
router.put('/tickets', passport.authenticate('jwt', {session: false}), (req, res) => {
    const decoded = jwt_decode(req.headers.authorization)
    console.log("Admin Status: " + decoded.isAdmin)
    const query = {
        // Own id
        // _id: decoded.id, 
        email: req.query.email,
        content: req.body.content,
    }

    const updated = {
        status: (!!req.query.status ? req.query.status : req.body.status),
        label : (!!req.query.label  ? req.query.label  : req.body.label )
    }

    if (decoded.isAdmin === false){
        res.sendStatus(403);
        console.log(decoded.isAdmin)
    }
    else{
        // console.log(query)
        // console.log(updated)

        // Ticket.findOne(query).then(post=> console.log(post))
        Ticket.findOneAndUpdate(query, updated).then(posts=> {
            res.send(posts)
        }).catch(err => console.log(err))
    }
})

module.exports = router
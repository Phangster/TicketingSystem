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
// @route   GET api/admin/tickets/?status=new
// @route   GET api/admin/tickets/?email=email1@gmail.com
// @route   GET api/admin/tickets/?email=email1@gmail.com&status=new
// @desc    Get all tickets or by filtering via the query strings
// @access  protected

router.get('/tickets', passport.authenticate('jwt', {session: false}), (req, res) => {
    const decoded = jwt_decode(req.headers.authorization)
    console.log("Admin Status: " + decoded.isAdmin)


    if (decoded.isAdmin === false){
        res.sendStatus(403);
        console.log(decoded.isAdmin)
    }
    else{
        const email = req.query.email;
        const status = req.query.status;
        // console.log(req.query.status)

        // Checks the query.
        // E.g: /api/admin/tickets?email=seeyijie.74@gmail.com

        // If not set, show all tickets
        if (!email && !status){
            Ticket.find({})
                .then(data => {
                    // console.log("Showing all tickets: ");
                    // console.log(data);
                    res.send(data);
                })
                .catch(err => console.log(err));
        }
        else if (!!email && !status){
            // If set, show the tickets from the email
            Ticket.find({email:email})
            .then(data => {
                res.json(data);
            })
            .catch(err => console.log(err));
        }
        else if (!!status && !email){
            // find tickets by status
            Ticket.find({status:status})
            .then(data => {
                res.json(data);
            })
            .catch(err => console.log(err));
        }
        else{
            Ticket.find({status:status, email:email})
            .then(data => {
                res.json(data);
            })
            .catch(err => console.log(err));
        }
    }
})

// @route   PUT api/admin/tickets?status=${status}&label=${label}
// @params  Content, status and label in body for the selected ticket.
//          Check for a query string. If it exists, edit the ticket based on it.
//          Must put at least EITHER status or label as query string.
// @desc    Get all tickets or by filtering via the query strings
// @access  protected

router.put('/tickets', passport.authenticate('jwt', {session: false}), (req, res) => {
    const decoded = jwt_decode(req.headers.authorization)
    console.log("Admin Status: " + decoded.isAdmin)
    const query = {
        // Own id
        // _id: decoded.id, 
        // email: req.query.email,
        content: req.body.content
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
        console.log(query)
        console.log(updated)

        // Ticket.findOne(query).then(post=> console.log(post))
        Ticket.findOneAndUpdate(query, updated).then(posts=> {
            res.send(posts)
        }).catch(err => console.log(err))
    }
})

// @route   PUT api/admin/subscribe
// @params  Add user ObjectId to subscribedBy under Tickets model.
//          Add ticket ObjectId to subscribeTo under User model.
//          Require ticket content (req.body.content) and the author email (req.body.email)
// @desc    Get all tickets or by filtering via the query string
// @access  protected
router.post('/subscribe', passport.authenticate('jwt', {session: false}), (req, res) => {
    const decoded = jwt_decode(req.headers.authorization)
    console.log("Admin Status: " + decoded.isAdmin)

    if (decoded.isAdmin === false){
        res.sendStatus(403);
        console.log(decoded.isAdmin)
    }
    else {
        // decided to add in email to narrow down the search
        // under the assumption that there is one ticket that has the same content

        Ticket.findOneAndUpdate({
            content: req.body.content,
            email: req.body.email
        }, 
        {"$addToSet": {subscribedBy: decoded.id}}).then(data=>{
            return data._id;

        }).then(ticketId => {

            User.findByIdAndUpdate(decoded.id, {
                "$addToSet": {subscribeTo: ticketId}
            }).then(res=>console.log(res)).catch(err=>console.log(err)) // if successful, returns the ticket before the update.
        })
        .catch(err=>console.log(err))

        res.status(200).json({msg:"Subscribed"})
    }
})

// UNSUBSCRIBE TO BE IMPLEMENTED

module.exports = router
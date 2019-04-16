const express = require('express');
const router = express.Router();
const {sendgridStatus, sendgridAlertAdmin} = require('../../services/sendgrid');
const mongoose = require('mongoose');
const jwt_decode = require('jwt-decode');
const passport = require('passport');

// Load model
const Comment = require('../../models/Comment');
const Ticket = require('../../models/Ticket');

// @route   GET api/comments/test
// @desc    Tests route
// @access  Private

router.get('/test', passport.authenticate('jwt', {session: false}), (req, res) => {
    const decoded = jwt_decode(req.headers.authorization)
    console.log(decoded)
    res.json({msg:"Welcome to final boss"})
})

// @route   POST api/comments
// @desc    create comments
// @params  body.content = ticket content you are searching for
//          body.message = message you are commenting.
// @access  Private

router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const decoded = jwt_decode(req.headers.authorization)
    newComment = new Comment({
        userId: decoded.id,
        name: decoded.name,
        message: req.body.message
    });

    console.log("Current user ID: " + decoded.id)

    // Ticket takes the ticket AUTHOR name as a parameter
    // Have to split between admin and non-admin api for this case to narrow down the search.
    // This works provided that I dont know another client's content.
    
    // Implement it such that only admin can reply to another user's ticket
    Ticket.findOne({content: req.body.content})
            .then(ticket=>{
                // console.log(newComment)
                console.log("Author user id: " + ticket.userId)
                // console.log(ticket) // Get ticket details
                // console.log(decoded) // Get JWT details
                // Checks the user id  matches the author id
                // if it matches, switch status to awaitAdmin, 
                // else switch status to awaitUser.

                // Weird that ticket.id !=== decoded.id
                // console.log(typeof(ticket.id))
                // console.log(typeof(decoded.id))

                if (JSON.stringify(decoded.id) === JSON.stringify(ticket.userId)){
                    console.log("Find ticket and update status")
                    Ticket.findByIdAndUpdate(ticket.id, {status: "awaitAdmin"})
                        .then(result => console.log("Status updated to awaitAdmin"))
                        .then(data => {
                            // ticket.subscribedBy correspond to "ticket" in Ticket.findOne
                            const subscribedByArray = ticket.subscribedBy;

                            subscribedByArray.forEach(element => {
        
                                // Find each user by userId in the array and send an email
                                User.findOne(element)
                                    .then(res=> {
                                        console.log("Alert admins!")
                                        sendgridAlertAdmin(res.email, ticket.name)
                                    })
                                    .catch(err=> console.log(err))
                            });
        
                        })
                        .catch(err=>console.log(err))
                }
                // An admin replied. Send email to author email.
                else {
                    // console.log(ticket.email)
                    // console.log(ticket.name)
                    ticket.status = "awaitUser";
                    Ticket.findOneAndUpdate({content:req.body.content}, {status:"awaitUser"}).then(posts=> {
                        console.log("Status updated to awaitUser")
                        const subscribedByArray = ticket.subscribedBy;

                        subscribedByArray.forEach(element => {
    
                            // Find each user ID in an array, send an email
                            User.findOne(element)
                                .then(res=> {
                                    // console.log("Email sent to: " + res.email)
                                    // console.log("Author of Ticket: " + ticket.name)
                                    
                                    // Sent to the email of the admins and alerting the admin that the author (ticket.name) has followed-up
                                    sendgridAlertAdmin(res.email, ticket.name)
                                })
                                .catch(err=> console.log(err))
    
                        });
    
                    }).catch(err => console.log(err))
            
                    sendgridStatus(ticket.email, ticket.name);
                }
                // console.log(decoded.id)
                newComment.ticketId = ticket.id
                newComment.message = req.body.message
                newComment.save().then(comment=>comment).catch(err=>console.log(err))

                // console.log(ticket)

            }).catch(err => console.log(err))
    
    res.send(newComment);

    // if (decoded.id != )
})

// @route       GET api/comments/?content=${ticketContent}
// @desc        Get comments from a ticket content. Ticket content MUST be already in the database, or it will run into errors.
// @access      Private
// @example     GET api/comments/?content=Hi%20I%20would%20like%20to%20try%20the%20sandbox%20chatbot%20API%20for%20PwC%20Singapore


router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    const content = req.query.content;
    Ticket.aggregate([
        {$match:{
            content: content
        }}
    ], function(err, result){
            // console.log("Ticket ID: " + result[0]._id)
            console.log(result)

            try {
                const ticketId = result[0]._id
                // console.log(ticketId);

                Comment.aggregate([
                    {$match:{
                        ticketId: ticketId
                    }}
                ], function(err, comments){
                    res.send(comments)
                })
        }
            catch(e){
                console.log(e)
                console.log("Cannot find ticket in database.")
                return res.status(404).send(e);
            }
    })
})

module.exports = router;
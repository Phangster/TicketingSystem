const passport = require('passport');
const express = require('express');
const jwt_decode = require('jwt-decode');


const router = express.Router();

// Load Ticket model:
const Ticket = require('../../models/Ticket');


// @route   GET api/tickets/
// @desc    Read all tickets
// @access  private

router.get('/', passport.authenticate('jwt', {session: false}), (req, res) => {
    // console.log(req.user)
    // console.log(req.headers.authorization)
    // console.log(jwt_decode(req.headers.authorization))
    Ticket.find({userId:req.user._id})
        .then(ticket => {
            res.json(ticket)
        })

})

// @route   POST api/tickets/
// @desc    Post a tickets
// @access  private

router.post('/', passport.authenticate('jwt', {session: false}), (req, res) => {

    // Decode JWT token from headers
    const decoded = jwt_decode(req.headers.authorization)
    console.log(decoded)

    newTicket = new Ticket ({
        userId: decoded.id,
        name: decoded.name,
        email: decoded.email,
        content: req.body.content,
        label : req.body.label,
        status: req.body.status
    })
    newTicket
        .save()
        .then(ticket=>res.send(ticket))
})

/*
    User shouldnt be able to delete tickets
*/
// @route   DELETE api/tickets/delete
// @desc    Delete a ticket
// @access  private
// Cannot allow them to submit duplicate tickets or it will delete all duplicate tickets
router.delete('/delete', passport.authenticate('jwt', {session: false}), (req, res) => {

    // Decode JWT token from headers
    const decoded = jwt_decode(req.headers.authorization)
    console.log(decoded)
    // if (decoded.isAdmin === false){
    //     // console.log("Decoding... isAdmin = " + decoded.isAdmin)
    //     // res.status(404).json({error: "Protected route"})    
    //     res.send(401);
    // }
    // else{
    const id = req.user
    User.findbyId(id, function (err, user) {
        console.log(user)
    })
    // User.updateOne({_id: decoded.id}, {$pull: {tickets:{content: req.body.content, label: req.body.label, status: "new"}}}, {multi: true})
    //     .then(posts => {
    //         res.send(posts)
    //         console.log(posts)
    //     })
    //     .catch(err => console.log(err))
})


module.exports = router
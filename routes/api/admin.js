const passport = require('passport');
const express = require('express');
const jwt_decode = require('jwt-decode');
const bcrypt = require('bcryptjs');
const generator = require('generate-password');
const keys = require('../../config/keys'); // secret key

const router = express.Router();

// Load User model:
const User = require('../../models/User');
const Ticket = require('../../models/Ticket');

router.get('/users',passport.authenticate('jwt', {session: false}), (req, res) => {
    const decoded = jwt_decode(req.headers.authorization) 
    if (decoded.isAdmin === false){
        res.sendStatus(403);
        console.log(decoded.isAdmin)
    }else{
        User.find({})
        .then(users=> {
            res.json(users)
        })
    }
})

/* @route   GET api/admin/tickets - all ticket
            GET api/admin/tickets/?status=new
            GET api/admin/tickets/?email=email1@gmail.com
            GET api/admin/tickets/?status=new&sort=asc
            GET api/admin/tickets/?email=email1@gmail.com&status=new

            
    For routes, you may use the following query strings:
    1) status only
    2) email only
    3) email and status
    4) status and sort (asc or desc for dates)

    @desc    Get all tickets or by filtering via the query strings
    @access  protected
*/

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
        const sort = req.query.sort;
        // console.log(req.query.sort)

        // Checks the query.
        // E.g: /api/admin/tickets?email=seeyijie.74@gmail.com

        // If not set, show all tickets
        if (!email && !status && !sort){
            Ticket.find({})
                .then(data => {
                    // console.log("Showing all tickets: ");
                    // console.log(data[2]);
                    res.send(data);
                    // User.findById({_id: data.id})
                })
                .catch(err => console.log(err));
        }
        else if (!!email && !status && !sort){
            // If set, show the tickets from the email
            Ticket.find({email:email})
            .then(data => {
                res.json(data);
            })
            .catch(err => console.log(err));
        }
        else if (!!status && !email && !sort){
            // find tickets by status
            Ticket.find({status:status})
            .then(data => {
                res.json(data);
            })
            .catch(err => console.log(err));
        }

        else if (!!status && !!email && !sort){
            Ticket.find({status:status, email:email})
            .then(data => {
                res.json(data);
            })
            .catch(err => console.log(err));
        }
        else if (!!status && !!sort && !email){
            if (sort === "asc"){
                console.log("Ascending")

                Ticket.find({$query: {}, sort: {datefield: 1}})
                .sort('date')
                .then(data => {
                    res.json(data);
                })
            }
            else if (sort === "desc"){
                console.log("Descending")

                Ticket.find({})
                .sort('-date')
                .then(data=>{
                    res.json(data);
                })
            }
            else {
                res.send("No such implementation");
            }
        }
        else {
            res.send("No such implementation");
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

// @route   POST api/admin/reset
// @params  email of the user
//          new password will be randomly generated and send via sendgrid
// @access  protected
router.post('/reset', passport.authenticate('jwt', {session: false}), (req, res) => {
    const decoded = jwt_decode(req.headers.authorization)
    console.log("Admin Status: " + decoded.isAdmin)
    if (decoded.isAdmin === false){
        res.sendStatus(403);
        console.log(decoded.isAdmin)
    }
    else {
        const email = req.body.email.toLowerCase();
        let password = generator.generate({
            length: 10,
            numbers: true
        });

        console.log(password) // to be deleted. this password will be send via email

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, (err, hash)=>{
                if (err) throw err;
                password = hash;

                User.findOneAndUpdate({
                    email: email
                }, { $set:
                    {
                        password: password
                    }
                })
                .then(data => {
                    res.json({msg: "Password changed!"})
                    console.log(data);
                })
                .catch(err => console.log(err))        
            });
        });
    }
})

// @route   POST api/admin/subscribe
// @params  Add user ObjectId to subscribedBy under Tickets model.
//          Add ticket ObjectId to subscribeTo under User model.
//          Require ticket content (req.body.content) and the author email (req.body.email)
// @access  protected
router.post('/subscribe', passport.authenticate('jwt', {session: false}), (req, res) => {
    const decoded = jwt_decode(req.headers.authorization)
    console.log("Admin Status: " + decoded.isAdmin)
    console.log(decoded)

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
        {"$addToSet": {
            subscribedBy: decoded.id,
            subscribedByName: decoded.name
        }}).then(data=>{
            return data._id;

        }).then(ticketId => {

            User.findByIdAndUpdate(decoded.id, {
                "$addToSet": {subscribeTo: ticketId}
            }).then(userData=>{
                console.log(userData)
                res.status(200).send({msg:"Subscribed"})

            }).catch(err=>console.log(err)) // if successful, returns the ticket before the update.
        })
        .catch(err=>console.log(err))

    }
})


// @route   POST api/admin/unsubscribe
// @params  Remove user ObjectId from subscribedBy under Tickets model.
//          Remove ticket ObjectId from subscribeTo under User model.
//          Require ticket content (req.body.content) and the author email (req.body.email)
// @access  protected
router.post('/unsubscribe', passport.authenticate('jwt', {session: false}), (req, res) => {
    const decoded = jwt_decode(req.headers.authorization)
    console.log("Admin Status: " + decoded.isAdmin)

    if (decoded.isAdmin === false){
        res.sendStatus(403);
        console.log(decoded.isAdmin)
    }
    else {
        Ticket.findOneAndUpdate({
            content: req.body.content,
            email: req.body.email
        },
        {
            "$pull": {
                subscribedBy: decoded.id,
                subscribedByName: decoded.name
            }
        })
        .then(data=> data._id)
        .then(ticketId => {
            User.findByIdAndUpdate(decoded.id, {
                "$pull": {
                    subscribeTo: ticketId
                }
            }).then(res=>console.log(res)).catch(err=>console.log(err)) // if successful, returns the ticket before the update.
        })
        .catch(err=>console.log(err))
        res.status(200).json({msg:"Unsubscribed"})
    }
})

module.exports = router
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');
const express = require('express');

const router = express.Router();


// @route   GET api/tickets/create
// @desc    Create one ticket
// @access  protected

// router.post('/create',  (req, res) => {}

const express = require('express');
const bcrypt = require('bcrypt'); // For hasing our password
const _ = require('lodash'); // Lodash
const { User, validate } = require('../models/user');

const router = express.Router(); // For Creating Routes using express

// User Registration
const registerUser = async (req, res) => {
    const { error } = validate(req.body); // Checks weather the user give email and password in a proper manner or not.If not then it gives us error
    if (error) return res.status(400).send(error.details[0].message);

    // Checks wheather the user already exsists in the database or not
    let user = await User.findOne({ email: req.body.email }) 

    if (user) return res.status(400).send('User already registerd');

    //Creating new User and return it to the user variable
    user = new User(_.pick(req.body, ['name', 'email', 'password'])); // sudhu matro pick kore naor jonno role dite parbe na client,,r whole body object dile huge risk

    // Generateing salt
    const salt = await bcrypt.genSalt(10);
    // Hashing password and update user object
    user.password = await bcrypt.hash(user.password, salt);

    // Generating token for new user
    const token = user.generateJWT();
    
    // Saving the new user
    const result = await user.save();

    // Response
    return res.status(201).send({
        // Response as an Object
        token: token,
        user: _.pick(result, ['_id','name','email'])
    });
}

// User Login 
const loginUser = async (req, res) => {
    // Finding the user
    let user = await User.findOne({ email: req.body.email});
    if (!user) return res.status(400).send('Invalid email or password');
    
    // Checking password is valid or not
    const validUser = await bcrypt.compare(req.body.password, user.password);
    if (!validUser) return res.status(400).send('Invalid email or password');

    // Generating token
    const token = user.generateJWT();

    // Response
    res.send({
        token: token,
        user: _.pick(user, ['_id', 'email', 'name'])
    });
}

// Reset Password

router.route('/register')
    .post(registerUser); // In Response it will give a token for authorization

router.route('/login')
    .post(loginUser); // In Response it will give a token for authorization

// Authorization ensure that a particular resource can only be accessed by original user 

module.exports = router;
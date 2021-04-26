const express = require('express');
const User = require("../models/user.model");
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// login
router.post('/login', async (req, res) => {
  try {
    const {username, password} = req.body;
    const user = await User.findOne({where: {username}});

    // if user not found then return status 400
    if (!user) {
      return res.status(400)
    }

    // compare the password with db
    const isMatch = await bcrypt.compare(password, user.password);

    // if wrong password
    if (!isMatch) {
      return res.status(400)
    }

    // create amd return the jwt
    const payload = {user: {username: user.username}};
    const token = await jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: process.env.JWT_VALIDITY});
    return res.json({token});

  } catch (err) {
    console.log(err.message);
    return res.status(500).send('server error');
  }
});

// register
router.post('/register', async (req, res) => {
  try {
    let {username, email, name, password, contact} = req.body;
    email = email.toLowerCase();

    // verify email and username
    let isValidEmail = true;
    let existingUser = await User.findOne({where: {email}});
    if (existingUser) isValidEmail = false;

    let isValidUsername = true;
    existingUser = await User.findOne({where: {username}});
    if (existingUser) isValidUsername = false;

    if (!isValidEmail || !isValidUsername) {
      console.log(isValidUsername, isValidEmail)
      return res.json({
        username: isValidUsername ? 'yes' : 'no',
        email: isValidEmail ? 'yes' : 'no',
        accountCreated: false,
      })
    }

    // now save the new user in database
    // encrypt the password
    const salt = await bcrypt.genSalt(10);
    const encryptedPassword = await bcrypt.hash(password, salt);

    // save the user in db
    await User.create({name, email, username, contact, password: encryptedPassword});

    return res.json({
      username: 'yes',
      email: 'yes',
      accountCreated: true,
    })

  } catch (err) {
    console.log(err.message);
    return res.status(500).send('server error');
  }
});

module.exports = router;

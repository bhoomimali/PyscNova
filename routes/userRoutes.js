
const express = require('express');
const router = express.Router(); // <--- THIS LINE WAS LIKELY MISSING. IT IS CRUCIAL.

const User = require('../Models/userModel');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');


// @desc    Register a new user
// @route   POST /api/users/register
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    const user = await User.create({ name, email, password });
    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


// @desc    Auth user & get token (Login) - DEBUGGING VERSION
// @route   POST /api/users/login
// @access  Public
router.post('/login', async (req, res) => {
  console.log('--- Login attempt started ---');
  try {
    const { email, password } = req.body;

    console.log('Request Body:', req.body);
    if (!email || !password) {
      console.log('Login failed: Missing email or password.');
      return res.status(400).json({ message: 'Please provide both email and password' });
    }

    console.log(`Searching for user with email: ${email}`);
    const user = await User.findOne({ email });

    if (!user) {
      console.log('Login failed: No user found with that email.');
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    console.log(`User found: ${user.name}`);

    console.log('Comparing passwords...');
    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      console.log('Password match! Generating token.');
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      console.log('Login failed: Passwords do not match.');
      res.status(401).json({ message: 'Invalid email or password' });
    }

  } catch (error) {
    console.error('--- UNEXPECTED ERROR IN LOGIN ROUTE ---', error);
    res.status(500).json({ message: 'An internal server error occurred' });
  }
  console.log('--- Login attempt finished ---');
});


module.exports = router;
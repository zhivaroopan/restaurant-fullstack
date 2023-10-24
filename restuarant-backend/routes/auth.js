// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Signup
router.post('/signup', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.aggregate([
      {
        $match: {
          username: username,
        },
      },
    ]).exec()
    if (user.length === 0) {
      throw new Error('User not found');
    }
    const isPasswordValid = await bcrypt.compare(password, user[0].password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    const token = jwt.sign({ userId: user[0]._id }, 'WtBQsisieas2JEdwBL8Df8ik3n8T1v', {
      expiresIn: '1h', // You can adjust the token expiration time
    });
    res.status(200).json({ token, loggedIn: true });
  } catch (error) {
    res.status(401).json({ error: error.message, loggedIn: false });
  }
});

module.exports = router;

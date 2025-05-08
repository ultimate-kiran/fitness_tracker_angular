const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');


const router = express.Router();


// POST: Signup
router.post('/signup', async (req, res) => {
  const { username, weight, height, email, password } = req.body;


  if (!username || !weight || !height || !email || !password) {
    return res.status(400).json({ message: 'All fields are required.' });
  }


  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(409).json({ message: 'Username or Email already taken.' });
    }


    const isStrong = password.length >= 8 &&
                     /[A-Z]/.test(password) &&
                     /[a-z]/.test(password) &&
                     /[0-9]/.test(password) &&
                     /[^A-Za-z0-9]/.test(password);


    if (!isStrong) {
      return res.status(400).json({
        message: 'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.'
      });
    }


    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = new User({
      username,
      weight,
      height,
      email,
      password: hashedPassword
    });


    await newUser.save();


    res.status(201).json({ message: 'User created successfully.', user: newUser });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
});


// POST: Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;


  console.log('Received login attempt:', { email, password });

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required.' });
  }


  // ✅ Hardcoded admin check
  if ((email === 'admin@gmail.com' && password === 'Admin@1234')) {
    return res.status(200).json({
    message: 'Admin login successful.',
    isAdmin: true,
    user: {
    id: 'admin-id',
    username: 'Admin',
    email
  }
});
}

  try {
    const user = await User.findOne({ email });
    console.log(user);
    console.log(user._id);
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }


    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }


    res.status(200).json({
      message: 'Login successful.',
      isAdmin: false,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        weight: user.weight,   // Add this
        height: user.height    // And this
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error.' });
  }
});


// GET: Fetch user height and weight
router.get('/user/:id', async (req, res) => {
  const userId = req.params.id;


  try {
    const user = await User.findById(userId).select('weight height');
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }


    res.status(200).json({
      weight: user.weight,
      height: user.height
    });
  } catch (error) {
    console.error('Error fetching user data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;



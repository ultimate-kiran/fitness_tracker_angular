// routes/userRoutes.js
const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const router = express.Router();

// GET: Fetch all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find().select('username email height weight');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err });
  }
});
router.get('/:id', async (req, res) => {
  console.log("hello");
  console.log(req.params.id);
  try {
    const users = await User.find({_id:req.params.id}).select('weight');
    console.log(users);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users', error: err });
  }
});

// GET: Fetch full user profile by ID (new endpoint)
router.get('/profile/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('username email height weight age gender');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user profile', error: err });
  }
});


router.put('/profile/:id', async (req, res) => {
  try {
    const { username, weight, height, email, password, age, gender } = req.body;

    // If password is provided, hash it
    const updateData = { username, weight, height, email, age, gender };
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updateData.password = hashedPassword;
    }

    const updatedUser = await User.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User profile updated successfully', user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating user profile', error: err });
  }
});


// PUT: Update a user by ID
// PUT: Update a user by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User updated successfully', user: updatedUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating user', error: err });
  }
});

// DELETE: Delete a user
router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting user', error: err });
  }
});

module.exports = router;
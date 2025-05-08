const express = require('express');
const mongoose = require('mongoose');
const Workout = require('../models/Workout');
const router = express.Router();

// Add a new workout
router.post('/', async (req, res) => {
  const { userId, type, sets, reps, intensity, timePerRep, restTime, date, calories } = req.body;

  // Validate required fields
  if (!userId || !type || !sets || !reps || !intensity || !timePerRep || !restTime || !date || !calories) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID.' });
  }

  try {
    const workout = await Workout.create({
      userId,
      type,
      sets,
      reps,
      intensity,
      timePerRep,
      restTime,
      date,
      calories,
    });
    res.status(201).json(workout);
  } catch (err) {
    console.error('Workout creation error:', err);
    res.status(500).json({ message: 'Failed to save workout.' });
  }
});
// Get all workouts for a specific user

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  // Validate userId
  if (!userId || userId === 'undefined') {
    return res.status(400).json({ message: 'User ID is required.' });
  }

  // Validate userId as a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID.' });
  }

  try {
    console.log(`Fetching workouts for userId: ${userId}`); // Debug log
    const workouts = await Workout.find({ userId: req.params.userId });
    console.log(`Found ${workouts.length} workouts for userId: ${userId}`); // Debug log
    res.json(workouts);
  } catch (err) {
    console.error('Workout fetch error:', err);
    res.status(500).json({ message: 'Failed to fetch workouts.' });
  }
});

module.exports = router;
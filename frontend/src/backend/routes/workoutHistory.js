const express = require('express');
const router = express.Router();
const Exercise = require('../models/Exercise'); // Adjust the path

// GET workout history for a user
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const workouts = await Exercise.find({ userId }).sort({ date: 1 });
    res.json(workouts);
  } catch (err) {
    console.error('Error fetching workout history:', err);
    res.status(500).json({ error: 'Error fetching workout history' });
  }
});

module.exports = router;
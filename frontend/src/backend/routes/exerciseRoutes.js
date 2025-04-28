const express = require('express');
const router = express.Router();
const Exercise = require('../models/Exercise'); // Adjust path based on your structure

// GET all exercises
router.get('/', async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (err) {
    res.status(500).json({ error: 'Error fetching exercises' });
  }
});

// POST a new exercise
router.post('/', async (req, res) => {
  try {
    const newExercise = new Exercise(req.body);
    await newExercise.save();
    res.status(201).json(newExercise);
  } catch (err) {
    res.status(500).json({ error: 'Error adding exercise' });
  }
});

module.exports = router;
const express = require('express');
const mongoose = require('mongoose');
const Nutrition = require('../models/Nutrition');
const router = express.Router();

// Add a new nutrition record
router.post('/', async (req, res) => {
  const { userId, mealType, time, foodName, calories, carbs, protein, fat, date } = req.body;

  // Validate required fields
  if (!userId || !mealType || !time || !foodName || calories == null || carbs == null || protein == null || fat == null || !date) {
    return res.status(400).json({ message: 'All fields are required.' });
  }

  // Validate userId as a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID.' });
  }

  try {
    const nutrition = await Nutrition.create({
      userId,
      mealType,
      time,
      foodName,
      calories,
      carbs,
      protein,
      fat,
      date
    });

    res.status(201).json(nutrition);
  } catch (err) {
    console.error('Nutrition creation error:', err);
    res.status(500).json({ message: 'Failed to save nutrition entry.' });
  }
});

// Get all nutrition records for a specific user
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  if (!userId || userId === 'undefined') {
    return res.status(400).json({ message: 'User ID is required.' });
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: 'Invalid user ID.' });
  }

  try {
    const nutritionRecords = await Nutrition.find({ userId });
    if (!nutritionRecords.length) {
      return res.status(404).json({ message: 'No nutrition entries found for this user.' });
    }
    res.json(nutritionRecords);
  } catch (err) {
    console.error('Nutrition fetch error:', err);
    res.status(500).json({ message: 'Failed to fetch nutrition entries.' });
  }
});

// Get nutrition records by foodName
router.get('/', async (req, res) => {
  const { foodName } = req.query;

  if (!foodName) {
    return res.status(400).json({ message: 'foodName query parameter is required.' });
  }

  try {
    const nutritionRecords = await Nutrition.find({ foodName });
    res.json(nutritionRecords);
  } catch (err) {
    console.error('Nutrition fetch error:', err);
    res.status(500).json({ message: 'Failed to fetch nutrition entries.' });
  }
});

// Update a nutrition record
router.put('/:id', async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid nutrition ID.' });
  }

  try {
    const nutrition = await Nutrition.findByIdAndUpdate(id, req.body, { new: true });
    if (!nutrition) {
      return res.status(404).json({ message: 'Nutrition entry not found.' });
    }
    res.json(nutrition);
  } catch (err) {
    console.error('Nutrition update error:', err);
    res.status(500).json({ message: 'Failed to update nutrition entry.' });
  }
});

module.exports = router;
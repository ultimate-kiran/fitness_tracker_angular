const express = require('express');
const router = express.Router();
const WeightLog = require('../models/weightLog'); // Adjust the path

// GET weight history for a user
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const weightLogs = await WeightLog.find({ userId }).sort({ date: 1 });
    res.json(weightLogs);
  } catch (err) {
    console.error('Error fetching weight history:', err);
    res.status(500).json({ error: 'Error fetching weight history' });
  }
});

// POST a new weight log
router.post('/', async (req, res) => {
  try {
    const weightLog = await WeightLog.create(req.body);
    res.status(201).json(weightLog);
  } catch (err) {
    console.error('Error logging weight:', err);
    res.status(500).json({ error: 'Error logging weight' });
  }
});

module.exports = router;
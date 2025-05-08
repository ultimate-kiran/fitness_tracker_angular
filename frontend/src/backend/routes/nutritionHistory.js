const express = require('express');
const router = express.Router();
//const Recipe = require('../models/recipe'); // Adjust the path

// GET nutrition history for a user
router.get('/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;
    const nutrition = await Recipe.find({ userId }).sort({ date: 1 });
    res.json(nutrition);
  } catch (err) {
    console.error('Error fetching nutrition history:', err);
    res.status(500).json({ error: 'Error fetching nutrition history' });
  }
});

module.exports = router;
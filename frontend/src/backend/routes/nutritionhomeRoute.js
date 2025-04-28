const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// GET all recipes
router.get('/', async (req, res) => {
  try {
    const recipes = await Recipe.find();
    console.log('Fetched all recipes:', recipes); // Add logging
    res.json(recipes);
  } catch (err) {
    console.error('Error fetching all recipes:', err); // Add error logging
    res.status(500).json({ message: err.message });
  }
});

// GET recipes by meal type (case-insensitive)
router.get('/:mealtype', async (req, res) => {
  try {
    const recipes = await Recipe.find({ ' mealtype': { $regex: new RegExp(req.params.mealtype, 'i') } });
    console.log('Fetched recipes for mealtype:', req.params.mealtype, 'Result:', recipes); // Add logging
    res.json(recipes);
  } catch (err) {
    console.error('Error fetching recipes by mealtype:', err); // Add error logging
    res.status(500).json({ message: err.message });
  }
});

router.get('/title/:title', async (req, res) => {
  try {
    const recipe = await Recipe.findOne({ Title: req.params.title });
    console.log('Fetched recipe for title:', req.params.title, 'Result:', recipe);
    if (recipe) {
      res.json(recipe);
    } else {
      res.status(404).json({ message: 'Recipe not found' });
    }
  } catch (err) {
    console.error('Error fetching recipe by title:', err);
    res.status(500).json({ message: err.message });
  }
});


module.exports = router;
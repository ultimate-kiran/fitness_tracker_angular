// routes/recipeRoutes.js
const express = require('express');
const Recipe = require('../models/Recipe');
const router = express.Router();

// GET: Fetch all recipes

// GET recipes by meal type (limited to 20)
router.get('/', async (req, res) => {
  try {
    const mealType = req.query.mealType;
    console.log('Query mealType:', mealType);
    const query = mealType ? { ' mealtype': { $regex: mealType, $options: 'i' } } : {};
    console.log('Query constructed:', query);
    const recipes = await Recipe.find(query).sort({ createdAt: -1 }).limit(20);
    console.log('Recipes found:', recipes);
    res.json(recipes);
  } catch (err) {
    console.error('Error fetching recipes:', err);
    res.status(500).json({ error: 'Error fetching recipes' });
  }
});
// GET recipe by ID (new route)
router.get('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (err) {
    console.error('Error fetching recipe by ID:', err);
    res.status(500).json({ error: 'Error fetching recipe' });
  }
});

// POST: Create a new recipe
router.post('/', async (req, res) => {
  try {
    const recipe = new Recipe(req.body);
    await recipe.save();
    res.status(201).json(recipe);
  } catch (err) {
    res.status(500).json({ message: 'Error creating recipe', error: err });
  }
});
// UPDATE a recipe
router.put('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ message: 'Error updating recipe', error: err });
  }
});

// DELETE: Delete a recipe
router.delete('/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findByIdAndDelete(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }
    res.json({ message: 'Recipe deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting recipe', error: err });
  }
});

module.exports = router;
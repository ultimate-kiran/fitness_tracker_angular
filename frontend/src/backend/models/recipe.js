const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  ' mealtype': String, // Added with space to match MongoDB data
  Title: String,
  Ingredients: String,
  Instructions: String,
  Image_Name: String,
  Cleaned_Ingredients: String,
  calories: Number,
  carbs: Number,
  protein: Number,
  fat: Number
},{ timestamps: true });

module.exports = mongoose.model('Recipe', recipeSchema);
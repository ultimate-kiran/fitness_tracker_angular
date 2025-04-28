//Nutrition.js


const mongoose = require('mongoose');

const nutritionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  mealType: { type: String, required: true }, // e.g., Breakfast, Lunch
  time: { type: String, required: true }, // e.g., 08:30 AM
  foodName: { type: String, required: true }, // or rename to foodItems if needed
  calories: { type: Number, required: true },
  carbs: { type: Number, required: true },
  protein: { type: Number, required: true },
  fat: { type: Number, required: true },
  date: { type: String, required: true } 
}, { timestamps: true,collection: 'nutritions' });

module.exports = mongoose.model('Nutrition', nutritionSchema);

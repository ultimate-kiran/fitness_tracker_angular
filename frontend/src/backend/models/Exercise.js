const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  equipment: { type: String, required: true },
  primaryMuscle: { type: String, required: true },
  secondaryMuscle: { type: String, required: false },
  gif: { type: String, required: false },
  met: { type: Number, required: false }
});

module.exports = mongoose.model('Exercise', exerciseSchema, 'exercise');
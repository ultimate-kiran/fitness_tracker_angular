const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  type: String,
  duration: Number,
  date: Date,
  calories: Number
}, { timestamps: true });

module.exports = mongoose.model('Workout', workoutSchema);

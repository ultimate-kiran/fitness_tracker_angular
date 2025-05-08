const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
  type: { type: String, required: true },
  sets: { type: Number, required: true },
  reps: { type: Number, required: true },
  intensity: { type: String, required: true },
  timePerRep: { type: Number, required: true },
  restTime: { type: Number, required: true },
  date: { type: String, required: true },
  calories: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Workout', workoutSchema);
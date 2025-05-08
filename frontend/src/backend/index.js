/*Filename: index.js*/

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const workoutRoutes = require('./routes/workoutRoutes');
const authRoutes = require('./routes/authRoutes'); // ✅ Added auth routes
const exerciseRoutes = require('./routes/exerciseRoutes');
const userRoutes = require('./routes/userRoutes'); // New
const recipeRoutes = require('./routes/recipeRoutes');


const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/fitnessTracker')
  .then(() => console.log("MongoDB Connected to fitnessTracker"))
  .catch(err => console.error('Mongo Error:', err));

app.use('/api/workouts', workoutRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api', authRoutes); // ✅ Mount auth routes at /api
app.use('/api/users', userRoutes); // New
app.use('/api/recipes', recipeRoutes);

app.use('/api/workoutHistory', require('./routes/workoutHistory')); // New
app.use('/api/nutritionHistory', require('./routes/nutritionHistory')); // New
app.use('/api/weightHistory', require('./routes/weightHistory'));

const nutritionhomeRoutes = require('./routes/nutritionhomeRoute'); // Unique variable name
app.use('/api/nutritionhome', nutritionhomeRoutes);

const nutritionRoutes = require('./routes/nutritionRoutes'); // Unique variable name
app.use('/api/nutrition', nutritionRoutes);

const PORT = 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


 
const mongoose = require('mongoose');

const HealthDataSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  steps: { type: Number, default: 0 },
  caloriesBurned: { type: Number, default: 0 },
  waterIntake: { type: Number, default: 0 },
  weight: { type: Number },
  sleepHours: { type: Number },
  mood: { type: String },
});

module.exports = mongoose.model('HealthData', HealthDataSchema);


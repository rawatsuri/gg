import mongoose from 'mongoose';

const activitySchema = new mongoose.Schema({
  type: { type: String, required: true },
  duration: Number,
  calories: Number,
  date: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const waterIntakeSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const sleepSchema = new mongoose.Schema({
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  quality: String,
  deepSleep: Number,
  lightSleep: Number,
  remSleep: Number,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const mealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  time: { type: Date, required: true },
  calories: Number,
  items: [String],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

export const Activity = mongoose.model('Activity', activitySchema);
export const WaterIntake = mongoose.model('WaterIntake', waterIntakeSchema);
export const Sleep = mongoose.model('Sleep', sleepSchema);
export const Meal = mongoose.model('Meal', mealSchema);
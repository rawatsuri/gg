const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['health', 'wealth'], required: true },
  title: { type: String, required: true },
  target: { type: Number, required: true },
  currentValue: { type: Number, default: 0 },
  unit: { type: String, required: true },
  deadline: { type: Date },
  createdAt: { type: Date, default: Date.now },
  completed: { type: Boolean, default: false }
});

module.exports = mongoose.model('Goal', GoalSchema);


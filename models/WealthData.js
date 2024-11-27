const mongoose = require('mongoose');

const WealthDataSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  income: { type: Number, default: 0 },
  expenses: { type: Number, default: 0 },
  savings: { type: Number, default: 0 },
  category: { type: String },
  description: { type: String },
});

module.exports = mongoose.model('WealthData', WealthDataSchema);


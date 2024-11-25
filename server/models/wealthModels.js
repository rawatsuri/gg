import mongoose from 'mongoose';

const billSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['paid', 'upcoming', 'overdue'], default: 'upcoming' },
  recurring: { type: Boolean, default: false },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const investmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  value: { type: Number, required: true },
  purchasePrice: Number,
  purchaseDate: Date,
  type: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const savingsGoalSchema = new mongoose.Schema({
  name: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  currentAmount: { type: Number, default: 0 },
  targetDate: Date,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const incomeSchema = new mongoose.Schema({
  source: { type: String, required: true },
  amount: { type: Number, required: true },
  frequency: { type: String, required: true },
  lastUpdated: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const expenseSchema = new mongoose.Schema({
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  description: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

export const Bill = mongoose.model('Bill', billSchema);
export const Investment = mongoose.model('Investment', investmentSchema);
export const SavingsGoal = mongoose.model('SavingsGoal', savingsGoalSchema);
export const Income = mongoose.model('Income', incomeSchema);
export const Expense = mongoose.model('Expense', expenseSchema);
import express from 'express';
import { Bill, Investment, SavingsGoal, Income, Expense } from '../models/wealthModels.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Bills
router.get('/bills', auth, async (req, res) => {
  try {
    const bills = await Bill.find({ userId: req.user.id }).sort({ dueDate: 1 });
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/bills', auth, async (req, res) => {
  try {
    const bill = new Bill({
      ...req.body,
      userId: req.user.id
    });
    const newBill = await bill.save();
    res.status(201).json(newBill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch('/bills/:id', auth, async (req, res) => {
  try {
    const bill = await Bill.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!bill) return res.status(404).json({ message: 'Bill not found' });
    res.json(bill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/bills/:id', auth, async (req, res) => {
  try {
    const bill = await Bill.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });
    if (!bill) return res.status(404).json({ message: 'Bill not found' });
    res.json({ message: 'Bill deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Investments
router.get('/investments', auth, async (req, res) => {
  try {
    const investments = await Investment.find({ userId: req.user.id });
    res.json(investments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/investments', auth, async (req, res) => {
  try {
    const investment = new Investment({
      ...req.body,
      userId: req.user.id
    });
    const newInvestment = await investment.save();
    res.status(201).json(newInvestment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch('/investments/:id', auth, async (req, res) => {
  try {
    const investment = await Investment.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!investment) return res.status(404).json({ message: 'Investment not found' });
    res.json(investment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/investments/:id', auth, async (req, res) => {
  try {
    const investment = await Investment.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });
    if (!investment) return res.status(404).json({ message: 'Investment not found' });
    res.json({ message: 'Investment deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Savings Goals
router.get('/savings-goals', auth, async (req, res) => {
  try {
    const goals = await SavingsGoal.find({ userId: req.user.id });
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/savings-goals', auth, async (req, res) => {
  try {
    const goal = new SavingsGoal({
      ...req.body,
      userId: req.user.id
    });
    const newGoal = await goal.save();
    res.status(201).json(newGoal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch('/savings-goals/:id', auth, async (req, res) => {
  try {
    const goal = await SavingsGoal.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!goal) return res.status(404).json({ message: 'Goal not found' });
    res.json(goal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/savings-goals/:id', auth, async (req, res) => {
  try {
    const goal = await SavingsGoal.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });
    if (!goal) return res.status(404).json({ message: 'Goal not found' });
    res.json({ message: 'Goal deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Income
router.get('/income', auth, async (req, res) => {
  try {
    const income = await Income.find({ userId: req.user.id });
    res.json(income);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/income', auth, async (req, res) => {
  try {
    const income = new Income({
      ...req.body,
      userId: req.user.id
    });
    const newIncome = await income.save();
    res.status(201).json(newIncome);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch('/income/:id', auth, async (req, res) => {
  try {
    const income = await Income.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!income) return res.status(404).json({ message: 'Income not found' });
    res.json(income);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/income/:id', auth, async (req, res) => {
  try {
    const income = await Income.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });
    if (!income) return res.status(404).json({ message: 'Income not found' });
    res.json({ message: 'Income deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Expenses
router.get('/expenses', auth, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/expenses', auth, async (req, res) => {
  try {
    const expense = new Expense({
      ...req.body,
      userId: req.user.id
    });
    const newExpense = await expense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.patch('/expenses/:id', auth, async (req, res) => {
  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.json(expense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/expenses/:id', auth, async (req, res) => {
  try {
    const expense = await Expense.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Dashboard Summary
router.get('/dashboard-summary', auth, async (req, res) => {
  try {
    const [expenses, income, investments, bills] = await Promise.all([
      Expense.aggregate([
        { $match: { userId: req.user.id } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ]),
      Income.aggregate([
        { $match: { userId: req.user.id } },
        { $group: { _id: null, total: { $sum: "$amount" } } }
      ]),
      Investment.aggregate([
        { $match: { userId: req.user.id } },
        { $group: { _id: null, total: { $sum: "$value" } } }
      ]),
      Bill.find({ 
        userId: req.user.id,
        dueDate: { $gte: new Date() },
        status: 'upcoming'
      }).sort({ dueDate: 1 }).limit(5)
    ]);

    res.json({
      totalExpenses: expenses[0]?.total || 0,
      totalIncome: income[0]?.total || 0,
      totalInvestments: investments[0]?.total || 0,
      upcomingBills: bills
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
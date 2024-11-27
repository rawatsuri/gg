const express = require('express');
const WealthData = require('../models/WealthData');
const auth = require('../middleware/auth');

const router = express.Router();

// Create wealth data
router.post('/', auth, async (req, res) => {
  try {
    const wealthData = new WealthData({
      user: req.user._id,
      ...req.body
    });
    await wealthData.save();
    res.status(201).json(wealthData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read wealth data
router.get('/', auth, async (req, res) => {
  try {
    const wealthData = await WealthData.find({ user: req.user._id }).sort({ date: -1 });
    res.json(wealthData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update wealth data
router.put('/:id', auth, async (req, res) => {
  try {
    const wealthData = await WealthData.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!wealthData) {
      return res.status(404).json({ error: 'Wealth data not found' });
    }
    res.json(wealthData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete wealth data
router.delete('/:id', auth, async (req, res) => {
  try {
    const wealthData = await WealthData.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!wealthData) {
      return res.status(404).json({ error: 'Wealth data not found' });
    }
    res.json({ message: 'Wealth data deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get wealth summary
router.get('/summary', auth, async (req, res) => {
  try {
    const summary = await WealthData.aggregate([
      { $match: { user: req.user._id } },
      { $group: {
        _id: null,
        totalIncome: { $sum: '$income' },
        totalExpenses: { $sum: '$expenses' },
        totalSavings: { $sum: '$savings' }
      }}
    ]);
    
    res.json(summary[0] || { totalIncome: 0, totalExpenses: 0, totalSavings: 0 });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;


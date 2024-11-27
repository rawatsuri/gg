const express = require('express');
const HealthData = require('../models/HealthData');
const auth = require('../middleware/auth');

const router = express.Router();

// Create health data
router.post('/', auth, async (req, res) => {
  try {
    const healthData = new HealthData({
      user: req.user._id,
      ...req.body
    });
    await healthData.save();
    res.status(201).json(healthData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Read health data
router.get('/', auth, async (req, res) => {
  try {
    const healthData = await HealthData.find({ user: req.user._id }).sort({ date: -1 });
    res.json(healthData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update health data
router.put('/:id', auth, async (req, res) => {
  try {
    const healthData = await HealthData.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true }
    );
    if (!healthData) {
      return res.status(404).json({ error: 'Health data not found' });
    }
    res.json(healthData);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete health data
router.delete('/:id', auth, async (req, res) => {
  try {
    const healthData = await HealthData.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!healthData) {
      return res.status(404).json({ error: 'Health data not found' });
    }
    res.json({ message: 'Health data deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get health summary
router.get('/summary', auth, async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const healthData = await HealthData.findOne({
      user: req.user._id,
      date: { $gte: today },
    });
    
    res.json(healthData || { steps: 0, caloriesBurned: 0, waterIntake: 0, weight: 0, sleepHours: 0, mood: '' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;


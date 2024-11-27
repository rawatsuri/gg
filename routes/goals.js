const express = require('express');
const Goal = require('../models/Goal');
const auth = require('../middleware/auth');

const router = express.Router();

// Create a new goal
router.post('/', auth, async (req, res) => {
  try {
    const goal = new Goal({
      ...req.body,
      user: req.user._id
    });
    await goal.save();
    res.status(201).json(goal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get all goals for the user
router.get('/', auth, async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user._id });
    res.json(goals);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update a goal
router.put('/:id', auth, async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'target', 'currentValue', 'unit', 'deadline', 'completed'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return res.status(400).json({ error: 'Invalid updates' });
    }

    const goal = await Goal.findOne({ _id: req.params.id, user: req.user._id });

    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }

    updates.forEach(update => goal[update] = req.body[update]);
    await goal.save();

    res.json(goal);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete a goal
router.delete('/:id', auth, async (req, res) => {
  try {
    const goal = await Goal.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!goal) {
      return res.status(404).json({ error: 'Goal not found' });
    }
    res.json({ message: 'Goal deleted successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;


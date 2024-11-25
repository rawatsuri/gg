import express from 'express';
import { Activity, WaterIntake, Sleep, Meal } from '../models/healthModels.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Activities
router.get('/activities', auth, async (req, res) => {
  try {
    const activities = await Activity.find({ userId: req.user.id });
    res.json(activities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/activities', auth, async (req, res) => {
  try {
    const activity = new Activity({
      ...req.body,
      userId: req.user.id
    });
    const newActivity = await activity.save();
    res.status(201).json(newActivity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/activities/:id', auth, async (req, res) => {
  try {
    const activity = await Activity.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });
    if (!activity) return res.status(404).json({ message: 'Activity not found' });
    res.json({ message: 'Activity deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Water Intake
router.get('/water-intake', auth, async (req, res) => {
  try {
    const waterIntake = await WaterIntake.find({ 
      userId: req.user.id,
      date: { 
        $gte: new Date().setHours(0,0,0,0),
        $lt: new Date().setHours(23,59,59,999)
      }
    });
    res.json(waterIntake);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/water-intake', auth, async (req, res) => {
  try {
    const waterIntake = new WaterIntake({
      ...req.body,
      userId: req.user.id
    });
    const newWaterIntake = await waterIntake.save();
    res.status(201).json(newWaterIntake);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Sleep
router.get('/sleep', auth, async (req, res) => {
  try {
    const sleep = await Sleep.find({ 
      userId: req.user.id 
    }).sort({ startTime: -1 }).limit(7);
    res.json(sleep);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/sleep', auth, async (req, res) => {
  try {
    const sleep = new Sleep({
      ...req.body,
      userId: req.user.id
    });
    const newSleep = await sleep.save();
    res.status(201).json(newSleep);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Meals
router.get('/meals', auth, async (req, res) => {
  try {
    const meals = await Meal.find({ 
      userId: req.user.id,
      time: {
        $gte: new Date().setHours(0,0,0,0),
        $lt: new Date().setHours(23,59,59,999)
      }
    }).sort({ time: 1 });
    res.json(meals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/meals', auth, async (req, res) => {
  try {
    const meal = new Meal({
      ...req.body,
      userId: req.user.id
    });
    const newMeal = await meal.save();
    res.status(201).json(newMeal);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete('/meals/:id', auth, async (req, res) => {
  try {
    const meal = await Meal.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id
    });
    if (!meal) return res.status(404).json({ message: 'Meal not found' });
    res.json({ message: 'Meal deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
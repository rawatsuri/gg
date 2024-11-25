import { Router } from 'express';
import { z } from 'zod';

const router = Router();

// In-memory storage
let workouts: any[] = [];

const WorkoutSchema = z.object({
  title: z.string(),
  type: z.enum(['cardio', 'strength', 'flexibility']),
  duration: z.number(),
  date: z.string(),
  notes: z.string().optional(),
});

// Get all workouts
router.get('/', (_, res) => {
  res.json(workouts);
});

// Create workout
router.post('/', (req, res) => {
  try {
    const workout = WorkoutSchema.parse(req.body);
    const newWorkout = { id: Date.now(), ...workout };
    workouts.push(newWorkout);
    res.status(201).json(newWorkout);
  } catch (error) {
    res.status(400).json({ error: 'Invalid workout data' });
  }
});

// Update workout
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const workout = WorkoutSchema.parse(req.body);
    const index = workouts.findIndex(w => w.id === Number(id));
    
    if (index === -1) {
      return res.status(404).json({ error: 'Workout not found' });
    }

    workouts[index] = { ...workouts[index], ...workout };
    res.json(workouts[index]);
  } catch (error) {
    res.status(400).json({ error: 'Invalid workout data' });
  }
});

// Delete workout
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = workouts.findIndex(w => w.id === Number(id));
  
  if (index === -1) {
    return res.status(404).json({ error: 'Workout not found' });
  }

  workouts = workouts.filter(w => w.id !== Number(id));
  res.status(204).send();
});

export const workoutRoutes = router;
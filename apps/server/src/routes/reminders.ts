import { Router } from 'express';
import { z } from 'zod';

const router = Router();

// In-memory storage
let reminders: any[] = [];

const ReminderSchema = z.object({
  title: z.string(),
  type: z.enum(['test', 'workout', 'medication', 'appointment']),
  date: z.string(),
  recurring: z.boolean(),
  interval: z.number().optional(),
  notes: z.string().optional(),
});

// Get all reminders
router.get('/', (_, res) => {
  res.json(reminders);
});

// Create reminder
router.post('/', (req, res) => {
  try {
    const reminder = ReminderSchema.parse(req.body);
    const newReminder = { id: Date.now(), ...reminder };
    reminders.push(newReminder);
    res.status(201).json(newReminder);
  } catch (error) {
    res.status(400).json({ error: 'Invalid reminder data' });
  }
});

// Update reminder
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const reminder = ReminderSchema.parse(req.body);
    const index = reminders.findIndex(r => r.id === Number(id));
    
    if (index === -1) {
      return res.status(404).json({ error: 'Reminder not found' });
    }

    reminders[index] = { ...reminders[index], ...reminder };
    res.json(reminders[index]);
  } catch (error) {
    res.status(400).json({ error: 'Invalid reminder data' });
  }
});

// Delete reminder
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = reminders.findIndex(r => r.id === Number(id));
  
  if (index === -1) {
    return res.status(404).json({ error: 'Reminder not found' });
  }

  reminders = reminders.filter(r => r.id !== Number(id));
  res.status(204).send();
});

export const reminderRoutes = router;
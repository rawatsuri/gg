import { Router } from 'express';
import { z } from 'zod';

const router = Router();

// In-memory storage
let healthReports: any[] = [];

const HealthReportSchema = z.object({
  type: z.enum(['blood_pressure', 'blood_sugar', 'cholesterol', 'weight']),
  value: z.number(),
  unit: z.string(),
  date: z.string(),
  notes: z.string().optional(),
});

// Get all health reports
router.get('/', (_, res) => {
  res.json(healthReports);
});

// Create health report
router.post('/', (req, res) => {
  try {
    const report = HealthReportSchema.parse(req.body);
    const newReport = { id: Date.now(), ...report };
    healthReports.push(newReport);
    res.status(201).json(newReport);
  } catch (error) {
    res.status(400).json({ error: 'Invalid health report data' });
  }
});

// Update health report
router.put('/:id', (req, res) => {
  try {
    const { id } = req.params;
    const report = HealthReportSchema.parse(req.body);
    const index = healthReports.findIndex(r => r.id === Number(id));
    
    if (index === -1) {
      return res.status(404).json({ error: 'Health report not found' });
    }

    healthReports[index] = { ...healthReports[index], ...report };
    res.json(healthReports[index]);
  } catch (error) {
    res.status(400).json({ error: 'Invalid health report data' });
  }
});

// Delete health report
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const index = healthReports.findIndex(r => r.id === Number(id));
  
  if (index === -1) {
    return res.status(404).json({ error: 'Health report not found' });
  }

  healthReports = healthReports.filter(r => r.id !== Number(id));
  res.status(204).send();
});

export const healthReportRoutes = router;
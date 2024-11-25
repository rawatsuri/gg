import express from 'express';
import cors from 'cors';
import { workoutRoutes } from './routes/workouts';
import { healthReportRoutes } from './routes/healthReports';
import { reminderRoutes } from './routes/reminders';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/health-reports', healthReportRoutes);
app.use('/api/reminders', reminderRoutes);

// Health check endpoint
app.get('/health', (_, res) => {
  res.json({ status: 'ok' });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
import { create } from 'zustand';
import { WorkoutSession, HealthMetric, HealthReminder } from '../types/health';
import { healthService } from '../services/health.service';

interface HealthState {
  workouts: WorkoutSession[];
  metrics: HealthMetric[];
  reminders: HealthReminder[];
  loading: boolean;
  error: string | null;
  fetchWorkouts: () => Promise<void>;
  addWorkout: (workout: Omit<WorkoutSession, 'id'>) => Promise<void>;
  deleteWorkout: (id: string) => Promise<void>;
  fetchMetrics: () => Promise<void>;
  addMetric: (metric: Omit<HealthMetric, 'id'>) => Promise<void>;
  fetchReminders: () => Promise<void>;
  addReminder: (reminder: Omit<HealthReminder, 'id'>) => Promise<void>;
}

const useHealthStore = create<HealthState>((set, get) => ({
  workouts: [],
  metrics: [],
  reminders: [],
  loading: false,
  error: null,

  fetchWorkouts: async () => {
    set({ loading: true });
    try {
      const response = await healthService.getWorkouts();
      set({ workouts: response.data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch workouts', loading: false });
    }
  },

  addWorkout: async (workout) => {
    try {
      const response = await healthService.addWorkout(workout);
      set({ workouts: [...get().workouts, response.data] });
    } catch (error) {
      set({ error: 'Failed to add workout' });
    }
  },

  deleteWorkout: async (id) => {
    try {
      await healthService.deleteWorkout(id);
      set({ workouts: get().workouts.filter(w => w.id !== id) });
    } catch (error) {
      set({ error: 'Failed to delete workout' });
    }
  },

  fetchMetrics: async () => {
    set({ loading: true });
    try {
      const response = await healthService.getMetrics();
      set({ metrics: response.data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch metrics', loading: false });
    }
  },

  addMetric: async (metric) => {
    try {
      const response = await healthService.addMetric(metric);
      set({ metrics: [...get().metrics, response.data] });
    } catch (error) {
      set({ error: 'Failed to add metric' });
    }
  },

  fetchReminders: async () => {
    set({ loading: true });
    try {
      const response = await healthService.getReminders();
      set({ reminders: response.data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch reminders', loading: false });
    }
  },

  addReminder: async (reminder) => {
    try {
      const response = await healthService.addReminder(reminder);
      set({ reminders: [...get().reminders, response.data] });
    } catch (error) {
      set({ error: 'Failed to add reminder' });
    }
  },
}));

export default useHealthStore;
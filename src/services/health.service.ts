import api from './api';
import { WorkoutSession, HealthMetric, HealthReminder } from '../types/health';

export const healthService = {
  // Workouts
  getWorkouts: () => api.get<WorkoutSession[]>('/workouts'),
  addWorkout: (workout: Omit<WorkoutSession, 'id'>) => 
    api.post<WorkoutSession>('/workouts', workout),
  updateWorkout: (id: string, workout: Partial<WorkoutSession>) =>
    api.put<WorkoutSession>(`/workouts/${id}`, workout),
  deleteWorkout: (id: string) => api.delete(`/workouts/${id}`),

  // Health Metrics
  getMetrics: () => api.get<HealthMetric[]>('/health-metrics'),
  addMetric: (metric: Omit<HealthMetric, 'id'>) =>
    api.post<HealthMetric>('/health-metrics', metric),
  updateMetric: (id: string, metric: Partial<HealthMetric>) =>
    api.put<HealthMetric>(`/health-metrics/${id}`, metric),

  // Reminders
  getReminders: () => api.get<HealthReminder[]>('/reminders'),
  addReminder: (reminder: Omit<HealthReminder, 'id'>) =>
    api.post<HealthReminder>('/reminders', reminder),
  updateReminder: (id: string, reminder: Partial<HealthReminder>) =>
    api.put<HealthReminder>(`/reminders/${id}`, reminder),
  deleteReminder: (id: string) => api.delete(`/reminders/${id}`),
};
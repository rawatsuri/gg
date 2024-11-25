export interface WorkoutSession {
  id: string;
  date: string;
  type: 'cardio' | 'strength' | 'flexibility';
  duration: number;
  notes?: string;
}

export interface HealthMetric {
  id: string;
  date: string;
  type: 'weight' | 'blood_pressure' | 'blood_sugar';
  value: number;
  unit: string;
}

export interface HealthReminder {
  id: string;
  title: string;
  description: string;
  frequency: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  nextDue: string;
  type: 'medication' | 'test' | 'workout' | 'other';
}
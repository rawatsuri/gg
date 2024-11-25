import { API_BASE_URL, handleResponse } from './config';

export interface Activity {
  id: string;
  type: string;
  duration: number;
  calories: number;
  date: string;
}

export interface WaterIntake {
  id: string;
  amount: number;
  date: string;
}

export interface Sleep {
  id: string;
  startTime: string;
  endTime: string;
  quality: string;
  deepSleep: number;
  lightSleep: number;
  remSleep: number;
}

export interface Meal {
  id: string;
  name: string;
  time: string;
  calories: number;
  items: string[];
}

// Activities
export const getActivities = () => 
  fetch(`${API_BASE_URL}/activities`).then(handleResponse);

export const addActivity = (activity: Omit<Activity, 'id'>) =>
  fetch(`${API_BASE_URL}/activities`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(activity),
  }).then(handleResponse);

// Water Intake
export const addWaterIntake = (intake: Omit<WaterIntake, 'id'>) =>
  fetch(`${API_BASE_URL}/water-intake`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(intake),
  }).then(handleResponse);

// Sleep
export const addSleepRecord = (sleep: Omit<Sleep, 'id'>) =>
  fetch(`${API_BASE_URL}/sleep`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(sleep),
  }).then(handleResponse);

// Nutrition
export const getMeals = () => 
  fetch(`${API_BASE_URL}/meals`).then(handleResponse);

export const addMeal = (meal: Omit<Meal, 'id'>) =>
  fetch(`${API_BASE_URL}/meals`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(meal),
  }).then(handleResponse);
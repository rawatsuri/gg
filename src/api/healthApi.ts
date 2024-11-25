import { API_BASE_URL, handleResponse, getAuthHeaders } from './config';

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
  fetch(`${API_BASE_URL}/health/activities`, {
    headers: getAuthHeaders()
  }).then(handleResponse);

export const addActivity = (activity: Omit<Activity, 'id'>) =>
  fetch(`${API_BASE_URL}/health/activities`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(activity),
  }).then(handleResponse);

// Water Intake
export const getWaterIntake = (date: string) =>
  fetch(`${API_BASE_URL}/health/water-intake?date=${date}`, {
    headers: getAuthHeaders()
  }).then(handleResponse);

export const addWaterIntake = (intake: Omit<WaterIntake, 'id'>) =>
  fetch(`${API_BASE_URL}/health/water-intake`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(intake),
  }).then(handleResponse);

// Sleep
export const getSleepRecords = () =>
  fetch(`${API_BASE_URL}/health/sleep`, {
    headers: getAuthHeaders()
  }).then(handleResponse);

export const addSleepRecord = (sleep: Omit<Sleep, 'id'>) =>
  fetch(`${API_BASE_URL}/health/sleep`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(sleep),
  }).then(handleResponse);

// Meals
export const getMeals = (date: string) =>
  fetch(`${API_BASE_URL}/health/meals?date=${date}`, {
    headers: getAuthHeaders()
  }).then(handleResponse);

export const addMeal = (meal: Omit<Meal, 'id'>) =>
  fetch(`${API_BASE_URL}/health/meals`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(meal),
  }).then(handleResponse);

export const deleteMeal = (id: string) =>
  fetch(`${API_BASE_URL}/health/meals/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  }).then(handleResponse);
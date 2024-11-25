import { API_BASE_URL, handleResponse } from './config';

export interface Bill {
  id: string;
  name: string;
  amount: number;
  dueDate: string;
  status: string;
  recurring: boolean;
}

export interface Investment {
  id: string;
  name: string;
  value: number;
  purchasePrice: number;
  purchaseDate: string;
  type: string;
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  targetDate: string;
}

export interface Income {
  id: string;
  source: string;
  amount: number;
  frequency: string;
  lastUpdated: string;
}

export interface Expense {
  id: string;
  category: string;
  amount: number;
  date: string;
  description: string;
}

// Bills
export const getBills = () => 
  fetch(`${API_BASE_URL}/bills`).then(handleResponse);

export const addBill = (bill: Omit<Bill, 'id'>) =>
  fetch(`${API_BASE_URL}/bills`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(bill),
  }).then(handleResponse);

// Investments
export const getInvestments = () => 
  fetch(`${API_BASE_URL}/investments`).then(handleResponse);

export const addInvestment = (investment: Omit<Investment, 'id'>) =>
  fetch(`${API_BASE_URL}/investments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(investment),
  }).then(handleResponse);

// Savings Goals
export const getSavingsGoals = () => 
  fetch(`${API_BASE_URL}/savings-goals`).then(handleResponse);

export const updateSavingsGoal = (id: string, goal: Partial<SavingsGoal>) =>
  fetch(`${API_BASE_URL}/savings-goals/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(goal),
  }).then(handleResponse);

// Income
export const getIncomeStreams = () => 
  fetch(`${API_BASE_URL}/income`).then(handleResponse);

export const addIncome = (income: Omit<Income, 'id'>) =>
  fetch(`${API_BASE_URL}/income`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(income),
  }).then(handleResponse);

// Expenses
export const getExpenses = () => 
  fetch(`${API_BASE_URL}/expenses`).then(handleResponse);

export const addExpense = (expense: Omit<Expense, 'id'>) =>
  fetch(`${API_BASE_URL}/expenses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(expense),
  }).then(handleResponse);
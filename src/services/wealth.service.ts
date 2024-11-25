import api from './api';
import { Expense, Budget } from '../types/wealth';

export const wealthService = {
  // Expenses
  getExpenses: () => api.get<Expense[]>('/expenses'),
  addExpense: (expense: Omit<Expense, 'id'>) =>
    api.post<Expense>('/expenses', expense),
  updateExpense: (id: string, expense: Partial<Expense>) =>
    api.put<Expense>(`/expenses/${id}`, expense),
  deleteExpense: (id: string) => api.delete(`/expenses/${id}`),

  // Budget
  getBudget: (month: string) => api.get<Budget>(`/budget/${month}`),
  updateBudget: (month: string, budget: Partial<Budget>) =>
    api.put<Budget>(`/budget/${month}`, budget),
};
import { create } from 'zustand';
import { Expense, Budget } from '../types/wealth';
import { wealthService } from '../services/wealth.service';

interface WealthState {
  expenses: Expense[];
  currentBudget: Budget | null;
  loading: boolean;
  error: string | null;
  fetchExpenses: () => Promise<void>;
  addExpense: (expense: Omit<Expense, 'id'>) => Promise<void>;
  fetchBudget: (month: string) => Promise<void>;
  updateBudget: (month: string, budget: Partial<Budget>) => Promise<void>;
}

const useWealthStore = create<WealthState>((set, get) => ({
  expenses: [],
  currentBudget: null,
  loading: false,
  error: null,

  fetchExpenses: async () => {
    set({ loading: true });
    try {
      const response = await wealthService.getExpenses();
      set({ expenses: response.data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch expenses', loading: false });
    }
  },

  addExpense: async (expense) => {
    try {
      const response = await wealthService.addExpense(expense);
      set({ expenses: [...get().expenses, response.data] });
    } catch (error) {
      set({ error: 'Failed to add expense' });
    }
  },

  fetchBudget: async (month) => {
    set({ loading: true });
    try {
      const response = await wealthService.getBudget(month);
      set({ currentBudget: response.data, loading: false });
    } catch (error) {
      set({ error: 'Failed to fetch budget', loading: false });
    }
  },

  updateBudget: async (month, budget) => {
    try {
      const response = await wealthService.updateBudget(month, budget);
      set({ currentBudget: response.data });
    } catch (error) {
      set({ error: 'Failed to update budget' });
    }
  },
}));

export default useWealthStore;
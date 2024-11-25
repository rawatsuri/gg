export interface Expense {
  id: string;
  date: string;
  amount: number;
  category: 'groceries' | 'junk_food' | 'health' | 'other';
  paymentMethod: 'cash' | 'online';
  description: string;
}

export interface Budget {
  id: string;
  month: string;
  categories: {
    groceries: number;
    junk_food: number;
    health: number;
    other: number;
  };
  totalBudget: number;
}
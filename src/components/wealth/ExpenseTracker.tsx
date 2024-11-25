import React from 'react';
import { Receipt, PieChart } from 'lucide-react';

const categories = [
  { name: 'Housing', amount: 1200, percentage: 35, color: 'bg-blue-500' },
  { name: 'Food', amount: 600, percentage: 20, color: 'bg-green-500' },
  { name: 'Transport', amount: 400, percentage: 15, color: 'bg-yellow-500' },
  { name: 'Entertainment', amount: 300, percentage: 10, color: 'bg-purple-500' },
  { name: 'Others', amount: 600, percentage: 20, color: 'bg-gray-500' },
];

export function ExpenseTracker() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Receipt className="w-5 h-5 text-wealth-500 mr-2" />
          <h2 className="text-lg font-semibold">Monthly Expenses</h2>
        </div>
        <button className="text-sm text-wealth-500 hover:text-wealth-600">
          <PieChart className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {categories.map((category) => (
          <div key={category.name}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">{category.name}</span>
              <span className="text-sm text-gray-500">${category.amount}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full">
              <div
                className={`h-2 rounded-full ${category.color}`}
                style={{ width: `${category.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-6 btn btn-primary bg-wealth-500 hover:bg-wealth-600">
        Add Expense
      </button>
    </div>
  );
}
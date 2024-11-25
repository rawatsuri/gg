import React from 'react';
import { Target, Plus } from 'lucide-react';
import { ProgressRing } from '../ProgressRing';

const goals = [
  {
    name: 'Emergency Fund',
    current: 12000,
    target: 15000,
    progress: 80,
    date: '2024'
  },
  {
    name: 'House Down Payment',
    current: 45000,
    target: 100000,
    progress: 45,
    date: '2025'
  }
];

export function SavingsGoals() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Target className="w-5 h-5 text-wealth-500 mr-2" />
          <h2 className="text-lg font-semibold">Savings Goals</h2>
        </div>
        <button className="text-wealth-500 hover:text-wealth-600">
          <Plus className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-6">
        {goals.map((goal) => (
          <div key={goal.name} className="flex items-center space-x-4">
            <ProgressRing progress={goal.progress} size={80} className="flex-shrink-0" />
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">{goal.name}</h3>
                <span className="text-sm text-gray-500">Target: {goal.date}</span>
              </div>
              <p className="text-sm text-gray-600 mb-1">
                ${goal.current.toLocaleString()} of ${goal.target.toLocaleString()}
              </p>
              <div className="h-1.5 bg-gray-100 rounded-full">
                <div
                  className="h-1.5 bg-wealth-500 rounded-full transition-all duration-500"
                  style={{ width: `${goal.progress}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
import React from 'react';
import { DollarSign, TrendingUp } from 'lucide-react';

const incomeStreams = [
  {
    name: 'Primary Job',
    amount: 6500,
    change: '+3.5%',
    trend: 'up'
  },
  {
    name: 'Freelance Work',
    amount: 1200,
    change: '+15.2%',
    trend: 'up'
  },
  {
    name: 'Investments',
    amount: 550,
    change: '+2.1%',
    trend: 'up'
  }
];

export function IncomeStreams() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <DollarSign className="w-5 h-5 text-wealth-500 mr-2" />
          <h2 className="text-lg font-semibold">Income Streams</h2>
        </div>
        <span className="text-sm text-success-500">
          <TrendingUp className="w-4 h-4 inline mr-1" />
          +5.8% MTD
        </span>
      </div>

      <div className="space-y-4">
        {incomeStreams.map((stream) => (
          <div key={stream.name} className="p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">{stream.name}</h3>
              <span className="text-sm text-success-500">{stream.change}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-2xl font-bold">${stream.amount}</span>
              <span className="text-sm text-gray-500">Monthly</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-100">
        <div className="flex justify-between items-center">
          <span className="font-medium">Total Monthly Income</span>
          <span className="text-xl font-bold">$8,250</span>
        </div>
      </div>
    </div>
  );
}
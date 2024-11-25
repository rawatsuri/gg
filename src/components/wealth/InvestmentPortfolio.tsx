import React from 'react';
import { TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const investments = [
  {
    name: 'S&P 500 ETF',
    value: '$45,200',
    change: '+2.5%',
    trend: 'up',
  },
  {
    name: 'Tech Growth Fund',
    value: '$28,400',
    change: '-1.2%',
    trend: 'down',
  },
  {
    name: 'Bitcoin',
    value: '$12,800',
    change: '+5.8%',
    trend: 'up',
  },
];

export function InvestmentPortfolio() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <TrendingUp className="w-5 h-5 text-wealth-500 mr-2" />
          <h2 className="text-lg font-semibold">Investment Portfolio</h2>
        </div>
        <span className="text-sm text-success-500">+4.2% Today</span>
      </div>

      <div className="space-y-4">
        {investments.map((investment) => (
          <div key={investment.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <h3 className="font-medium">{investment.name}</h3>
              <p className="text-sm text-gray-500">{investment.value}</p>
            </div>
            <div className={`flex items-center ${
              investment.trend === 'up' ? 'text-success-500' : 'text-red-500'
            }`}>
              {investment.trend === 'up' ? (
                <ArrowUpRight className="w-4 h-4 mr-1" />
              ) : (
                <ArrowDownRight className="w-4 h-4 mr-1" />
              )}
              <span className="font-medium">{investment.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 flex space-x-4">
        <button className="flex-1 btn btn-primary bg-wealth-500 hover:bg-wealth-600">
          Buy/Sell
        </button>
        <button className="flex-1 btn bg-gray-100 text-gray-700 hover:bg-gray-200">
          View Details
        </button>
      </div>
    </div>
  );
}
import React from 'react';
import { DollarSign, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react';

const stats = [
  {
    title: 'Net Worth',
    value: '$124,500',
    change: '+12.5%',
    trend: 'up',
    icon: DollarSign,
  },
  {
    title: 'Monthly Income',
    value: '$8,250',
    change: '+5.2%',
    trend: 'up',
    icon: TrendingUp,
  },
  {
    title: 'Monthly Expenses',
    value: '$3,840',
    change: '-2.1%',
    trend: 'down',
    icon: TrendingDown,
  },
  {
    title: 'Total Savings',
    value: '$45,200',
    change: '+8.7%',
    trend: 'up',
    icon: PiggyBank,
  },
];

export function WealthOverview() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div key={stat.title} className="bg-white rounded-xl p-4 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <stat.icon className="w-5 h-5 text-wealth-500" />
            <span className={`text-sm font-medium ${
              stat.trend === 'up' ? 'text-success-500' : 'text-red-500'
            }`}>
              {stat.change}
            </span>
          </div>
          <p className="text-sm text-gray-600">{stat.title}</p>
          <p className="text-2xl font-bold mt-1">{stat.value}</p>
        </div>
      ))}
    </div>
  );
}
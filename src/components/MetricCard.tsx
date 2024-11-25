import React from 'react';
import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: LucideIcon;
  trend: 'up' | 'down' | 'neutral';
  className?: string;
}

export function MetricCard({ title, value, change, icon: Icon, trend, className = '' }: MetricCardProps) {
  const trendColor = {
    up: 'text-success-500',
    down: 'text-red-500',
    neutral: 'text-gray-500'
  }[trend];

  return (
    <div className={`bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow ${className}`}>
      <div className="flex items-center justify-between">
        <p className="text-gray-600 text-sm font-medium">{title}</p>
        <Icon className="w-5 h-5 text-primary-500" />
      </div>
      <p className="text-2xl font-bold mt-2">{value}</p>
      <p className={`text-sm ${trendColor} font-medium mt-1`}>
        {change > 0 ? '+' : ''}{change}%
      </p>
    </div>
  );
}
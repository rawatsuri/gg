import React from 'react';
import { LucideIcon } from 'lucide-react';

interface ActivityCardProps {
  icon: LucideIcon;
  title: string;
  value: string;
  target?: string;
  unit?: string;
  color: string;
}

export function ActivityCard({ icon: Icon, title, value, target, unit, color }: ActivityCardProps) {
  const colorClasses = {
    primary: 'bg-primary-50 text-primary-500',
    success: 'bg-success-50 text-success-500',
    red: 'bg-red-50 text-red-500',
    blue: 'bg-blue-50 text-blue-500'
  }[color];

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">
      <div className="flex items-center mb-2">
        <div className={`p-2 rounded-lg ${colorClasses}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      <div className="mt-1">
        <span className="text-2xl font-bold">{value}</span>
        {unit && <span className="text-sm text-gray-500 ml-1">{unit}</span>}
      </div>
      {target && (
        <p className="text-sm text-gray-500 mt-1">
          Target: {target}
        </p>
      )}
    </div>
  );
}
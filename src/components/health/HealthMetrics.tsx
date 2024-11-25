import React from 'react';
import { LineChart, Activity } from 'lucide-react';

const metrics = [
  { label: 'Steps', value: '8,439', target: '10,000', progress: 84 },
  { label: 'Distance', value: '5.2', unit: 'km', target: '8 km', progress: 65 },
  { label: 'Active Minutes', value: '48', unit: 'min', target: '60 min', progress: 80 }
];

export function HealthMetrics() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Activity className="w-5 h-5 text-primary-500 mr-2" />
          <h2 className="text-lg font-semibold">Today's Activity</h2>
        </div>
        <button className="text-primary-500 hover:text-primary-600">
          <LineChart className="w-5 h-5" />
        </button>
      </div>

      <div className="space-y-4">
        {metrics.map((metric) => (
          <div key={metric.label}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-600">{metric.label}</span>
              <span className="text-sm text-gray-500">
                {metric.value}{metric.unit} / {metric.target}
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full">
              <div
                className="h-2 bg-primary-500 rounded-full"
                style={{ width: `${metric.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
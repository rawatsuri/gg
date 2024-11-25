import React from 'react';
import { LineChart, Activity } from 'lucide-react';
import { useQuery } from 'react-query';
import { getActivities } from '../../api/healthApi';
import { format } from 'date-fns';

export function HealthMetrics() {
  const { data: activities } = useQuery('activities', getActivities);

  const todayActivities = activities?.filter(activity => 
    format(new Date(activity.date), 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd')
  ) || [];

  const metrics = [
    {
      label: 'Steps',
      value: todayActivities.find(a => a.type === 'steps')?.value || '0',
      target: '10,000',
      progress: Math.min((parseInt(todayActivities.find(a => a.type === 'steps')?.value || '0') / 10000) * 100, 100)
    },
    {
      label: 'Distance',
      value: todayActivities.find(a => a.type === 'distance')?.value || '0',
      unit: 'km',
      target: '8 km',
      progress: Math.min((parseFloat(todayActivities.find(a => a.type === 'distance')?.value || '0') / 8) * 100, 100)
    },
    {
      label: 'Active Minutes',
      value: todayActivities.reduce((acc, curr) => acc + (curr.duration || 0), 0).toString(),
      unit: 'min',
      target: '60 min',
      progress: Math.min((todayActivities.reduce((acc, curr) => acc + (curr.duration || 0), 0) / 60) * 100, 100)
    }
  ];

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
                className="h-2 bg-primary-500 rounded-full transition-all duration-300"
                style={{ width: `${metric.progress}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
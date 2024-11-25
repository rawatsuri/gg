import React, { useEffect } from 'react';
import { format } from 'date-fns';
import { Activity, Heart, Droplet, Trash2, Edit } from 'lucide-react';
import useHealthStore from '../../store/healthStore';
import { HealthMetric } from '../../types/health';

export default function MetricsList() {
  const { metrics, loading, error, fetchMetrics } = useHealthStore();

  useEffect(() => {
    fetchMetrics();
  }, [fetchMetrics]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  const getMetricIcon = (type: HealthMetric['type']) => {
    switch (type) {
      case 'weight':
        return <Activity className="h-5 w-5" />;
      case 'blood_pressure':
        return <Heart className="h-5 w-5" />;
      case 'blood_sugar':
        return <Droplet className="h-5 w-5" />;
      default:
        return <Activity className="h-5 w-5" />;
    }
  };

  const formatMetricValue = (metric: HealthMetric) => {
    switch (metric.type) {
      case 'weight':
        return `${metric.value} ${metric.unit}`;
      case 'blood_pressure':
        return `${metric.value} ${metric.unit}`;
      case 'blood_sugar':
        return `${metric.value} ${metric.unit}`;
      default:
        return `${metric.value} ${metric.unit}`;
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <ul className="divide-y divide-gray-200">
        {metrics.map((metric) => (
          <li key={metric.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                  {getMetricIcon(metric.type)}
                </span>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900 capitalize">
                    {metric.type.replace('_', ' ')}
                  </p>
                  <p className="text-sm text-gray-500">
                    {formatMetricValue(metric)} • {format(new Date(metric.date), 'PPP')}
                  </p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => {/* Handle edit */}}
                  className="p-1 text-gray-400 hover:text-gray-500"
                >
                  <Edit className="h-5 w-5" />
                </button>
                <button
                  className="p-1 text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
import React from 'react';
import { Moon } from 'lucide-react';

export function SleepQuality() {
  const sleepStages = [
    { stage: 'Deep Sleep', duration: '2h 15m', percentage: 30 },
    { stage: 'Light Sleep', duration: '4h 30m', percentage: 55 },
    { stage: 'REM', duration: '1h 35m', percentage: 15 }
  ];

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center mb-6">
        <Moon className="w-5 h-5 text-primary-500 mr-2" />
        <h2 className="text-lg font-semibold">Sleep Analysis</h2>
      </div>

      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-3xl font-bold">7h 20m</p>
          <p className="text-sm text-gray-500">Total Sleep Time</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-semibold text-success-500">85%</p>
          <p className="text-sm text-gray-500">Sleep Quality</p>
        </div>
      </div>

      <div className="space-y-3">
        {sleepStages.map((stage) => (
          <div key={stage.stage}>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">{stage.stage}</span>
              <span className="text-gray-500">{stage.duration}</span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full">
              <div
                className="h-2 bg-primary-500 rounded-full"
                style={{ width: `${stage.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
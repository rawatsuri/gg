import React from 'react';
import { Trophy, Medal, Target } from 'lucide-react';

const challenges = [
  {
    title: '10K Steps',
    progress: 75,
    icon: Target,
    reward: '50 points'
  },
  {
    title: 'Weekly Workout',
    progress: 60,
    icon: Medal,
    reward: '100 points'
  }
];

export function Challenges() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center mb-6">
        <Trophy className="w-5 h-5 text-primary-500 mr-2" />
        <h2 className="text-lg font-semibold">Active Challenges</h2>
      </div>

      <div className="space-y-4">
        {challenges.map((challenge) => (
          <div key={challenge.title} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <challenge.icon className="w-5 h-5 text-primary-500 mr-2" />
                <h3 className="font-medium">{challenge.title}</h3>
              </div>
              <span className="text-sm text-primary-500">{challenge.reward}</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-primary-500 rounded-full transition-all duration-500"
                style={{ width: `${challenge.progress}%` }}
              />
            </div>
            <p className="text-sm text-gray-500 mt-1">
              {challenge.progress}% Complete
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
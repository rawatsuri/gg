import React from 'react';
import { Shield, Info } from 'lucide-react';

export function CreditScore() {
  const score = 785;
  const maxScore = 850;
  const percentage = (score / maxScore) * 100;

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Shield className="w-5 h-5 text-wealth-500 mr-2" />
          <h2 className="text-lg font-semibold">Credit Score</h2>
        </div>
        <button className="text-gray-400 hover:text-wealth-500">
          <Info className="w-5 h-5" />
        </button>
      </div>

      <div className="flex flex-col items-center mb-6">
        <div className="relative w-48 h-24">
          <svg className="w-full h-full" viewBox="0 0 200 100">
            <path
              d="M20 90 A 80 80 0 0 1 180 90"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="12"
              strokeLinecap="round"
            />
            <path
              d="M20 90 A 80 80 0 0 1 180 90"
              fill="none"
              stroke="#22C55E"
              strokeWidth="12"
              strokeLinecap="round"
              strokeDasharray={`${percentage * 2.8}, 280`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-3xl font-bold">{score}</span>
            <span className="text-sm text-gray-500">Excellent</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Payment History</span>
          <span className="text-sm text-success-500">100%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Credit Utilization</span>
          <span className="text-sm text-success-500">15%</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Account Age</span>
          <span className="text-sm text-success-500">8 years</span>
        </div>
      </div>

      <button className="w-full mt-6 text-sm text-wealth-500 hover:text-wealth-600">
        View Full Report
      </button>
    </div>
  );
}
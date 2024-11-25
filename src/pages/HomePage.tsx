import React from 'react';
import { DashboardHeader } from '../components/DashboardHeader';
import { MetricCard } from '../components/MetricCard';
import { Activity, TrendingUp, Heart, PiggyBank } from 'lucide-react';

export function HomePage() {
  return (
    <div className="pb-20">
      <DashboardHeader />
      
      <main className="max-w-screen-xl mx-auto px-4 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <MetricCard
            title="Daily Steps"
            value="8,439"
            change={12}
            icon={Activity}
            trend="up"
          />
          <MetricCard
            title="Active Time"
            value="48m"
            change={-5}
            icon={Heart}
            trend="down"
          />
          <MetricCard
            title="Investments"
            value="$12,847"
            change={2.5}
            icon={TrendingUp}
            trend="up"
          />
          <MetricCard
            title="Savings"
            value="$3,450"
            change={0}
            icon={PiggyBank}
            trend="neutral"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Quick Actions */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-4">
              <button className="btn btn-primary">Track Workout</button>
              <button className="btn btn-primary">Add Expense</button>
              <button className="btn btn-primary">Log Meal</button>
              <button className="btn btn-primary">View Goals</button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-primary-50 flex items-center justify-center">
                    <Activity className="w-5 h-5 text-primary-500" />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">Morning Run</p>
                    <p className="text-sm text-gray-500">5.2 km • 48 min</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">2h ago</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-wealth-50 flex items-center justify-center">
                    <PiggyBank className="w-5 h-5 text-wealth-500" />
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">Investment Update</p>
                    <p className="text-sm text-gray-500">Portfolio +2.5%</p>
                  </div>
                </div>
                <span className="text-sm text-gray-500">5h ago</span>
              </div>
            </div>
          </div>

          {/* Goals Progress */}
          <div className="bg-white rounded-xl p-6 shadow-sm md:col-span-2">
            <h2 className="text-lg font-semibold mb-4">Monthly Goals Progress</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center">
                <div className="mb-2">
                  <Activity className="w-6 h-6 text-primary-500" />
                </div>
                <h3 className="font-medium mb-1">Fitness Goal</h3>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-primary-500 h-2 rounded-full" style={{ width: '75%' }} />
                </div>
                <p className="text-sm text-gray-500 mt-2">75% Complete</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="mb-2">
                  <Heart className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="font-medium mb-1">Health Goal</h3>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '60%' }} />
                </div>
                <p className="text-sm text-gray-500 mt-2">60% Complete</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="mb-2">
                  <PiggyBank className="w-6 h-6 text-wealth-500" />
                </div>
                <h3 className="font-medium mb-1">Savings Goal</h3>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div className="bg-wealth-500 h-2 rounded-full" style={{ width: '45%' }} />
                </div>
                <p className="text-sm text-gray-500 mt-2">45% Complete</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
import React from 'react';
import { Activity, Apple, Moon, Heart, Droplets, Trophy } from 'lucide-react';
import { ActivityCard } from '../components/health/ActivityCard';
import { HealthMetrics } from '../components/health/HealthMetrics';
import { NutritionTracker } from '../components/health/NutritionTracker';
import { SleepQuality } from '../components/health/SleepQuality';
import { Challenges } from '../components/health/Challenges';
import { WaterIntake } from '../components/health/WaterIntake';

export function HealthPage() {
  return (
    <div className="pb-20">
      <header className="bg-primary-500 text-white py-6">
        <div className="max-w-screen-xl mx-auto px-4">
          <h1 className="text-2xl font-bold">Health Dashboard</h1>
          <div className="flex items-center mt-2 text-primary-50">
            <Activity className="w-5 h-5 mr-2" />
            <span>Your daily health overview</span>
          </div>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-4 py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <ActivityCard
            icon={Apple}
            title="Calories"
            value="1,842"
            target="2,000"
            color="success"
          />
          <ActivityCard
            icon={Moon}
            title="Sleep"
            value="7h 20m"
            target="8h"
            color="primary"
          />
          <ActivityCard
            icon={Heart}
            title="Heart Rate"
            value="72"
            unit="bpm"
            color="red"
          />
          <ActivityCard
            icon={Droplets}
            title="Water"
            value="1.8"
            target="2.5L"
            color="blue"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <HealthMetrics />
            <WaterIntake />
            <Challenges />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <NutritionTracker />
            <SleepQuality />
          </div>
        </div>
      </main>
    </div>
  );
}
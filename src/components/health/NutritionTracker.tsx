import React from 'react';
import { Utensils } from 'lucide-react';

const meals = [
  {
    time: '8:30 AM',
    name: 'Breakfast',
    calories: 420,
    items: ['Oatmeal', 'Banana', 'Almonds']
  },
  {
    time: '1:00 PM',
    name: 'Lunch',
    calories: 650,
    items: ['Grilled Chicken Salad', 'Quinoa']
  },
  {
    time: '4:30 PM',
    name: 'Snack',
    calories: 180,
    items: ['Greek Yogurt', 'Berries']
  }
];

export function NutritionTracker() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Utensils className="w-5 h-5 text-primary-500 mr-2" />
          <h2 className="text-lg font-semibold">Nutrition Tracking</h2>
        </div>
        <button className="text-sm text-primary-500 hover:text-primary-600">
          + Add Meal
        </button>
      </div>

      <div className="space-y-4">
        {meals.map((meal) => (
          <div key={meal.time} className="flex items-start space-x-4">
            <div className="w-16 text-sm text-gray-500">{meal.time}</div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">{meal.name}</h3>
                <span className="text-sm text-gray-500">{meal.calories} cal</span>
              </div>
              <p className="text-sm text-gray-600">
                {meal.items.join(', ')}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
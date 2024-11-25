import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import WorkoutList from './WorkoutList';
import AddWorkoutForm from './AddWorkoutForm';

export default function WorkoutPage() {
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">Workouts</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Add Workout
        </button>
      </div>

      {showAddForm && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Add New Workout</h2>
            <AddWorkoutForm onClose={() => setShowAddForm(false)} />
          </div>
        </div>
      )}

      <WorkoutList />
    </div>
  );
}
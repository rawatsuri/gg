import { useState } from 'react';
import { PlusCircle, Dumbbell } from 'lucide-react';

const WorkoutTracker = () => {
  const [workouts] = useState([
    { id: 1, title: 'Morning Run', type: 'cardio', duration: 30, date: '2024-03-10' },
    { id: 2, title: 'Weight Training', type: 'strength', duration: 45, date: '2024-03-09' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Workout Tracker</h1>
          <p className="text-gray-600">Track and manage your workouts</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Workout
        </button>
      </div>

      <div className="grid gap-4">
        {workouts.map((workout) => (
          <div key={workout.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center">
              <Dumbbell className="h-10 w-10 text-indigo-600 p-2 bg-indigo-100 rounded-lg" />
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{workout.title}</h3>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <span className="capitalize">{workout.type}</span>
                  <span className="mx-2">•</span>
                  <span>{workout.duration} minutes</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(workout.date).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkoutTracker;
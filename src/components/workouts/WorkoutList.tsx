import React, { useEffect } from 'react';
import { format } from 'date-fns';
import { Activity, Trash2, Edit } from 'lucide-react';
import useHealthStore from '../../store/healthStore';
import { WorkoutSession } from '../../types/health';

export default function WorkoutList() {
  const { workouts, loading, error, fetchWorkouts, deleteWorkout } = useHealthStore();

  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts]);

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

  const getWorkoutIcon = (type: WorkoutSession['type']) => {
    return <Activity className="h-5 w-5" />;
  };

  return (
    <div className="bg-white shadow-sm rounded-lg">
      <ul className="divide-y divide-gray-200">
        {workouts.map((workout) => (
          <li key={workout.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <span className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                  {getWorkoutIcon(workout.type)}
                </span>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-900 capitalize">
                    {workout.type} Workout
                  </p>
                  <p className="text-sm text-gray-500">
                    {format(new Date(workout.date), 'PPP')} • {workout.duration} minutes
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
                  onClick={() => deleteWorkout(workout.id)}
                  className="p-1 text-gray-400 hover:text-red-500"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
            {workout.notes && (
              <p className="mt-2 text-sm text-gray-500 ml-14">{workout.notes}</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
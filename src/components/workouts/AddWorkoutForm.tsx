import React from 'react';
import { useForm } from 'react-hook-form';
import { Activity, Clock, FileText } from 'lucide-react';
import useHealthStore from '../../store/healthStore';
import { WorkoutSession } from '../../types/health';

type WorkoutFormData = Omit<WorkoutSession, 'id'>;

export default function AddWorkoutForm({ onClose }: { onClose: () => void }) {
  const { addWorkout } = useHealthStore();
  const { register, handleSubmit, formState: { errors } } = useForm<WorkoutFormData>();

  const onSubmit = async (data: WorkoutFormData) => {
    try {
      await addWorkout(data);
      onClose();
    } catch (error) {
      console.error('Failed to add workout:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Workout Type</label>
        <div className="mt-1 relative">
          <select
            {...register('type', { required: 'Workout type is required' })}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
          >
            <option value="">Select type</option>
            <option value="cardio">Cardio</option>
            <option value="strength">Strength</option>
            <option value="flexibility">Flexibility</option>
          </select>
          <Activity className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        {errors.type && (
          <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Duration (minutes)</label>
        <div className="mt-1 relative">
          <input
            type="number"
            {...register('duration', { 
              required: 'Duration is required',
              min: { value: 1, message: 'Duration must be at least 1 minute' }
            })}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
          />
          <Clock className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
        {errors.duration && (
          <p className="mt-1 text-sm text-red-600">{errors.duration.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Notes (optional)</label>
        <div className="mt-1 relative">
          <textarea
            {...register('notes')}
            rows={3}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
          />
          <FileText className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Add Workout
        </button>
      </div>
    </form>
  );
}
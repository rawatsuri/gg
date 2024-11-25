import React from 'react';
import { useForm } from 'react-hook-form';
import { Activity, Heart, Droplet } from 'lucide-react';
import useHealthStore from '../../store/healthStore';
import { HealthMetric } from '../../types/health';

type MetricFormData = Omit<HealthMetric, 'id'>;

const metricUnits = {
  weight: 'kg',
  blood_pressure: 'mmHg',
  blood_sugar: 'mg/dL'
};

export default function AddMetricForm({ onClose }: { onClose: () => void }) {
  const { addMetric } = useHealthStore();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<MetricFormData>();
  const selectedType = watch('type');

  const onSubmit = async (data: MetricFormData) => {
    try {
      await addMetric({
        ...data,
        unit: metricUnits[data.type as keyof typeof metricUnits],
        date: new Date().toISOString()
      });
      onClose();
    } catch (error) {
      console.error('Failed to add metric:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Metric Type</label>
        <div className="mt-1 relative">
          <select
            {...register('type', { required: 'Metric type is required' })}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
          >
            <option value="">Select type</option>
            <option value="weight">Weight</option>
            <option value="blood_pressure">Blood Pressure</option>
            <option value="blood_sugar">Blood Sugar</option>
          </select>
          {selectedType === 'weight' && <Activity className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />}
          {selectedType === 'blood_pressure' && <Heart className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />}
          {selectedType === 'blood_sugar' && <Droplet className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />}
        </div>
        {errors.type && (
          <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Value</label>
        <div className="mt-1 relative">
          <input
            type="number"
            step="0.1"
            {...register('value', { 
              required: 'Value is required',
              min: { value: 0, message: 'Value must be positive' }
            })}
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
          />
          <span className="absolute right-3 top-2 text-gray-500">
            {selectedType && metricUnits[selectedType as keyof typeof metricUnits]}
          </span>
        </div>
        {errors.value && (
          <p className="mt-1 text-sm text-red-600">{errors.value.message}</p>
        )}
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
          Add Metric
        </button>
      </div>
    </form>
  );
}
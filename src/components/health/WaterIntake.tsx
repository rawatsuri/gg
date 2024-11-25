import React from 'react';
import { Droplets } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { addWaterIntake } from '../../api/healthApi';
import toast from 'react-hot-toast';

export function WaterIntake() {
  const queryClient = useQueryClient();
  const { data: waterIntake } = useQuery('waterIntake', () => {
    const today = new Date();
    return fetch(`${API_BASE_URL}/water-intake?date=${today.toISOString()}`).then(handleResponse);
  });

  const addWaterMutation = useMutation(addWaterIntake, {
    onSuccess: () => {
      queryClient.invalidateQueries('waterIntake');
      toast.success('Water intake updated');
    },
    onError: () => {
      toast.error('Failed to update water intake');
    },
  });

  const target = 2.5; // Liters
  const current = waterIntake?.reduce((acc, record) => acc + record.amount, 0) || 0;
  const percentage = Math.min((current / target) * 100, 100);

  const handleAddWater = (amount: number) => {
    addWaterMutation.mutate({ amount, date: new Date() });
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Droplets className="w-5 h-5 text-primary-500 mr-2" />
          <h2 className="text-lg font-semibold">Water Intake</h2>
        </div>
      </div>

      <div className="flex items-center justify-center mb-4">
        <div className="relative w-32 h-32">
          <svg className="w-full h-full" viewBox="0 0 36 36">
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="3"
            />
            <path
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#0EA5E9"
              strokeWidth="3"
              strokeDasharray={`${percentage}, 100`}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold">{current}L</span>
            <span className="text-sm text-gray-500">of {target}L</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[0.25, 0.5, 0.75, 1].map((amount) => (
          <button
            key={amount}
            onClick={() => handleAddWater(amount)}
            disabled={addWaterMutation.isLoading}
            className="p-2 text-sm text-center rounded-lg border border-gray-200 hover:border-primary-500 hover:text-primary-500 disabled:opacity-50"
          >
            +{amount * 1000}ml
          </button>
        ))}
      </div>
    </div>
  );
}
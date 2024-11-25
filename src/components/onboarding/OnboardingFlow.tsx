import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Heart, DollarSign } from 'lucide-react';
import { OnboardingData } from '../../types/auth';
import { completeOnboarding } from '../../services/auth.service';

const INITIAL_DATA: OnboardingData = {
  height: 0,
  weight: 0,
  targetWeight: 0,
  hasDiabetes: false,
  hasBloodPressure: false,
  monthlyBudget: 0,
  preferredPaymentMethods: [],
};

export default function OnboardingFlow() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<OnboardingData>(INITIAL_DATA);
  const [error, setError] = useState<string | null>(null);

  const updateFields = (fields: Partial<OnboardingData>) => {
    setData(prev => ({ ...prev, ...fields }));
  };

  const nextStep = () => setStep(s => s + 1);
  const prevStep = () => setStep(s => s - 1);

  const handleComplete = async () => {
    try {
      await completeOnboarding(data);
      navigate('/dashboard');
    } catch (error: any) {
      setError(error.response?.data?.message || 'Failed to complete onboarding');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <div className="flex justify-center space-x-8 mb-8">
              {[1, 2, 3].map((num) => (
                <div
                  key={num}
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= num ? 'bg-indigo-600 text-white' : 'bg-gray-200'
                  }`}
                >
                  {num === 1 && <Activity className="h-5 w-5" />}
                  {num === 2 && <Heart className="h-5 w-5" />}
                  {num === 3 && <DollarSign className="h-5 w-5" />}
                </div>
              ))}
            </div>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-red-50 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          {step === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-center">Basic Information</h2>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
                  <input
                    type="number"
                    value={data.height || ''}
                    onChange={e => updateFields({ height: Number(e.target.value) })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Current Weight (kg)</label>
                  <input
                    type="number"
                    value={data.weight || ''}
                    onChange={e => updateFields({ weight: Number(e.target.value) })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-center">Health Conditions</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={data.hasDiabetes}
                    onChange={e => updateFields({ hasDiabetes: e.target.checked })}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">Diabetes</label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={data.hasBloodPressure}
                    onChange={e => updateFields({ hasBloodPressure: e.target.checked })}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">Blood Pressure</label>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-center">Financial Goals</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700">Monthly Budget</label>
                <input
                  type="number"
                  value={data.monthlyBudget || ''}
                  onChange={e => updateFields({ monthlyBudget: Number(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Payment Methods
                </label>
                <div className="space-y-2">
                  {['cash', 'online'].map((method) => (
                    <div key={method} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={data.preferredPaymentMethods.includes(method as 'cash' | 'online')}
                        onChange={(e) => {
                          const methods = e.target.checked
                            ? [...data.preferredPaymentMethods, method as 'cash' | 'online']
                            : data.preferredPaymentMethods.filter(m => m !== method);
                          updateFields({ preferredPaymentMethods: methods });
                        }}
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                      />
                      <label className="ml-2 block text-sm text-gray-900 capitalize">
                        {method}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            <button
              onClick={prevStep}
              disabled={step === 1}
              className={`px-4 py-2 rounded-lg ${
                step === 1
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-gray-600 text-white hover:bg-gray-700'
              }`}
            >
              Previous
            </button>
            <button
              onClick={step === 3 ? handleComplete : nextStep}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              {step === 3 ? 'Complete' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
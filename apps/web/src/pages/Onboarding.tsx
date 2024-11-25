import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, ArrowRight } from 'lucide-react';

const steps = [
  {
    title: 'Welcome to Health+Wealth',
    description: 'Achieve your health and wealth goals with a single app!',
  },
  {
    title: 'Personal Information',
    description: 'Help us customize your experience',
  },
  {
    title: 'Health Goals',
    description: 'Set your health and fitness objectives',
  },
];

const Onboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep === steps.length - 1) {
      navigate('/');
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        <div className="flex items-center justify-center mb-8">
          <Activity className="h-10 w-10 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-900 ml-3">Health+Wealth</h1>
        </div>

        <div className="mb-8">
          <div className="flex justify-between mb-4">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-full mx-1 rounded-full ${
                  index <= currentStep ? 'bg-indigo-600' : 'bg-gray-200'
                }`}
              />
            ))}
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            {steps[currentStep].title}
          </h2>
          <p className="text-gray-600">{steps[currentStep].description}</p>
        </div>

        {/* Step content will be added here based on currentStep */}

        <button
          onClick={handleNext}
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-indigo-700 transition-colors flex items-center justify-center"
        >
          {currentStep === steps.length - 1 ? 'Get Started' : 'Continue'}
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
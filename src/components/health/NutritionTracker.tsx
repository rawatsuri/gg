import React, { useState } from 'react';
import { Utensils, Plus } from 'lucide-react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getMeals, addMeal, deleteMeal } from '../../api/healthApi';
import { format } from 'date-fns';
import toast from 'react-hot-toast';

export function NutritionTracker() {
  const queryClient = useQueryClient();
  const [isAddingMeal, setIsAddingMeal] = useState(false);
  const [newMeal, setNewMeal] = useState({ name: '', calories: '', items: '' });

  const { data: meals } = useQuery(['meals', format(new Date(), 'yyyy-MM-dd')], 
    () => getMeals(format(new Date(), 'yyyy-MM-dd'))
  );

  const addMealMutation = useMutation(addMeal, {
    onSuccess: () => {
      queryClient.invalidateQueries('meals');
      setIsAddingMeal(false);
      setNewMeal({ name: '', calories: '', items: '' });
      toast.success('Meal added successfully');
    },
    onError: () => toast.error('Failed to add meal')
  });

  const deleteMealMutation = useMutation(deleteMeal, {
    onSuccess: () => {
      queryClient.invalidateQueries('meals');
      toast.success('Meal deleted');
    },
    onError: () => toast.error('Failed to delete meal')
  });

  const handleAddMeal = (e: React.FormEvent) => {
    e.preventDefault();
    addMealMutation.mutate({
      name: newMeal.name,
      calories: parseInt(newMeal.calories),
      items: newMeal.items.split(',').map(item => item.trim()),
      time: new Date().toISOString()
    });
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Utensils className="w-5 h-5 text-primary-500 mr-2" />
          <h2 className="text-lg font-semibold">Nutrition Tracking</h2>
        </div>
        <button 
          onClick={() => setIsAddingMeal(!isAddingMeal)}
          className="text-sm text-primary-500 hover:text-primary-600"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {isAddingMeal && (
        <form onSubmit={handleAddMeal} className="mb-6 space-y-4">
          <input
            type="text"
            placeholder="Meal name"
            value={newMeal.name}
            onChange={e => setNewMeal(prev => ({ ...prev, name: e.target.value }))}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Calories"
            value={newMeal.calories}
            onChange={e => setNewMeal(prev => ({ ...prev, calories: e.target.value }))}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Items (comma separated)"
            value={newMeal.items}
            onChange={e => setNewMeal(prev => ({ ...prev, items: e.target.value }))}
            className="w-full p-2 border rounded"
            required
          />
          <button 
            type="submit"
            disabled={addMealMutation.isLoading}
            className="w-full btn btn-primary"
          >
            Add Meal
          </button>
        </form>
      )}

      <div className="space-y-4">
        {meals?.map((meal) => (
          <div key={meal.id} className="flex items-start space-x-4">
            <div className="w-16 text-sm text-gray-500">
              {format(new Date(meal.time), 'HH:mm')}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <h3 className="font-medium">{meal.name}</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">{meal.calories} cal</span>
                  <button
                    onClick={() => deleteMealMutation.mutate(meal.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    ×
                  </button>
                </div>
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
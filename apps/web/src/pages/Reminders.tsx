import { useState } from 'react';
import { PlusCircle, Bell, Calendar } from 'lucide-react';

const Reminders = () => {
  const [reminders] = useState([
    { id: 1, title: 'Blood Sugar Test', type: 'test', date: '2024-03-15', recurring: true },
    { id: 2, title: 'Weekly Progress Review', type: 'appointment', date: '2024-03-17', recurring: true },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reminders</h1>
          <p className="text-gray-600">Manage your health reminders and appointments</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Reminder
        </button>
      </div>

      <div className="grid gap-4">
        {reminders.map((reminder) => (
          <div key={reminder.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center">
              {reminder.type === 'test' ? (
                <Bell className="h-10 w-10 text-yellow-600 p-2 bg-yellow-100 rounded-lg" />
              ) : (
                <Calendar className="h-10 w-10 text-purple-600 p-2 bg-purple-100 rounded-lg" />
              )}
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-semibold text-gray-900">{reminder.title}</h3>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <span className="capitalize">{reminder.type}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(reminder.date).toLocaleDateString()}</span>
                  {reminder.recurring && (
                    <>
                      <span className="mx-2">•</span>
                      <span>Recurring</span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reminders;
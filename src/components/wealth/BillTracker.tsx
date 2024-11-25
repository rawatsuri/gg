import React from 'react';
import { Calendar, AlertCircle } from 'lucide-react';

const bills = [
  {
    name: 'Rent',
    amount: 1200,
    dueDate: '2024-03-01',
    status: 'upcoming',
    recurring: true
  },
  {
    name: 'Electricity',
    amount: 85,
    dueDate: '2024-03-15',
    status: 'upcoming',
    recurring: true
  },
  {
    name: 'Internet',
    amount: 60,
    dueDate: '2024-03-10',
    status: 'paid',
    recurring: true
  }
];

export function BillTracker() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <Calendar className="w-5 h-5 text-wealth-500 mr-2" />
          <h2 className="text-lg font-semibold">Upcoming Bills</h2>
        </div>
        <span className="text-sm text-gray-500">March 2024</span>
      </div>

      <div className="space-y-4">
        {bills.map((bill) => (
          <div
            key={bill.name}
            className={`flex items-center justify-between p-3 rounded-lg ${
              bill.status === 'upcoming' ? 'bg-yellow-50' : 'bg-gray-50'
            }`}
          >
            <div className="flex items-center">
              {bill.status === 'upcoming' && (
                <AlertCircle className="w-4 h-4 text-yellow-500 mr-2" />
              )}
              <div>
                <h3 className="font-medium">{bill.name}</h3>
                <p className="text-sm text-gray-500">Due: {new Date(bill.dueDate).toLocaleDateString()}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium">${bill.amount}</p>
              {bill.recurring && (
                <span className="text-xs text-gray-500">Monthly</span>
              )}
            </div>
          </div>
        ))}
      </div>

      <button className="w-full mt-6 btn btn-primary bg-wealth-500 hover:bg-wealth-600">
        Add Bill
      </button>
    </div>
  );
}
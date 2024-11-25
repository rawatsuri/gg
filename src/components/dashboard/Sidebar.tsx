import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Activity, 
  DollarSign, 
  Calendar, 
  BarChart2, 
  Clock,
  ShoppingCart
} from 'lucide-react';

const navigation = [
  { name: 'Overview', to: '/dashboard', icon: BarChart2 },
  { name: 'Workouts', to: '/dashboard/workouts', icon: Activity },
  { name: 'Health Metrics', to: '/dashboard/health', icon: Activity },
  { name: 'Expenses', to: '/dashboard/expenses', icon: DollarSign },
  { name: 'Reminders', to: '/dashboard/reminders', icon: Clock },
  { name: 'Budget', to: '/dashboard/budget', icon: ShoppingCart },
  { name: 'Calendar', to: '/dashboard/calendar', icon: Calendar },
];

export default function Sidebar() {
  return (
    <div className="w-64 bg-white shadow-sm min-h-screen">
      <nav className="mt-5 px-2">
        <div className="space-y-1">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.to}
              className={({ isActive }) =>
                `group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                  isActive
                    ? 'bg-indigo-100 text-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <item.icon
                className="mr-3 h-5 w-5 flex-shrink-0"
                aria-hidden="true"
              />
              {item.name}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}
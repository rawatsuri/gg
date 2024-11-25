import React from 'react';
import { Bell, Settings, User } from 'lucide-react';
import useAuthStore from '../../store/authStore';

export default function TopBar() {
  const { user } = useAuthStore();

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">Health & Wealth</h1>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <Bell className="h-6 w-6" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <Settings className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-gray-700">{user?.name}</span>
              <User className="h-8 w-8 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
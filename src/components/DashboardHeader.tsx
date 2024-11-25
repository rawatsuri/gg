import React from 'react';
import { Bell, Shield } from 'lucide-react';

export function DashboardHeader() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Welcome back, Alex</p>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-600 hover:text-primary-600">
              <Shield className="w-6 h-6" />
            </button>
            <button className="p-2 text-gray-600 hover:text-primary-600">
              <Bell className="w-6 h-6" />
            </button>
            <img
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-primary-500"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
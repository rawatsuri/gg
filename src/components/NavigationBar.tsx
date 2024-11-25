import React from 'react';
import { Home, Activity, PiggyBank, Trophy, User } from 'lucide-react';

const navItems = [
  { id: 'home', icon: Home, label: 'Home' },
  { id: 'health', icon: Activity, label: 'Health' },
  { id: 'wealth', icon: PiggyBank, label: 'Wealth' },
  { id: 'goals', icon: Trophy, label: 'Goals' },
  { id: 'profile', icon: User, label: 'Profile' }
];

interface NavigationBarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function NavigationBar({ currentPage, onPageChange }: NavigationBarProps) {
  return (
    <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 px-4 py-2">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex justify-between items-center">
          {navItems.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => onPageChange(id)}
              className={`flex flex-col items-center p-2 ${
                currentPage === id ? 'text-primary-600' : 'text-gray-600 hover:text-primary-600'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs mt-1">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
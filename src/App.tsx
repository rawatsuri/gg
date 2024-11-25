import React, { useState } from 'react';
import { NavigationBar } from './components/NavigationBar';
import { HomePage } from './pages/HomePage';
import { HealthPage } from './pages/HealthPage';
import { WealthPage } from './pages/WealthPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'health' && <HealthPage />}
      {currentPage === 'wealth' && <WealthPage />}
      <NavigationBar currentPage={currentPage} onPageChange={setCurrentPage} />
    </div>
  );
}
import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { AuthProvider } from './context/AuthContext';
import { NavigationBar } from './components/NavigationBar';
import { HomePage } from './pages/HomePage';
import { HealthPage } from './pages/HealthPage';
import { WealthPage } from './pages/WealthPage';
import { LoginPage } from './pages/LoginPage';
import { useAuth } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

function AppContent() {
  const { isAuthenticated } = useAuth();
  const [currentPage, setCurrentPage] = React.useState('home');

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'health' && <HealthPage />}
      {currentPage === 'wealth' && <WealthPage />}
      <NavigationBar currentPage={currentPage} onPageChange={setCurrentPage} />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AppContent />
        <Toaster position="top-right" />
      </AuthProvider>
    </QueryClientProvider>
  );
}
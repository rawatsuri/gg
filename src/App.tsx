import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/auth/LoginForm';
import OnboardingFlow from './components/onboarding/OnboardingFlow';
import DashboardLayout from './components/dashboard/DashboardLayout';
import Overview from './components/dashboard/Overview';
import WorkoutPage from './components/workouts/WorkoutPage';
import HealthMetricsPage from './components/health/HealthMetricsPage';
import useAuthStore from './store/authStore';

function App() {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <Router>
      <Routes>
        <Route 
          path="/login" 
          element={!isAuthenticated ? <LoginForm /> : <Navigate to="/dashboard" />} 
        />
        <Route 
          path="/onboarding" 
          element={
            isAuthenticated && !user?.onboardingCompleted 
              ? <OnboardingFlow /> 
              : <Navigate to="/dashboard" />
          } 
        />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="workouts" element={<WorkoutPage />} />
          <Route path="health" element={<HealthMetricsPage />} />
        </Route>
        <Route 
          path="/" 
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} 
        />
      </Routes>
    </Router>
  );
}
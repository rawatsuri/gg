import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Onboarding from './pages/Onboarding';
import WorkoutTracker from './pages/WorkoutTracker';
import HealthReports from './pages/HealthReports';
import Reminders from './pages/Reminders';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/onboarding" element={<Onboarding />} />
          <Route element={<Layout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/workouts" element={<WorkoutTracker />} />
            <Route path="/health-reports" element={<HealthReports />} />
            <Route path="/reminders" element={<Reminders />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
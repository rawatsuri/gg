import { Outlet } from 'react-router-dom';
import { Activity, FileText, Bell, LayoutDashboard } from 'lucide-react';
import Sidebar from './Sidebar';

const Layout = () => {
  const menuItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Activity, label: 'Workouts', path: '/workouts' },
    { icon: FileText, label: 'Health Reports', path: '/health-reports' },
    { icon: Bell, label: 'Reminders', path: '/reminders' },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar menuItems={menuItems} />
      <main className="flex-1 overflow-auto">
        <div className="container mx-auto px-6 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;
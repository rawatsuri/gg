import { Link, useLocation } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface MenuItem {
  icon: LucideIcon;
  label: string;
  path: string;
}

interface SidebarProps {
  menuItems: MenuItem[];
}

const Sidebar = ({ menuItems }: SidebarProps) => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-white border-r border-gray-200">
      <div className="h-full px-3 py-4 overflow-y-auto">
        <div className="flex items-center mb-8 px-2">
          <Activity className="h-8 w-8 text-indigo-600" />
          <span className="ml-3 text-xl font-bold text-gray-800">Health+Wealth</span>
        </div>
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center p-2 text-base font-normal rounded-lg hover:bg-gray-100 ${
                    isActive ? 'bg-indigo-50 text-indigo-600' : 'text-gray-900'
                  }`}
                >
                  <Icon className={`w-6 h-6 ${isActive ? 'text-indigo-600' : 'text-gray-500'}`} />
                  <span className="ml-3">{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
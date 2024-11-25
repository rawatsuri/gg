import { Activity, TrendingUp, Calendar, Clock } from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Track your health and wealth progress</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <Activity className="h-12 w-12 text-indigo-600 p-2 bg-indigo-100 rounded-lg" />
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Active Workouts</h3>
              <p className="text-2xl font-semibold text-gray-900">3</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <TrendingUp className="h-12 w-12 text-green-600 p-2 bg-green-100 rounded-lg" />
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Health Score</h3>
              <p className="text-2xl font-semibold text-gray-900">85%</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <Calendar className="h-12 w-12 text-blue-600 p-2 bg-blue-100 rounded-lg" />
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Next Check-up</h3>
              <p className="text-2xl font-semibold text-gray-900">Mar 15</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center">
            <Clock className="h-12 w-12 text-purple-600 p-2 bg-purple-100 rounded-lg" />
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Reminders</h3>
              <p className="text-2xl font-semibold text-gray-900">2</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h2>
          <div className="space-y-4">
            {/* Activity items will be mapped here */}
            <div className="flex items-center">
              <div className="h-2 w-2 bg-green-500 rounded-full"></div>
              <p className="ml-3 text-sm text-gray-600">Completed morning workout</p>
              <span className="ml-auto text-xs text-gray-400">2h ago</span>
            </div>
            <div className="flex items-center">
              <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
              <p className="ml-3 text-sm text-gray-600">Updated health report</p>
              <span className="ml-auto text-xs text-gray-400">5h ago</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Reminders</h2>
          <div className="space-y-4">
            {/* Reminder items will be mapped here */}
            <div className="flex items-center">
              <div className="h-2 w-2 bg-yellow-500 rounded-full"></div>
              <p className="ml-3 text-sm text-gray-600">Blood Sugar Test</p>
              <span className="ml-auto text-xs text-gray-400">Tomorrow</span>
            </div>
            <div className="flex items-center">
              <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
              <p className="ml-3 text-sm text-gray-600">Weekly Progress Review</p>
              <span className="ml-auto text-xs text-gray-400">in 3 days</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
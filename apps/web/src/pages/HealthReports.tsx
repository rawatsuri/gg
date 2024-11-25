import { useState } from 'react';
import { PlusCircle, Activity, TrendingUp } from 'lucide-react';

const HealthReports = () => {
  const [reports] = useState([
    { id: 1, type: 'blood_pressure', value: 120, unit: 'mmHg', date: '2024-03-10' },
    { id: 2, type: 'blood_sugar', value: 95, unit: 'mg/dL', date: '2024-03-09' },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Health Reports</h1>
          <p className="text-gray-600">Track your health metrics</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          <PlusCircle className="w-5 h-5 mr-2" />
          Add Report
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center mb-4">
            <Activity className="h-10 w-10 text-blue-600 p-2 bg-blue-100 rounded-lg" />
            <h2 className="ml-3 text-lg font-semibold text-gray-900">Latest Readings</h2>
          </div>
          <div className="space-y-4">
            {reports.map((report) => (
              <div key={report.id} className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 capitalize">
                    {report.type.replace('_', ' ')}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(report.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">
                    {report.value} {report.unit}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center mb-4">
            <TrendingUp className="h-10 w-10 text-green-600 p-2 bg-green-100 rounded-lg" />
            <h2 className="ml-3 text-lg font-semibold text-gray-900">Trends</h2>
          </div>
          <p className="text-gray-600">Health trends visualization will be displayed here</p>
        </div>
      </div>
    </div>
  );
}

export default HealthReports;
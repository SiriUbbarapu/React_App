import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Calculator, BarChart3, History, UserCircle, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const navigate = useNavigate();
  const { logout, user } = useAuth();

  const menuItems = [
    { icon: Calculator, label: 'BMI Calculator', path: '/calculator' },
    { icon: BarChart3, label: 'BMI Chart', path: '/chart' },
    { icon: History, label: 'History', path: '/history' },
    { icon: UserCircle, label: 'Account Details', path: '/account' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-800">
            Welcome, {user?.name || 'User'}
          </h1>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
          >
            <LogOut className="h-5 w-5" />
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow flex items-center gap-4"
              >
                <Icon className="h-8 w-8 text-blue-600" />
                <span className="text-lg font-medium text-gray-800">{item.label}</span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 bg-blue-50 rounded-xl p-6">
          <h2 className="text-xl font-semibold text-blue-900 mb-4">Quick Tips</h2>
          <ul className="list-disc list-inside space-y-2 text-blue-800">
            <li>Regular BMI monitoring helps track your health progress</li>
            <li>Combine BMI insights with a balanced diet and exercise</li>
            <li>Check your BMI history to observe long-term trends</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
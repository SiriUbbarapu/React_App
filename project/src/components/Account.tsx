import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Account() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="flex items-center gap-3 mb-8">
            <UserCircle className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">Account Details</h1>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-500">Name</label>
              <p className="mt-1 text-lg text-gray-800">{user?.name}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500">Email</label>
              <p className="mt-1 text-lg text-gray-800">{user?.email}</p>
            </div>

            <div className="pt-6 border-t">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">BMI Statistics</h2>
              <BmiStats userEmail={user?.email} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BmiStats({ userEmail }: { userEmail?: string }) {
  const history = JSON.parse(localStorage.getItem(`bmi-history-${userEmail}`) || '[]');
  
  if (history.length === 0) {
    return <p className="text-gray-600">No BMI records available.</p>;
  }

  const latest = history[history.length - 1];
  const first = history[0];
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-500">Latest BMI</p>
        <p className="text-xl font-semibold text-gray-800">{latest.bmi.toFixed(1)}</p>
        <p className="text-sm text-gray-600">{new Date(latest.date).toLocaleDateString()}</p>
      </div>
      
      <div className="p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-500">Total Measurements</p>
        <p className="text-xl font-semibold text-gray-800">{history.length}</p>
      </div>
    </div>
  );
}
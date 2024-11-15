import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, History as HistoryIcon, TrendingUp, TrendingDown } from 'lucide-react';

export default function History() {
  const navigate = useNavigate();

  // Mock data - in a real app, this would come from a backend
  const bmiHistory = [
    { date: '2024-03-15', bmi: 24.5, trend: 'down' },
    { date: '2024-03-01', bmi: 25.1, trend: 'down' },
    { date: '2024-02-15', bmi: 25.8, trend: 'up' },
    { date: '2024-02-01', bmi: 25.5, trend: 'neutral' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-8"
        >
          <ArrowLeft className="h-5 w-5" />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <div className="flex items-center gap-3 mb-8">
            <HistoryIcon className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">BMI History</h1>
          </div>

          <div className="space-y-4">
            {bmiHistory.map((record, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="text-sm text-gray-600">
                    {new Date(record.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-lg font-semibold text-gray-800">BMI: {record.bmi}</p>
                </div>
                {record.trend === 'up' && <TrendingUp className="h-5 w-5 text-red-500" />}
                {record.trend === 'down' && <TrendingDown className="h-5 w-5 text-green-500" />}
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-blue-50 rounded-lg">
            <h2 className="text-xl font-semibold text-blue-900 mb-4">Progress Overview</h2>
            <p className="text-blue-800">
              Your BMI has improved by 1.3 points over the last month. Keep up the good work!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
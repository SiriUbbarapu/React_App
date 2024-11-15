import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, BarChart } from 'lucide-react';

export default function BmiChart() {
  const navigate = useNavigate();

  const categories = [
    { range: 'Less than 18.5', category: 'Underweight', color: 'bg-yellow-100 text-yellow-800' },
    { range: '18.5 - 24.9', category: 'Normal weight', color: 'bg-green-100 text-green-800' },
    { range: '25.0 - 29.9', category: 'Overweight', color: 'bg-orange-100 text-orange-800' },
    { range: '30.0 or higher', category: 'Obese', color: 'bg-red-100 text-red-800' }
  ];

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
            <BarChart className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">BMI Categories</h1>
          </div>

          <div className="space-y-4">
            {categories.map((item) => (
              <div
                key={item.category}
                className={`p-4 rounded-lg ${item.color}`}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">{item.category}</span>
                  <span>BMI: {item.range}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-gray-50 rounded-lg">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Understanding BMI</h2>
            <p className="text-gray-600">
              Body Mass Index (BMI) is a simple measure that uses your height and weight to work out if
              your weight is healthy. The BMI calculation divides an adult's weight in kilograms by
              their height in metres squared.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
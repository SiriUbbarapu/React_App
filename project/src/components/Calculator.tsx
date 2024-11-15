import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calculator as CalcIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface BMIResult {
  bmi: number;
  category: string;
  color: string;
}

export default function Calculator() {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState<BMIResult | null>(null);
  const navigate = useNavigate();
  const { user } = useAuth();

  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault();
    const heightInM = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);
    const bmi = weightInKg / (heightInM * heightInM);

    let category: string;
    let color: string;

    if (bmi < 18.5) {
      category = 'Underweight';
      color = 'text-yellow-600';
    } else if (bmi >= 18.5 && bmi < 25) {
      category = 'Normal weight';
      color = 'text-green-600';
    } else if (bmi >= 25 && bmi < 30) {
      category = 'Overweight';
      color = 'text-orange-600';
    } else {
      category = 'Obese';
      color = 'text-red-600';
    }

    setResult({ bmi, category, color });

    // Save to history
    const history = JSON.parse(localStorage.getItem(`bmi-history-${user?.email}`) || '[]');
    history.push({
      date: new Date().toISOString(),
      bmi,
      category,
      weight: weightInKg,
      height: parseFloat(height)
    });
    localStorage.setItem(`bmi-history-${user?.email}`, JSON.stringify(history));
  };

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
            <CalcIcon className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">BMI Calculator</h1>
          </div>

          <form onSubmit={calculateBMI} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
                min="1"
                max="300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="mt-1 w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
                min="1"
                max="500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Calculate BMI
            </button>
          </form>

          {result && (
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Results</h2>
              <div className="space-y-2">
                <p className="text-gray-600">
                  Your BMI is: <span className="font-semibold">{result.bmi.toFixed(1)}</span>
                </p>
                <p className="text-gray-600">
                  Category: <span className={`font-semibold ${result.color}`}>{result.category}</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
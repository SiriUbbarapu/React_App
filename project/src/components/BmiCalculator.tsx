import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calculator, AlertCircle } from 'lucide-react';

export default function BmiCalculator() {
  const navigate = useNavigate();
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBmi] = useState<number | null>(null);

  const calculateBMI = (e: React.FormEvent) => {
    e.preventDefault();
    const heightInMeters = parseFloat(height) / 100;
    const weightInKg = parseFloat(weight);
    const calculatedBMI = weightInKg / (heightInMeters * heightInMeters);
    setBmi(parseFloat(calculatedBMI.toFixed(1)));
  };

  const getBmiCategory = (bmi: number) => {
    if (bmi < 18.5) return { category: 'Underweight', color: 'text-yellow-600', advice: 'Consider consulting a nutritionist for a healthy weight gain plan.' };
    if (bmi < 25) return { category: 'Normal weight', color: 'text-green-600', advice: 'Maintain your healthy lifestyle with balanced diet and regular exercise.' };
    if (bmi < 30) return { category: 'Overweight', color: 'text-orange-600', advice: 'Focus on portion control and increasing physical activity.' };
    return { category: 'Obese', color: 'text-red-600', advice: 'Please consult a healthcare provider for personalized advice.' };
  };

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
            <Calculator className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold text-gray-800">BMI Calculator</h1>
          </div>

          <form onSubmit={calculateBMI} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 transition-colors"
            >
              Calculate BMI
            </button>
          </form>

          {bmi && (
            <div className="mt-8 p-6 bg-gray-50 rounded-lg">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Results</h2>
              <div className="space-y-4">
                <p className="text-3xl font-bold text-blue-600">BMI: {bmi}</p>
                <div className={`flex items-start gap-2 ${getBmiCategory(bmi).color}`}>
                  <AlertCircle className="h-5 w-5 mt-1" />
                  <div>
                    <p className="font-medium">{getBmiCategory(bmi).category}</p>
                    <p className="text-gray-600 mt-1">{getBmiCategory(bmi).advice}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';

// Simple Landing Page Component
const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">
          AgriScan AI
        </h1>
        <p className="text-2xl text-gray-600 mb-8">
          Transform Drone Imagery into Actionable Insights
        </p>
        <div className="flex gap-4 justify-center">
          <a href="/dashboard" className="px-8 py-4 bg-green-600 text-white rounded-full font-bold hover:bg-green-700 transition">
            Start Analysis
          </a>
          <button className="px-8 py-4 bg-white text-gray-800 border-2 border-gray-200 rounded-full font-bold hover:border-green-500 transition">
            View Demo
          </button>
        </div>
      </div>
    </div>
  );
};

// Simple Dashboard Page
const DashboardPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <p className="text-gray-600">Upload drone imagery for analysis...</p>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </Router>
  );
}

export default App;

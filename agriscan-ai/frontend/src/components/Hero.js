import React from 'react';

function Hero() {
  return (
    <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-4">AgriScan AI</h1>
        <p className="text-xl text-green-100">
          Bridging the gap between raw data and food security
        </p>
        <p className="text-sm text-green-200 mt-4">
          AI-powered drone image analysis for pest detection, nutrient monitoring, and yield prediction
        </p>
      </div>
    </div>
  );
}

export default Hero;

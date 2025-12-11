import React from 'react';

function ResultsDashboard({ results, onDownload, onNewAnalysis }) {
  const { pest_detection, nutrient_analysis, yield_prediction, recommendations } = results;

  const getNutrientColor = (value) => {
    if (value >= 70) return 'bg-green-500';
    if (value >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Analysis Results</h2>
        <button
          onClick={onNewAnalysis}
          className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          New Analysis
        </button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {/* Pest Detection Card */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">🐛 Pest Detection</h3>
          <div className={`text-3xl font-bold mb-2 ${pest_detection.status === 'High Alert' ? 'text-red-500' : 'text-green-500'}`}>
            {pest_detection.status}
          </div>
          <p className="text-gray-500">{pest_detection.total_pests} pest(s) detected</p>
          {pest_detection.detections.length > 0 && (
            <div className="mt-4 space-y-2">
              {pest_detection.detections.map((pest, idx) => (
                <div key={idx} className="text-sm bg-gray-100 rounded p-2">
                  <span className="font-medium">{pest.pest_type}</span>
                  <span className="text-gray-500 ml-2">({Math.round(pest.confidence * 100)}%)</span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Nutrient Analysis Card */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">🌱 Nutrient Analysis</h3>
          <div className="space-y-4">
            {['nitrogen', 'phosphorus', 'potassium'].map((nutrient) => (
              <div key={nutrient}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="capitalize">{nutrient} (N/P/K)</span>
                  <span>{nutrient_analysis[nutrient]}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${getNutrientColor(nutrient_analysis[nutrient])}`}
                    style={{ width: `${nutrient_analysis[nutrient]}%` }}
                  ></div>
                </div>
              </div>
            ))}
            <div className="pt-2 border-t">
              <span className="text-gray-600">Overall Health: </span>
              <span className="font-bold text-green-600">{nutrient_analysis.overall_health}%</span>
            </div>
          </div>
        </div>

        {/* Yield Prediction Card */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">📊 Yield Prediction</h3>
          <div className="text-4xl font-bold text-blue-600 mb-2">
            {yield_prediction.estimated_yield}
          </div>
          <p className="text-gray-500">{yield_prediction.unit}</p>
          <p className="text-sm text-gray-400 mt-2">
            Confidence: {Math.round(yield_prediction.confidence * 100)}%
          </p>
        </div>
      </div>

      {/* Recommendations */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">💡 Actionable Insights</h3>
        <ul className="space-y-2 mb-6">
          {recommendations.map((rec, idx) => (
            <li key={idx} className="flex items-start">
              <span className="text-green-500 mr-2">✓</span>
              <span className="text-gray-600">{rec}</span>
            </li>
          ))}
        </ul>
        <button
          onClick={onDownload}
          className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white py-3 rounded-lg font-medium transition-all"
        >
          📥 Download Spray Maps
        </button>
      </div>
    </div>
  );
}

export default ResultsDashboard;

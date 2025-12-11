import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import FieldMap from './components/FieldMap';
import AnalysisCard from './components/AnalysisCard';

function App() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = async (file) => {
    setLoading(true);
    setError(null);
    setSelectedImage(URL.createObjectURL(file));

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Analysis failed');
      const data = await response.json();
      setResults(data);
    } catch (err) {
      // Use demo data if backend is not available
      setResults({
        image_id: 'demo-' + Date.now(),
        pest_detection: {
          alert_level: 'High Alert',
          total_pests: 3,
          pests_detected: [
            { label: 'Aphid', confidence: 0.92 },
            { label: 'Caterpillar', confidence: 0.87 },
            { label: 'Whitefly', confidence: 0.79 },
          ],
          recommendation: 'Apply targeted pesticide in zones B2, C3',
        },
        nutrient_analysis: {
          overall_health: 'Low Nitrogen',
          deficiencies: { nitrogen: 35, phosphorus: 12, potassium: 8 },
          affected_zones: ['A3', 'B3', 'C1'],
          recommendation: 'Apply 45kg/ha nitrogen fertilizer',
        },
        yield_prediction: {
          predicted_yield: 4.2,
          unit: 'tons/ha',
          harvest_ready_in: 28,
          confidence: 0.89,
          comparison: '+12.5% vs last season',
        },
        field_zones: [
          { id: 'A1', status: 'healthy', score: 92 },
          { id: 'A2', status: 'healthy', score: 88 },
          { id: 'A3', status: 'warning', score: 65 },
          { id: 'A4', status: 'healthy', score: 90 },
          { id: 'B1', status: 'healthy', score: 85 },
          { id: 'B2', status: 'critical', score: 35 },
          { id: 'B3', status: 'warning', score: 58 },
          { id: 'B4', status: 'healthy', score: 91 },
          { id: 'C1', status: 'warning', score: 62 },
          { id: 'C2', status: 'healthy', score: 89 },
          { id: 'C3', status: 'critical', score: 42 },
          { id: 'C4', status: 'healthy', score: 87 },
        ],
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) handleImageUpload(file);
  };

  const downloadReport = () => {
    const element = document.createElement('a');
    const file = new Blob([JSON.stringify(results, null, 2)], { type: 'application/json' });
    element.href = URL.createObjectURL(file);
    element.download = `agriscan_report_${results.image_id}.json`;
    element.click();
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-gray-900 to-cyan-900/20"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 rounded-full mb-6">
            <span>🏆</span>
            <span className="text-green-400 text-sm font-medium">Smart India Hackathon 2025</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              AgriScan AI
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">
            Transforming Raw Data into Food Security
          </p>
          <p className="text-gray-400 mb-8 max-w-xl mx-auto">
            AI-powered drone image analysis for pest detection, nutrient monitoring, and yield prediction
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 flex-wrap mb-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">500+</div>
              <div className="text-sm text-gray-500">Hectares/2hrs</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-400">90%</div>
              <div className="text-sm text-gray-500">Waste Reduction</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">4wk</div>
              <div className="text-sm text-gray-500">Early Forecast</div>
            </div>
          </div>

          <a
            href="#demo"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-cyan-500 text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg hover:from-green-400 hover:to-cyan-400 transition-all transform hover:scale-105"
          >
            <span>▶</span> Try Demo Analysis
          </a>
        </div>
      </section>

      {/* Demo Section */}
      <section id="demo" className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              Interactive Demo
            </span>
          </h2>

          {!results ? (
            /* Upload Interface */
            <div className="max-w-2xl mx-auto">
              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="border-2 border-dashed border-green-500/50 rounded-2xl p-12 text-center bg-gray-800/50 hover:border-green-400 transition-colors cursor-pointer"
              >
                {loading ? (
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin mb-4"></div>
                    <p className="text-green-400">Analyzing drone imagery...</p>
                    <p className="text-gray-500 text-sm mt-2">Running AI pipeline</p>
                  </div>
                ) : (
                  <>
                    <div className="text-6xl mb-4">🚁</div>
                    <h3 className="text-xl font-semibold text-white mb-2">Upload Drone Imagery</h3>
                    <p className="text-gray-400 mb-6">Drag and drop your drone image or click to browse</p>
                    <label className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-cyan-500 text-gray-900 px-6 py-3 rounded-lg font-semibold cursor-pointer hover:from-green-400 hover:to-cyan-400 transition-all">
                      <span>📁</span> Select Image
                      <input type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
                    </label>
                    <p className="text-gray-500 text-sm mt-4">Supports JPG, PNG • Demo data will be used</p>
                  </>
                )}
              </div>
              {error && <p className="text-red-400 text-center mt-4">{error}</p>}
            </div>
          ) : (
            /* Results Dashboard */
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">Analysis Results</h3>
                <button
                  onClick={() => { setResults(null); setSelectedImage(null); }}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  ← New Analysis
                </button>
              </div>

              <div className="grid lg:grid-cols-3 gap-6">
                {/* Left Column - Upload & Image */}
                <div className="space-y-4">
                  {selectedImage && (
                    <div className="bg-gray-800 rounded-xl p-4">
                      <h4 className="text-sm text-gray-400 mb-2">Uploaded Image</h4>
                      <img src={selectedImage} alt="Drone" className="w-full rounded-lg" />
                    </div>
                  )}
                  <FieldMap zones={results.field_zones} />
                </div>

                {/* Center & Right - Results */}
                <div className="lg:col-span-2 space-y-4">
                  <div className="grid md:grid-cols-3 gap-4">
                    {/* Pest Detection */}
                    <AnalysisCard
                      title="Pest Detection"
                      icon="🐛"
                      status={results.pest_detection.alert_level}
                      statusColor={results.pest_detection.alert_level === 'High Alert' ? 'red' : 'green'}
                      value={results.pest_detection.total_pests}
                      subtext="locations"
                    >
                      <div className="mt-3 space-y-1">
                        {results.pest_detection.pests_detected.slice(0, 3).map((pest, i) => (
                          <div key={i} className="flex justify-between text-xs">
                            <span className="text-gray-400">{pest.label}</span>
                            <span className="text-green-400">{Math.round(pest.confidence * 100)}%</span>
                          </div>
                        ))}
                      </div>
                    </AnalysisCard>

                    {/* Nutrient Analysis */}
                    <AnalysisCard
                      title="NPK Status"
                      icon="🧪"
                      status={results.nutrient_analysis.overall_health}
                      statusColor={results.nutrient_analysis.overall_health.includes('Low') ? 'yellow' : 'green'}
                    >
                      <div className="space-y-2 mt-3">
                        {Object.entries(results.nutrient_analysis.deficiencies).map(([key, val]) => (
                          <div key={key}>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-gray-400 capitalize">{key}</span>
                              <span className="text-white">{val}%</span>
                            </div>
                            <div className="w-full bg-gray-700 rounded-full h-1.5">
                              <div
                                className={`h-1.5 rounded-full ${val > 30 ? 'bg-red-500' : val > 15 ? 'bg-yellow-500' : 'bg-green-500'}`}
                                style={{ width: `${Math.min(val * 2, 100)}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </AnalysisCard>

                    {/* Yield Prediction */}
                    <AnalysisCard
                      title="Yield Forecast"
                      icon="📈"
                      status="On Track"
                      statusColor="green"
                      value={results.yield_prediction.predicted_yield}
                      subtext={results.yield_prediction.unit}
                      details={[
                        { label: 'Harvest in', value: `${results.yield_prediction.harvest_ready_in} days` },
                        { label: 'Confidence', value: `${Math.round(results.yield_prediction.confidence * 100)}%` },
                        { label: 'vs Last', value: results.yield_prediction.comparison },
                      ]}
                    />
                  </div>

                  {/* Recommendations */}
                  <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700">
                    <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
                      <span>💡</span> Actionable Insights
                    </h4>
                    <div className="space-y-2 mb-6">
                      <p className="text-gray-300 text-sm flex items-start gap-2">
                        <span className="text-green-400">✓</span>
                        {results.pest_detection.recommendation}
                      </p>
                      <p className="text-gray-300 text-sm flex items-start gap-2">
                        <span className="text-green-400">✓</span>
                        {results.nutrient_analysis.recommendation}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        onClick={downloadReport}
                        className="flex-1 bg-gradient-to-r from-green-500 to-cyan-500 text-gray-900 py-3 rounded-lg font-semibold hover:from-green-400 hover:to-cyan-400 transition-all"
                      >
                        📥 Download Spray Map
                      </button>
                      <button className="flex-1 border border-green-500/50 text-green-400 py-3 rounded-lg font-semibold hover:bg-green-500/10 transition-all">
                        📥 NPK Plan
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 bg-gray-800/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            <span className="bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              AI-Powered Features
            </span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: '🐛', title: 'Pest Detection', desc: 'YOLOv8 real-time detection catches infestations at 5% loss vs 50%', tech: 'YOLOv8' },
              { icon: '🧪', title: 'Nutrient Analysis', desc: 'DeepLabV3+ spectral analysis reduces fertilizer waste by 90%', tech: 'DeepLabv3+' },
              { icon: '📈', title: 'Yield Prediction', desc: 'CNN-Regressor forecasts harvest volume 4 weeks early', tech: 'CNN-Regressor' },
            ].map((f, i) => (
              <div key={i} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-green-500/50 transition-all hover:transform hover:-translate-y-1">
                <div className="text-4xl mb-4">{f.icon}</div>
                <h3 className="text-xl font-semibold text-white mb-2">{f.title}</h3>
                <p className="text-gray-400 mb-4">{f.desc}</p>
                <span className="inline-block px-3 py-1 bg-green-500/10 text-green-400 text-sm rounded-full">{f.tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-800">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-500">
            Copyright © 2025 AgriScan AI | Built for Smart India Hackathon Prototype
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;

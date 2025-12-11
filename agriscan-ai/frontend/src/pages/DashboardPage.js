import React, { useState, useEffect } from 'react';
import UploadInterface from '../components/UploadInterface';
import ResultsDashboard from '../components/ResultsDashboard';
import { motion } from 'framer-motion';
import { Sprout, Activity, BarChart2 } from 'lucide-react';
import axios from 'axios';

const API_Base = 'http://localhost:8000/api';

function DashboardPage() {
  const [image, setImage] = useState(null);
  const [imageId, setImageId] = useState(null);
  const [analysisStatus, setAnalysisStatus] = useState({
    pest: { status: 'idle', progress: 0, result: null },
    nutrient: { status: 'idle', progress: 0, result: null },
    yield: { status: 'idle', progress: 0, result: null }
  });
  const [showResults, setShowResults] = useState(false);

  const startAnalysis = async (type, endpoint) => {
    try {
      setAnalysisStatus(prev => ({ ...prev, [type]: { status: 'processing', progress: 10, result: null } }));

      // Start Analysis
      const res = await axios.post(`${API_Base}/analysis/${endpoint}`, {
        field_id: 'demo-field-1', // Mock field ID
        image_id: imageId,
        ...(type === 'pest' ? { confidence_threshold: 0.75 } : {}),
        ...(type === 'nutrient' ? { crop_type: 'corn' } : {}),
        ...(type === 'yield' ? { historical_yield: 4.5 } : {})
      });

      const analysisId = res.data.id;

      // Connect WebSocket
      const ws = new WebSocket(`ws://localhost:8000/ws/analysis/${analysisId}`);

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.status === 'processing') {
          setAnalysisStatus(prev => ({
            ...prev,
            [type]: { ...prev[type], status: 'processing', progress: data.progress || 50 }
          }));
        } else if (data.status === 'complete') {
          setAnalysisStatus(prev => ({
            ...prev,
            [type]: { status: 'complete', progress: 100, result: data.data }
          }));
          ws.close();
        } else if (data.status === 'error') {
          setAnalysisStatus(prev => ({
            ...prev,
            [type]: { status: 'error', progress: 0, result: null }
          }));
          ws.close();
        }
      };

      ws.onerror = (e) => {
        console.error("WS Error", e);
        // Fallback or retry logic could go here
      };

    } catch (e) {
      console.error(e);
      setAnalysisStatus(prev => ({ ...prev, [type]: { status: 'error', result: null } }));
    }
  };

  const handleImageUpload = async (file) => {
    setImage(file);
    // Upload logic
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await axios.post(`${API_Base}/upload/image`, formData);
      setImageId(res.data.image_id);
    } catch (e) {
      console.error("Upload failed", e);
    }
  };

  const runAllAnalyses = () => {
    if (!imageId) return;
    startAnalysis('pest', 'pest-detection');
    startAnalysis('nutrient', 'nutrient-mapping');
    startAnalysis('yield', 'yield-prediction');
  };

  // Check if all complete to show results view
  useEffect(() => {
    if (analysisStatus.pest.status === 'complete' &&
      analysisStatus.nutrient.status === 'complete' &&
      analysisStatus.yield.status === 'complete') {
      setTimeout(() => setShowResults(true), 1000);
    }
  }, [analysisStatus]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Farm Analysis Dashboard
          </h1>
          <p className="mt-3 text-xl text-gray-500">
            Advanced drone imagery processing for precision farming
          </p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-10">
          {['pest', 'nutrient', 'yield'].map((type) => (
            <motion.div
              key={type}
              layout
              className={`p-6 bg-white rounded-xl shadow-md border-l-4 ${analysisStatus[type].status === 'complete' ? 'border-green-500' :
                  analysisStatus[type].status === 'processing' ? 'border-blue-500' : 'border-gray-200'
                }`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium capitalize text-gray-900">{type} Analysis</h3>
                  <p className="text-sm text-gray-500">
                    {analysisStatus[type].status === 'idle' ? 'Ready to start' :
                      analysisStatus[type].status === 'processing' ? 'Processing...' :
                        analysisStatus[type].status === 'complete' ? 'Completed' : 'Error'}
                  </p>
                </div>
                {/* Icons/Status Indicator */}
                <div className="h-2 w-24 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: `${analysisStatus[type].progress}%` }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden min-h-[500px]">
          {!showResults ? (
            <div className="p-8">
              <UploadInterface onUpload={handleImageUpload} file={image} />

              {imageId && (
                <div className="mt-8 flex justify-center">
                  <button
                    onClick={runAllAnalyses}
                    disabled={analysisStatus.pest.status === 'processing'}
                    className={`px-8 py-3 rounded-full font-bold text-white shadow-lg transition-all transform hover:scale-105 ${analysisStatus.pest.status === 'processing' ? 'bg-gray-400' : 'bg-gradient-to-r from-green-500 to-blue-600'
                      }`}
                  >
                    {analysisStatus.pest.status === 'processing' ? 'Analyzing Field...' : 'Run Full Analysis'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <ResultsDashboard
              results={{
                pest: analysisStatus.pest.result,
                nutrient: analysisStatus.nutrient.result,
                yield: analysisStatus.yield.result,
                image_id: imageId
              }}
              onReset={() => {
                setImage(null);
                setImageId(null);
                setAnalysisStatus({
                  pest: { status: 'idle', progress: 0, result: null },
                  nutrient: { status: 'idle', progress: 0, result: null },
                  yield: { status: 'idle', progress: 0, result: null }
                });
                setShowResults(false);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
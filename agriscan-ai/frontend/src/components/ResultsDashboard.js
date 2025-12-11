import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { Map, Download, Share2, AlertTriangle, CheckCircle } from 'lucide-react';

const ResultsDashboard = ({ results, onReset }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const nutrientData = [
    { name: 'Nitrogen', val: results.nutrient?.nitrogen?.percentage || 0, fill: '#ef4444' },
    { name: 'Phosphorus', val: results.nutrient?.phosphorus?.percentage || 0, fill: '#eab308' },
    { name: 'Potassium', val: results.nutrient?.potassium?.percentage || 0, fill: '#3b82f6' },
  ];

  const yieldData = results.yield?.growth_stages || [];

  return (
    <div className="flex flex-col h-full">
      {/* Visual Header */}
      <div className="bg-white border-b px-8 py-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Analysis Report</h2>
          <p className="text-gray-500 text-sm">ID: {results.image_id?.slice(0, 8)}... • {new Date().toLocaleDateString()}</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 text-gray-600">
            <Download size={18} /> Export PDF
          </button>
          <button onClick={onReset} className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800">
            New Analysis
          </button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar Tabs */}
        <div className="w-64 bg-gray-50 border-r p-4 space-y-2">
          {['overview', 'pests', 'nutrients', 'yield'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === tab ? 'bg-white shadow-sm text-green-600 border border-green-100' : 'text-gray-600 hover:bg-white hover:shadow-sm'
                }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Key Metrics */}
              <div className="grid grid-cols-3 gap-6">
                <div className="bg-red-50 p-6 rounded-2xl border border-red-100">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-red-100 rounded-lg text-red-600"><AlertTriangle size={24} /></div>
                    <span className="text-red-600 font-bold bg-white px-2 py-1 rounded text-xs">HIGH RISK</span>
                  </div>
                  <p className="text-gray-500 text-sm">Pest Infestation</p>
                  <h3 className="text-3xl font-bold text-gray-800">{results.pest?.affected_area_percentage}%</h3>
                  <p className="text-sm text-red-600 mt-1">Check Zone A & B immediately</p>
                </div>

                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg text-blue-600"><CheckCircle size={24} /></div>
                    <span className="text-green-600 font-bold bg-white px-2 py-1 rounded text-xs">OPTIMAL</span>
                  </div>
                  <p className="text-gray-500 text-sm">Predicted Yield</p>
                  <h3 className="text-3xl font-bold text-gray-800">{results.yield?.predicted_yield_tons_per_hectare} t/ha</h3>
                  <p className="text-sm text-gray-600 mt-1">Expected Revenue: ${results.yield?.estimated_revenue?.toLocaleString()}</p>
                </div>

                <div className="bg-green-50 p-6 rounded-2xl border border-green-100">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-2 bg-green-100 rounded-lg text-green-600"><Map size={24} /></div>
                  </div>
                  <p className="text-gray-500 text-sm">Overall Health Score</p>
                  <h3 className="text-3xl font-bold text-gray-800">{results.nutrient?.overall_health_score}/100</h3>
                </div>
              </div>

              {/* Simple Map Placeholder */}
              <div className="bg-gray-900 rounded-2xl aspect-video relative overflow-hidden group">
                <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2832&auto=format&fit=crop" className="w-full h-full object-cover opacity-60" alt="Field Map" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="bg-black/50 text-white px-4 py-2 rounded-full backdrop-blur-md border border-white/20">Interactive Map Visualization</span>
                </div>
                {/* Overlay mockups */}
                <div className="absolute top-1/4 left-1/4 w-24 h-24 bg-red-500/30 rounded-full blur-xl animate-pulse"></div>
                <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-green-500/20 rounded-full blur-xl animate-pulse delay-500"></div>
              </div>
            </div>
          )}

          {activeTab === 'nutrients' && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border">
              <h3 className="text-lg font-bold mb-6">Nutrient Deficiency Breakdown</h3>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={nutrientData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip cursor={{ fill: 'transparent' }} />
                    <Bar dataKey="val" radius={[4, 4, 0, 0]} barSize={60} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4">
                {nutrientData.map((d, i) => (
                  <div key={i} className="text-center p-4 bg-gray-50 rounded-xl">
                    <p className="text-gray-500 text-sm">{d.name}</p>
                    <p className="text-xl font-bold" style={{ color: d.fill }}>{d.val}% Deficient</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'yield' && (
            <div className="bg-white p-6 rounded-2xl shadow-sm border">
              <h3 className="text-lg font-bold mb-6">Projected Growth Timeline</h3>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={yieldData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="week" label={{ value: 'Weeks', position: 'insideBottom', offset: -5 }} />
                    <YAxis label={{ value: 'Maturity %', angle: -90, position: 'insideLeft' }} />
                    <Tooltip />
                    <Line type="monotone" dataKey="maturity" stroke="#10B981" strokeWidth={3} dot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResultsDashboard;

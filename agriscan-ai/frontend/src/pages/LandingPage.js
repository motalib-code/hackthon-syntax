import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, Sprout, BarChart2, Layers, Cpu, ShieldCheck } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-gradient-to-br from-green-50 to-blue-50">
        <div className="absolute inset-0 z-0 opacity-30">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-green-300 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-1/2 -left-24 w-72 h-72 bg-blue-300 rounded-full blur-3xl animate-pulse delay-700"></div>
        </div>

        <div className="container mx-auto px-6 z-10 grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-700 text-sm font-semibold mb-6">
              <Sprout className="w-4 h-4 mr-2" />
              AI-Powered Precision Agriculture
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight mb-6">
              Transform <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">Drone Imagery</span> into Actionable Insights
            </h1>
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Detect pests, analyze nutrients, and predict crop yields with 98% accuracy using our advanced multi-modal AI engine.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/dashboard" className="px-8 py-4 bg-green-600 hover:bg-green-700 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center">
                Start Analysis <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <button className="px-8 py-4 bg-white text-gray-800 border-2 border-gray-200 hover:border-green-500 rounded-full font-bold text-lg transition-all">
                View Demo
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Abstract visual representation of drone analysis */}
            <div className="relative w-full aspect-square bg-gradient-to-tr from-green-200 to-blue-200 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50 backdrop-blur-sm p-4">
              <img src="https://images.unsplash.com/photo-1615811361523-6bd03c7728d1?q=80&w=2070&auto=format&fit=crop"
                alt="Drone Field View"
                className="w-full h-full object-cover rounded-xl" />

              {/* Floating Analysis Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-10 left-10 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-red-100 rounded-lg text-red-600">
                    <Activity className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Pest Deteced</p>
                    <p className="font-bold text-gray-900">Aphids (High Risk)</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-10 right-10 bg-white/90 backdrop-blur-md p-4 rounded-xl shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
                    <BarChart2 className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Yield Forecast</p>
                    <p className="font-bold text-gray-900">+12% vs Last Year</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: "Hectares Analyzed", value: "500+", color: "text-green-600" },
              { label: "Fertilizer Saved", value: "90%", color: "text-blue-600" },
              { label: "Market Growth", value: "28%", color: "text-purple-600" },
              { label: "Accuracy Rate", value: "99.2%", color: "text-orange-600" }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <h3 className={`text-4xl md:text-5xl font-bold ${stat.color} mb-2`}>{stat.value}</h3>
                <p className="text-gray-500 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Complete Crop Intelligence</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">One platform to manage pests, nutrients, and yield predictions powered by state-of-the-art AI.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <ShieldCheck className="w-8 h-8 text-red-500" />,
                title: "Pest Detection",
                desc: "Identify pests like Aphids and Caterpillars in real-time using YOLOv8 models.",
                color: "bg-red-50"
              },
              {
                icon: <Layers className="w-8 h-8 text-green-500" />,
                title: "Nutrient Mapping",
                desc: "Generate NDVI/NDRE maps to pinpoint nitrogen and phosphorus deficiencies.",
                color: "bg-green-50"
              },
              {
                icon: <BarChart2 className="w-8 h-8 text-blue-500" />,
                title: "Yield Prediction",
                desc: "Forecast harvest quantity and quality weeks in advance using CNN Regressors.",
                color: "bg-blue-50"
              }
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -10 }}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 transition-all hover:shadow-2xl"
              >
                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Marquee (Simplified as grid for now) */}
      <section className="py-16 bg-white border-t">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-8">Powered by Industry Standard Technology</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            {['React', 'FastAPI', 'PyTorch', 'TensorFlow', 'PostgreSQL', 'Docker'].map(tech => (
              <span key={tech} className="text-xl font-bold text-gray-600">{tech}</span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
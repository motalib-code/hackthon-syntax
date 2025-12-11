import React from 'react';

const HowItWorksPage = () => {
  return (
    <div className="pt-24 px-6 container mx-auto min-h-screen">
      <h1 className="text-4xl font-bold mb-12 text-center text-gray-900">How AgriScan Works</h1>
      <div className="max-w-4xl mx-auto space-y-12">
        {[
          { step: "01", title: "Capture Imagery", desc: "Fly your drone over the field to capture high-resolution RGB or multispectral images." },
          { step: "02", title: "Upload Data", desc: "Upload the GeoTIFF files to our secure cloud platform." },
          { step: "03", title: "AI Analysis", desc: "Our parallel processing pipeline runs pest detection, nutrient analysis, and yield forecasting simultaneously." },
          { step: "04", title: "Actionable Insights", desc: "Receive prescription maps for your sprayers and fertilizers immediately." }
        ].map((item, idx) => (
          <div key={idx} className="flex gap-6 items-start">
            <div className="text-4xl font-black text-green-200">{item.step}</div>
            <div>
              <h3 className="text-2xl font-bold mb-2 text-gray-800">{item.title}</h3>
              <p className="text-lg text-gray-600">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HowItWorksPage;
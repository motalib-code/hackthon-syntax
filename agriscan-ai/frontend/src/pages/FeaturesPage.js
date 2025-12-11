import React from 'react';
import { motion } from 'framer-motion';

const FeaturesPage = () => {
  return (
    <div className="pt-24 px-6 container mx-auto text-center min-h-screen">
      <motion.h1
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="text-4xl font-bold mb-6 text-gray-900"
      >
        Advanced Features
      </motion.h1>
      <p className="text-xl text-gray-600 mb-12">Deep dive into our technology stack.</p>
      <div className="grid md:grid-cols-2 gap-8 text-left">
        <div className="p-8 bg-white shadow-lg rounded-2xl">
          <h2 className="text-2xl font-bold mb-4 text-green-600">YOLOv8 Pest Detection</h2>
          <p className="text-gray-600">Our custom-trained YOLOv8 models can identify over 50 types of common agricultural pests with 99% accuracy in real-time.</p>
        </div>
        <div className="p-8 bg-white shadow-lg rounded-2xl">
          <h2 className="text-2xl font-bold mb-4 text-blue-600">DeepLabV3+ Segmentation</h2>
          <p className="text-gray-600">Pixel-perfect semantic segmentation allows for precise nutrient deficiency mapping across hectares of land.</p>
        </div>
      </div>
    </div>
  );
}

export default FeaturesPage;
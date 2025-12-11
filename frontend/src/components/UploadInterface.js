import React, { useCallback } from 'react';

function UploadInterface({ onUpload, loading, error }) {
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      onUpload(file);
    }
  }, [onUpload]);

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Upload Drone Imagery
      </h2>
      
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="border-4 border-dashed border-green-300 rounded-xl p-12 text-center hover:border-green-500 transition-colors cursor-pointer bg-green-50"
      >
        {loading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-green-500 border-t-transparent mb-4"></div>
            <p className="text-green-600 font-medium">Analyzing image...</p>
          </div>
        ) : (
          <>
            <svg className="w-16 h-16 mx-auto text-green-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-gray-600 mb-2">Drag and drop your drone image here</p>
            <p className="text-gray-400 text-sm mb-4">or</p>
            <label className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg cursor-pointer transition-colors">
              Browse Files
              <input type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
            </label>
          </>
        )}
      </div>
      
      {error && (
        <p className="text-red-500 text-center mt-4">{error}</p>
      )}
    </div>
  );
}

export default UploadInterface;

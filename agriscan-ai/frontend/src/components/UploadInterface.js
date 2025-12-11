import React, { useRef, useState } from 'react';
import { Upload, FileImage, X } from 'lucide-react';

const UploadInterface = ({ onUpload, file }) => {
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onUpload(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    inputRef.current.click();
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div
        className={`relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 ease-in-out ${dragActive ? 'border-green-500 bg-green-50 scale-105' : 'border-gray-300 hover:border-green-400 bg-gray-50'
          }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={handleChange}
          accept="image/jpeg,image/png,image/tiff"
        />

        {!file ? (
          <>
            <div className="bg-white p-4 rounded-full inline-block shadow-sm mb-4">
              <Upload className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-700 mb-2">Upload Drone Imagery</h3>
            <p className="text-gray-500 mb-6">Drag and drop your GeoTIFF, JPG or PNG here</p>
            <button
              onClick={onButtonClick}
              className="px-6 py-2 bg-white border border-gray-300 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
            >
              Browse Files
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center">
            <div className="relative w-full max-w-sm aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-lg mb-4 group">
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <FileImage className="w-12 h-12 text-white opacity-50" />
              </div>
            </div>
            <div className="flex items-center gap-2 text-green-600 font-medium bg-green-50 px-4 py-2 rounded-full">
              <span>{file.name}</span>
              <span className="text-xs text-gray-400">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-sm text-gray-400">
        <div>Supported: JPG, PNG, TIFF</div>
        <div>Max Size: 500MB</div>
        <div>Resolution: > 4K Recommended</div>
      </div>
    </div>
  );
};

export default UploadInterface;

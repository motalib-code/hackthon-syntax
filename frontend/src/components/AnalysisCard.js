import React from 'react';

function AnalysisCard({ title, icon, status, statusColor, value, subtext, details, children }) {
    const getStatusColors = () => {
        switch (statusColor) {
            case 'red':
                return 'bg-red-500/20 text-red-400 border-red-500/30';
            case 'yellow':
                return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            case 'green':
                return 'bg-green-500/20 text-green-400 border-green-500/30';
            default:
                return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
        }
    };

    return (
        <div className="bg-gray-800/50 rounded-xl p-5 border border-gray-700 hover:border-green-500/50 transition-all">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                    <span className="text-xl">{icon}</span>
                    <h3 className="text-white font-semibold">{title}</h3>
                </div>
                {status && (
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColors()}`}>
                        {status}
                    </span>
                )}
            </div>

            {/* Main Value */}
            {value && (
                <div className="mb-2">
                    <span className="text-3xl font-bold text-white">{value}</span>
                    {subtext && <span className="text-gray-400 ml-2">{subtext}</span>}
                </div>
            )}

            {/* Details */}
            {details && (
                <div className="space-y-2 mt-4">
                    {details.map((detail, idx) => (
                        <div key={idx} className="flex items-center justify-between text-sm">
                            <span className="text-gray-400">{detail.label}</span>
                            <span className="text-white font-medium">{detail.value}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Custom Children */}
            {children}
        </div>
    );
}

export default AnalysisCard;

import React from 'react';

function FieldMap({ zones = [], onZoneClick }) {
    // Default demo zones if none provided
    const defaultZones = [
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
    ];

    const mapZones = zones.length > 0 ? zones : defaultZones;

    const getZoneStyle = (status) => {
        switch (status) {
            case 'healthy':
                return 'bg-green-500/40 border-green-400 hover:bg-green-500/60';
            case 'warning':
                return 'bg-yellow-500/40 border-yellow-400 hover:bg-yellow-500/60';
            case 'critical':
                return 'bg-red-500/40 border-red-400 hover:bg-red-500/60 animate-pulse';
            default:
                return 'bg-gray-500/40 border-gray-400';
        }
    };

    return (
        <div className="bg-gray-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-4">
                <h4 className="text-white font-semibold flex items-center gap-2">
                    <span>🗺️</span> Field Analysis Map
                </h4>
            </div>

            {/* Map Grid */}
            <div className="grid grid-cols-4 gap-1 mb-4" style={{ aspectRatio: '4/3' }}>
                {mapZones.map((zone) => (
                    <div
                        key={zone.id}
                        onClick={() => onZoneClick && onZoneClick(zone)}
                        className={`
              relative rounded-md border-2 cursor-pointer transition-all duration-200
              flex items-center justify-center
              ${getZoneStyle(zone.status)}
            `}
                    >
                        <span className="text-xs text-white font-medium opacity-70">{zone.id}</span>
                        {zone.status === 'critical' && (
                            <span className="absolute text-lg">🐛</span>
                        )}
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="flex justify-center gap-4 text-xs">
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded bg-green-500"></div>
                    <span className="text-gray-400">Healthy</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded bg-yellow-500"></div>
                    <span className="text-gray-400">Low Nutrients</span>
                </div>
                <div className="flex items-center gap-1">
                    <div className="w-3 h-3 rounded bg-red-500"></div>
                    <span className="text-gray-400">Pest Alert</span>
                </div>
            </div>
        </div>
    );
}

export default FieldMap;

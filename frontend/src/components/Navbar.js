import React from 'react';

function Navbar() {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/90 backdrop-blur-lg border-b border-green-500/20">
            <div className="max-w-7xl mx-auto px-4">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <a href="#" className="flex items-center gap-2">
                        <span className="text-2xl">🌾</span>
                        <span className="text-xl font-bold text-white">AgriScan AI</span>
                    </a>

                    {/* Badge */}
                    <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-green-500 to-cyan-500 rounded-full">
                        <span className="text-sm">🏆</span>
                        <span className="text-xs font-semibold text-gray-900">SIH 2025</span>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center gap-6">
                        <a href="#home" className="text-gray-300 hover:text-green-400 text-sm font-medium transition-colors">Home</a>
                        <a href="#features" className="text-gray-300 hover:text-green-400 text-sm font-medium transition-colors">Features</a>
                        <a href="#demo" className="text-gray-300 hover:text-green-400 text-sm font-medium transition-colors">Demo</a>
                        <a href="#how-it-works" className="text-gray-300 hover:text-green-400 text-sm font-medium transition-colors">How It Works</a>
                    </div>

                    {/* CTA Button */}
                    <a
                        href="#demo"
                        className="bg-gradient-to-r from-green-500 to-cyan-500 text-gray-900 px-4 py-2 rounded-lg text-sm font-semibold hover:from-green-400 hover:to-cyan-400 transition-all"
                    >
                        Try Demo
                    </a>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;

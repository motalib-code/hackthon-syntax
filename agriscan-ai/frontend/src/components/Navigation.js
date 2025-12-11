import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sprout, BarChart, Settings, User } from 'lucide-react';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/features', label: 'Features' },
    { path: '/how-it-works', label: 'How it Works' },
    { path: '/dashboard', label: 'Dashboard', primary: true }
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-2xl font-bold text-gray-800">
          <Sprout className="w-8 h-8 text-green-500" />
          <span className={scrolled ? 'text-gray-900' : 'text-gray-900'}>AgriScan AI</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`${link.primary
                ? 'bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-full transition-transform hover:scale-105 shadow-lg'
                : 'text-gray-700 hover:text-green-600 font-medium'}`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center space-x-3 ml-4 border-l pl-4 border-gray-300">
            <User className="w-5 h-5 text-gray-600 cursor-pointer hover:text-green-600" />
            <Settings className="w-5 h-5 text-gray-600 cursor-pointer hover:text-green-600" />
          </div>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-gray-700" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t"
          >
            <div className="flex flex-col p-4 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-700 hover:text-green-600 font-medium py-2"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
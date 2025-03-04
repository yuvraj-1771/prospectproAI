import React from 'react';
import { Link } from 'react-router-dom';
import { BrainCircuit, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <BrainCircuit className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">ProspectPro AI</span>
            </Link>
          </div>
          
          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600">
              Home
            </Link>
            <Link to="/features" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600">
              Features
            </Link>
            <Link to="/pricing" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-indigo-600">
              Pricing
            </Link>
            <Link to="/chat" className="ml-4 px-4 py-2 rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
              Start Prospecting
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link 
              to="/" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/features" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </Link>
            <Link 
              to="/pricing" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link 
              to="/chat" 
              className="block px-3 py-2 rounded-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              onClick={() => setIsMenuOpen(false)}
            >
              Start Prospecting
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
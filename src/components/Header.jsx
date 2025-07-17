import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, MapPin } from 'lucide-react';
import logo from '../assets/logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gray-900 text-white py-2">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Phone className="h-3 w-3" />
                <span>082180297185</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="h-3 w-3" />
                <span>info@naldenom.com</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="h-3 w-3" />
              <span>Solok Selatan, Sumatera Barat</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="p-3 rounded-lg">
              <img src={logo} alt="NALDENOM" className="w-14 h-14" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">NALDENOM</h1>
              <p className="text-sm text-gray-600">EXPORT IMPORT</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`text-gray-700 hover:text-blue-600 transition-colors font-medium ${
                isActive('/') ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : ''
              }`}
            >
              Home
            </Link>
            <Link 
              to="/products" 
              className={`text-gray-700 hover:text-blue-600 transition-colors font-medium ${
                isActive('/products') ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : ''
              }`}
            >
              Products
            </Link>
            <Link 
              to="/articles" 
              className={`text-gray-700 hover:text-blue-600 transition-colors font-medium ${
                isActive('/articles') ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : ''
              }`}
            >
              Articles
            </Link>
            <Link 
              to="/faq" 
              className={`text-gray-700 hover:text-blue-600 transition-colors font-medium ${
                isActive('/faq') ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : ''
              }`}
            >
              FAQ
            </Link>
            <Link 
              to="/contact" 
              className={`text-gray-700 hover:text-blue-600 transition-colors font-medium ${
                isActive('/contact') ? 'text-blue-600 border-b-2 border-blue-600 pb-1' : ''
              }`}
            >
              Contact Us
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 bg-gray-50 rounded-lg p-4">
            <div className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className={`text-left py-2 text-gray-700 hover:text-blue-600 transition-colors ${
                  isActive('/') ? 'text-blue-600 font-medium' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className={`text-left py-2 text-gray-700 hover:text-blue-600 transition-colors ${
                  isActive('/products') ? 'text-blue-600 font-medium' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link 
                to="/articles" 
                className={`text-left py-2 text-gray-700 hover:text-blue-600 transition-colors ${
                  isActive('/articles') ? 'text-blue-600 font-medium' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Articles
              </Link>
              <Link 
                to="/faq" 
                className={`text-left py-2 text-gray-700 hover:text-blue-600 transition-colors ${
                  isActive('/faq') ? 'text-blue-600 font-medium' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link 
                to="/contact" 
                className={`text-left py-2 text-gray-700 hover:text-blue-600 transition-colors ${
                  isActive('/contact') ? 'text-blue-600 font-medium' : ''
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
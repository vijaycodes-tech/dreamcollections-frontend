import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, User, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import AuthModal from './AuthModal';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const { state } = useCart();
  const { auth, logout } = useAuth();

  const categories = [
    { name: "Women's Collection", path: "/category/women" },
    { name: "Men's Collection", path: "/category/men" },
    { name: "Kids' Collection", path: "/category/kids" },
    { name: "Bridal Collection", path: "/category/bridal" },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/Black and Gold Elegant Jewelry Logo (1).jpg" 
              alt="Dream Collections" 
              className="h-12 w-auto"
            />
            <span className="text-2xl font-bold text-secondary-800">Dream Collections</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="text-secondary-700 hover:text-gold-600 transition-colors duration-200 font-medium relative group"
              >
                {category.name}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-500 transition-all duration-200 group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <button className="text-secondary-700 hover:text-gold-600 transition-colors duration-200">
              <Search className="w-5 h-5" />
            </button>
            
            {auth.isAuthenticated ? (
              <div className="relative group">
                <button className="flex items-center space-x-1 text-secondary-700 hover:text-gold-600 transition-colors duration-200">
                  <User className="w-5 h-5" />
                  <span className="hidden sm:inline">{auth.user?.name}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white border border-silver-200 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <Link to="/orders" className="block px-4 py-2 text-secondary-700 hover:bg-secondary-50">
                    My Orders
                  </Link>
                  <button
                    onClick={logout}
                    className="w-full text-left px-4 py-2 text-secondary-700 hover:bg-secondary-50"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center space-x-1 text-secondary-700 hover:text-gold-600 transition-colors duration-200 font-medium"
              >
                <User className="w-5 h-5" />
                <span className="hidden sm:inline">Sign In</span>
              </Link>
            )}

            <Link
              to="/cart"
              className="relative text-secondary-700 hover:text-gold-600 transition-colors duration-200"
            >
              <ShoppingCart className="w-5 h-5" />
              {state.itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-gold-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {state.itemCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-secondary-700 hover:text-gold-600 transition-colors duration-200"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-secondary-200 py-4">
            <nav className="flex flex-col space-y-4">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.path}
                  className="text-secondary-700 hover:text-gold-600 transition-colors duration-200 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)} 
      />
    </header>
  );
};

export default Header;
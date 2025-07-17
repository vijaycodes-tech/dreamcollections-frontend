import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Truck, Package, MapPin, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import AuthModal from '../components/AuthModal';

const OrderConfirmationPage: React.FC = () => {
  const { orderId } = useParams();
  const { auth, register } = useAuth();
  const [showSignup, setShowSignup] = useState(!auth.isAuthenticated);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [signupData, setSignupData] = useState({
    name: '',
    email: '',
    phone: '',
    password: ''
  });

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    register({
      name: signupData.name,
      email: signupData.email,
      phone: signupData.phone
    });
    setShowSignup(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          <div className="bg-white rounded-lg shadow-sm p-8 text-center mb-8">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Order Confirmed!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for your purchase. Your order has been successfully placed.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-500">Order ID</p>
              <p className="text-xl font-bold text-primary-600">{orderId}</p>
            </div>
            <p className="text-sm text-gray-500">
              A confirmation email has been sent to your email address.
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Details</h2>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Order Date</span>
                <span className="font-semibold">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Status</span>
                <span className="text-green-600 font-semibold">Paid</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Estimated Delivery</span>
                <span className="font-semibold">
                  {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>

          {/* Order Tracking */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Order Tracking</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800">Order Confirmed</p>
                  <p className="text-sm text-gray-500">Your order has been confirmed</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <Package className="w-4 h-4 text-gray-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-500">Processing</p>
                  <p className="text-sm text-gray-500">Your order is being prepared</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <Truck className="w-4 h-4 text-gray-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-500">Shipped</p>
                  <p className="text-sm text-gray-500">Your order has been shipped</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-gray-500" />
                </div>
                <div>
                  <p className="font-semibold text-gray-500">Delivered</p>
                  <p className="text-sm text-gray-500">Your order has been delivered</p>
                </div>
              </div>
            </div>
          </div>

          {/* Account Signup CTA */}
          {showSignup && (
            <div className="bg-gradient-to-r from-gold-50 to-silver-50 rounded-xl shadow-lg p-8 mb-8 border border-gold-200">
              <div className="text-center">
                <User className="w-12 h-12 text-gold-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-secondary-800 mb-2">Want to track your order?</h2>
                <p className="text-secondary-600 mb-6">
                  Create an account in seconds to track your orders, save preferences, and get exclusive discounts!
                </p>
                <div className="w-16 h-1 bg-gradient-to-r from-gold-400 to-silver-400 mx-auto mb-6 rounded-full"></div>
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-gradient-to-r from-gold-500 to-gold-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-gold-600 hover:to-gold-700 transition-all duration-200 shadow-lg mr-4"
                >
                  Create Account
                </button>
                <button
                  onClick={() => setShowSignup(false)}
                  className="text-secondary-600 hover:text-secondary-800 font-medium"
                >
                  Maybe later
                </button>
              </div>
            </div>
          )}

          {/* Legacy Inline Signup Form (keeping as fallback) */}
          {false && showSignup && (
            <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
              <h2 className="text-xl font-bold text-secondary-800 mb-4">Create Your Account</h2>
              <p className="text-secondary-600 mb-6">
                Create an account to track your orders, save preferences, and get exclusive discounts!
              </p>
              <form onSubmit={handleSignup} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={signupData.name}
                    onChange={(e) => setSignupData(prev => ({ ...prev, name: e.target.value }))}
                    required
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <input
                    type="email"
                    placeholder="Email Address"
                    value={signupData.email}
                    onChange={(e) => setSignupData(prev => ({ ...prev, email: e.target.value }))}
                    required
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={signupData.phone}
                    onChange={(e) => setSignupData(prev => ({ ...prev, phone: e.target.value }))}
                    required
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    value={signupData.password}
                    onChange={(e) => setSignupData(prev => ({ ...prev, password: e.target.value }))}
                    required
                    className="w-full px-3 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowSignup(false)}
                    className="flex-1 border border-secondary-300 text-secondary-700 py-2 rounded-lg hover:bg-secondary-50 transition-colors"
                  >
                    Skip
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    Create Account
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link
              to="/orders"
              className="flex-1 bg-gradient-to-r from-gold-500 to-gold-600 text-white py-3 rounded-lg font-semibold hover:from-gold-600 hover:to-gold-700 transition-all duration-200 text-center shadow-lg"
            >
              Track Order
            </Link>
            <Link
              to="/"
              className="flex-1 border-2 border-gold-500 text-gold-600 py-3 rounded-lg font-semibold hover:bg-gold-50 transition-colors text-center"
            >
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Auth Modal */}
        <AuthModal 
          isOpen={isAuthModalOpen} 
          onClose={() => setIsAuthModalOpen(false)}
          defaultTab="signup"
        />
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Smartphone, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CheckoutPage: React.FC = () => {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const [paymentInfo, setPaymentInfo] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: ''
  });

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep(2);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Generate random order ID
    const orderId = 'DC' + Math.random().toString(36).substr(2, 9).toUpperCase();
    
    // Clear cart
    dispatch({ type: 'CLEAR_CART' });
    
    // Navigate to confirmation page
    navigate(`/order-confirmation/${orderId}`);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'shipping' | 'payment') => {
    const { name, value } = e.target;
    if (type === 'shipping') {
      setShippingInfo(prev => ({ ...prev, [name]: value }));
    } else {
      setPaymentInfo(prev => ({ ...prev, [name]: value }));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className={`flex items-center ${step >= 1 ? 'text-primary-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${step >= 1 ? 'border-gold-500 bg-gold-500 text-white' : 'border-gray-300'}`}>
                  1
                </div>
                <span className="ml-2 font-medium">Shipping</span>
              </div>
              <div className={`flex-1 h-0.5 mx-4 ${step >= 2 ? 'bg-gold-500' : 'bg-gray-300'}`}></div>
              <div className={`flex items-center ${step >= 2 ? 'text-gold-600' : 'text-gray-400'}`}>
                <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${step >= 2 ? 'border-gold-500 bg-gold-500 text-white' : 'border-gray-300'}`}>
                  2
                </div>
                <span className="ml-2 font-medium">Payment</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {step === 1 ? (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Shipping Information</h2>
                  <form onSubmit={handleShippingSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                        <input
                          type="text"
                          name="fullName"
                          value={shippingInfo.fullName}
                          onChange={(e) => handleInputChange(e, 'shipping')}
                          required
                          className="w-full px-3 py-2 border border-silver-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={shippingInfo.email}
                          onChange={(e) => handleInputChange(e, 'shipping')}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={shippingInfo.phone}
                        onChange={(e) => handleInputChange(e, 'shipping')}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                      <input
                        type="text"
                        name="address"
                        value={shippingInfo.address}
                        onChange={(e) => handleInputChange(e, 'shipping')}
                        required
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                        <input
                          type="text"
                          name="city"
                          value={shippingInfo.city}
                          onChange={(e) => handleInputChange(e, 'shipping')}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                        <input
                          type="text"
                          name="state"
                          value={shippingInfo.state}
                          onChange={(e) => handleInputChange(e, 'shipping')}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                        <input
                          type="text"
                          name="zipCode"
                          value={shippingInfo.zipCode}
                          onChange={(e) => handleInputChange(e, 'shipping')}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                    </div>
                    
                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-gold-500 to-gold-600 text-white py-3 rounded-lg font-semibold hover:from-gold-600 hover:to-gold-700 transition-all duration-200 shadow-lg"
                    >
                      Continue to Payment
                    </button>
                  </form>
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Information</h2>
                  
                  {/* Payment Method Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-4 border rounded-lg flex items-center justify-center space-x-2 ${
                          paymentMethod === 'card' ? 'border-gold-500 bg-gold-50' : 'border-silver-300'
                        }`}
                      >
                        <CreditCard className="w-5 h-5" />
                        <span>Credit/Debit Card</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('upi')}
                        className={`p-4 border rounded-lg flex items-center justify-center space-x-2 ${
                          paymentMethod === 'upi' ? 'border-gold-500 bg-gold-50' : 'border-silver-300'
                        }`}
                      >
                        <Smartphone className="w-5 h-5" />
                        <span>UPI</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('wallet')}
                        className={`p-4 border rounded-lg flex items-center justify-center space-x-2 ${
                          paymentMethod === 'wallet' ? 'border-gold-500 bg-gold-50' : 'border-silver-300'
                        }`}
                      >
                        <Shield className="w-5 h-5" />
                        <span>Digital Wallet</span>
                      </button>
                    </div>
                  </div>

                  {/* Payment Form */}
                  {paymentMethod === 'card' && (
                    <form onSubmit={handlePaymentSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={paymentInfo.cardNumber}
                          onChange={(e) => handleInputChange(e, 'payment')}
                          placeholder="1234 5678 9012 3456"
                          required
                          className="w-full px-3 py-2 border border-silver-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-500"
                        />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={paymentInfo.expiryDate}
                            onChange={(e) => handleInputChange(e, 'payment')}
                            placeholder="MM/YY"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                          <input
                            type="text"
                            name="cvv"
                            value={paymentInfo.cvv}
                            onChange={(e) => handleInputChange(e, 'payment')}
                            placeholder="123"
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                        <input
                          type="text"
                          name="cardholderName"
                          value={paymentInfo.cardholderName}
                          onChange={(e) => handleInputChange(e, 'payment')}
                          required
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        />
                      </div>
                      
                      <div className="flex space-x-4">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                        >
                          Back
                        </button>
                        <button
                          type="submit"
                          className="flex-1 bg-gradient-to-r from-gold-500 to-gold-600 text-white py-3 rounded-lg font-semibold hover:from-gold-600 hover:to-gold-700 transition-all duration-200 shadow-lg"
                        >
                          Place Order
                        </button>
                      </div>
                    </form>
                  )}

                  {paymentMethod === 'upi' && (
                    <div className="text-center py-8">
                      <div className="w-64 h-64 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                        <span className="text-gray-500">UPI QR Code</span>
                      </div>
                      <p className="text-gray-600 mb-4">Scan the QR code with your UPI app</p>
                      <div className="flex space-x-4">
                        <button
                          type="button"
                          onClick={() => setStep(1)}
                          className="flex-1 border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={handlePaymentSubmit}
                          className="flex-1 bg-gradient-to-r from-gold-500 to-gold-600 text-white py-3 rounded-lg font-semibold hover:from-gold-600 hover:to-gold-700 transition-all duration-200 shadow-lg"
                        >
                          Confirm Payment
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-800 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  {state.items.map((item) => (
                    <div key={`${item.id}-${item.color}`} className="flex items-center space-x-3">
                      <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${state.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${(state.total * 0.08).toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-gold-600">${(state.total + state.total * 0.08).toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <div className="text-xs text-gray-500 text-center">
                  <Shield className="w-4 h-4 inline mr-1" />
                  Your payment information is secure and encrypted
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
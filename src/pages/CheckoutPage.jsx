import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CheckoutPage = () => {
  const { cartItems, fetchCart, clearCart } = useCart();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [shippingAddress, setShippingAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!currentUser) {
      navigate('/login'); // Redirect to login if not authenticated
    }
    if (cartItems.length === 0) {
      fetchCart(); // Ensure cart is loaded
    }
  }, [currentUser, navigate, cartItems.length, fetchCart]);

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (cartItems.length === 0) {
      setError('Your cart is empty. Please add items before checking out.');
      setLoading(false);
      return;
    }

    if (!currentUser || !currentUser.uid) {
      setError('User not authenticated. Please log in.');
      setLoading(false);
      return;
    }

    const fullShippingAddress = `${shippingAddress.street}, ${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.zip}, ${shippingAddress.country}`;

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/checkout`, {
        user_id: currentUser.uid,
        shipping_address: fullShippingAddress,
      });

      if (response.status === 201) {
        await clearCart(currentUser.uid); // Clear cart after successful order
        navigate('/order-confirmation', { state: { order: response.data } });
      }
    } catch (err) {
      console.error('Checkout error:', err);
      setError(err.response?.data?.error || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return null; // Or a loading spinner, as redirect happens in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
          <div className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center py-3">
                <div>
                  <p className="font-medium text-gray-900">{item.product.title}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-semibold text-gray-900">${(item.product.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
            <div className="flex justify-between items-center pt-3">
              <p className="text-lg font-bold text-gray-900">Total</p>
              <p className="text-lg font-bold text-gray-900">${total.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Shipping Information</h2>
          <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
            <div>
              <label htmlFor="street" className="block text-sm font-medium text-gray-700">Street Address</label>
              <div className="mt-1">
                <input
                  type="text"
                  name="street"
                  id="street"
                  autoComplete="street-address"
                  value={shippingAddress.street}
                  onChange={handleAddressChange}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
              <div className="mt-1">
                <input
                  type="text"
                  name="city"
                  id="city"
                  autoComplete="address-level2"
                  value={shippingAddress.city}
                  onChange={handleAddressChange}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="state" className="block text-sm font-medium text-gray-700">State / Province</label>
              <div className="mt-1">
                <input
                  type="text"
                  name="state"
                  id="state"
                  autoComplete="address-level1"
                  value={shippingAddress.state}
                  onChange={handleAddressChange}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
            </div>
            <div>
              <label htmlFor="zip" className="block text-sm font-medium text-gray-700">ZIP / Postal code</label>
              <div className="mt-1">
                <input
                  type="text"
                  name="zip"
                  id="zip"
                  autoComplete="postal-code"
                  value={shippingAddress.zip}
                  onChange={handleAddressChange}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="country" className="block text-sm font-medium text-gray-700">Country</label>
              <div className="mt-1">
                <input
                  type="text"
                  name="country"
                  id="country"
                  autoComplete="country-name"
                  value={shippingAddress.country}
                  onChange={handleAddressChange}
                  className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  required
                />
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="w-full bg-blue-600 border border-transparent rounded-md shadow-sm py-3 px-4 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              disabled={loading || cartItems.length === 0}
            >
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;

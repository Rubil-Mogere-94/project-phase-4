import React, { useEffect, useState, useCallback } from "react";
import { useCart } from "../contexts/CartContext";
import debounce from 'lodash/debounce';
import { useNavigate } from 'react-router-dom';

const CartPage = () => {
  const { cartItems, updateCartItemQuantity, updateCartItemNotes, removeFromCart } = useCart();
  const [localNotes, setLocalNotes] = useState({});
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  // Initialize local notes when cart items change
  useEffect(() => {
    const initialNotes = {};
    cartItems.forEach(item => {
      initialNotes[item.id] = item.notes || '';
    });
    setLocalNotes(initialNotes);
  }, [cartItems]);

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleQuantityChange = (cartItemId, newQuantity) => {
    if (newQuantity > 0) {
      updateCartItemQuantity(cartItemId, newQuantity);
    } else if (newQuantity === 0) {
      removeFromCart(cartItemId);
    }
  };

  const debouncedUpdateNotes = useCallback(
    debounce((cartItemId, newNotes) => {
      updateCartItemNotes(cartItemId, newNotes);
    }, 500),
    []
  );

  const handleNotesChange = (cartItemId, newNotes) => {
    setLocalNotes(prev => ({
      ...prev,
      [cartItemId]: newNotes
    }));
    debouncedUpdateNotes(cartItemId, newNotes);
  };

  const handleGoToBuy = (affiliateLink, productTitle) => {
    if (affiliateLink) {
      window.open(affiliateLink, "_blank");
    } else {
      alert(`No affiliate link available for ${productTitle}`);
    }
  };

  const handleOpenAllInTabs = () => {
    const validLinks = cartItems.filter(item => item.product.affiliate_link);
    
    if (validLinks.length === 0) {
      alert("No products with valid affiliate links in your cart.");
      return;
    }

    validLinks.forEach((item) => {
      window.open(item.product.affiliate_link, "_blank");
    });
  };

  const handleCopyCheckoutList = async () => {
    const links = cartItems
      .map((item) => item.product.affiliate_link)
      .filter(Boolean)
      .join("\n");
    
    if (links.length === 0) {
      alert("No affiliate links available to copy.");
      return;
    }

    try {
      await navigator.clipboard.writeText(links);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert("Failed to copy links to clipboard.");
    }
  };

  const isValidImageUrl = (url) => {
    return url && (url.startsWith("http://") || url.startsWith("https://"));
  };

  const getTotalItems = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="max-w-md mx-auto">
              <div className="mb-8">
                <svg className="mx-auto h-24 w-24 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
              <p className="text-gray-600 mb-8">Start shopping to add items to your cart</p>
              <button 
                onClick={() => window.history.back()} 
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">{getTotalItems()} items in your cart</p>
        </div>

        <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              {/* Mobile Header */}
              <div className="p-4 border-b border-gray-200 lg:hidden">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-500">Product</span>
                  <span className="text-sm font-medium text-gray-500">Total</span>
                </div>
              </div>

              {/* Cart Items List */}
              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-4 sm:p-6">
                    <div className="flex items-start space-x-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={isValidImageUrl(item.product.image) ? item.product.image : "https://via.placeholder.com/80"}
                          alt={item.product.title}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-gray-900 line-clamp-2">
                              {item.product.title}
                            </h3>
                            <p className="text-sm text-gray-500 mt-1">{item.product.source}</p>
                            <p className="text-lg font-semibold text-gray-900 mt-2">
                              ${item.product.price.toFixed(2)}
                            </p>
                          </div>
                          
                          {/* Desktop Total */}
                          <div className="hidden sm:block text-right">
                            <p className="text-lg font-semibold text-gray-900">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="mt-4 flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <span className="text-sm font-medium text-gray-700">Quantity:</span>
                            <div className="flex items-center border border-gray-300 rounded-lg">
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                className="p-2 hover:bg-gray-100 transition duration-150"
                                disabled={item.quantity <= 1}
                              >
                                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                                </svg>
                              </button>
                              <span className="px-3 py-1 text-gray-900 font-medium min-w-[3rem] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                className="p-2 hover:bg-gray-100 transition duration-150"
                              >
                                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                </svg>
                              </button>
                            </div>
                          </div>

                          {/* Mobile Total */}
                          <div className="sm:hidden">
                            <p className="text-lg font-semibold text-gray-900">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>

                        {/* Notes */}
                        <div className="mt-4">
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Notes (Optional)
                          </label>
                          <textarea
                            value={localNotes[item.id] || ''}
                            onChange={(e) => handleNotesChange(item.id, e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
                            rows="2"
                            placeholder="Add special instructions..."
                          />
                        </div>

                        {/* Actions */}
                        <div className="mt-4 flex space-x-3">
                          <button
                            onClick={() => handleGoToBuy(item.product.affiliate_link, item.product.title)}
                            disabled={!item.product.affiliate_link}
                            className={`flex-1 py-2 px-4 rounded-lg font-medium transition duration-200 ${
                              item.product.affiliate_link 
                                ? 'bg-blue-600 text-white hover:bg-blue-700' 
                                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            }`}
                          >
                            {item.product.affiliate_link ? 'Buy Now' : 'No Link Available'}
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-200 font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="mt-8 lg:mt-0 lg:col-span-4">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sticky top-4">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({getTotalItems()} items)</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-semibold text-gray-900">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Bulk Actions */}
              <div className="mt-6">
                <button
                  onClick={() => navigate('/checkout')}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200 font-medium flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Proceed to Checkout
                </button>
              </div>

              <div className="mt-6 text-center">
                <p className="text-sm text-gray-500">
                  Prices are updated in real-time. Proceed to checkout through individual product links.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const OrderConfirmationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { order } = location.state || {};

  if (!order) {
    // Redirect to home or a different page if no order data is found
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">No Order Found</h1>
          <p className="text-gray-600 mb-8">It seems you landed here without a valid order. Please go back to shopping.</p>
          <button 
            onClick={() => navigate('/')} 
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 text-center">
          <svg className="mx-auto h-16 w-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 className="text-3xl font-bold text-gray-900 mt-4 mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-6">Thank you for your purchase. Your order details are below.</p>

          <div className="text-left border-t border-gray-200 pt-6 mt-6">
            <p className="text-lg font-semibold text-gray-900">Order ID: <span className="font-normal">#{order.order_id}</span></p>
            <p className="text-lg font-semibold text-gray-900">Total Amount: <span className="font-normal">${order.total_amount.toFixed(2)}</span></p>
            <p className="text-lg font-semibold text-gray-900">Order Date: <span className="font-normal">{new Date(order.order_date).toLocaleDateString()}</span></p>
            <p className="text-lg font-semibold text-gray-900">Status: <span className="font-normal">{order.status}</span></p>
          </div>

          <div className="mt-8 flex justify-center space-x-4">
            <button 
              onClick={() => navigate('/')} 
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-200"
            >
              Continue Shopping
            </button>
            {/* Potentially add a link to an order history page here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;

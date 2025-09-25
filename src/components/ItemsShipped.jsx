import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TrendingUp } from 'lucide-react';

const ItemsShipped = () => {
  const [shippedValue, setShippedValue] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchShippedValue = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/shipment_summary`);
        // Extract the numeric value from the formatted string
        const numericValue = parseFloat(response.data.total_shipment.replace(/[^\d.-]/g, ''));
        setShippedValue(numericValue);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchShippedValue();
  }, []);

  if (loading) return <p>Loading data...</p>;
  if (error) return <p>Error fetching data: {error}</p>;

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h3 className="card-title text-lg font-semibold mb-2">Items shipped</h3>
        <p className="text-sm text-gray-500 mb-4">amount in usd</p>
        
        <div className="text-center">
          <div className="text-4xl font-bold text-primary mb-2">
            ${shippedValue.toLocaleString()}
          </div>
          <div className="flex items-center justify-center text-success text-sm mb-6">
            <TrendingUp size={16} className="mr-1" />
            Shipment is 45% More than last Month
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
            <div 
              className="bg-gradient-to-r from-primary to-secondary h-4 rounded-full progress-animation"
              style={{ width: '80%' }} // Example of dynamic progress
            ></div>
          </div>
          <div className="text-right text-sm font-semibold">80%</div>
        </div>
      </div>
    </div>
  );
};

export default ItemsShipped;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Target, Calendar } from 'lucide-react';

const LevelComparison = () => {
  const [comparison, setComparison] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComparison = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/delivery_comparison`);
        setComparison(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComparison();
  }, []);

  if (loading) return <p>Loading comparison data...</p>;
  if (error) return <p>Error fetching comparison data: {error}</p>;

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h3 className="card-title text-lg font-semibold mb-4">Level</h3>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
              <Target size={18} className="mr-2" />
              Products delivered
            </h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Calendar size={16} className="mr-2 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">Last Month</span>
                </div>
                <div className="text-2xl font-bold text-blue-900">${comparison.last_month.toLocaleString()}</div>
              </div>
              
              <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
                <div className="flex items-center mb-2">
                  <Calendar size={16} className="mr-2 text-green-600" />
                  <span className="text-sm font-medium text-green-700">This Month</span>
                </div>
                <div className="text-2xl font-bold text-green-900">${comparison.this_month.toLocaleString()}</div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg border-l-4 border-purple-400">
            <h5 className="font-semibold text-purple-800 mb-1">New Visions</h5>
            <p className="text-sm text-purple-600">
              Implementing new strategies for increased delivery efficiency and customer satisfaction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LevelComparison;
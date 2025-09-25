import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TrendingUp, Package, ShoppingCart, Gift } from 'lucide-react';

const ShipmentSummary = () => {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('http://127.0.0.1:5000/api/shipment_summary');
        setSummary(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
  }, []);

  if (loading) return <p>Loading summary...</p>;
  if (error) return <p>Error fetching summary: {error}</p>;

  const stats = summary ? [
    {
      icon: Package,
      value: summary.total_shipment,
      label: 'Total shipment',
      change: '+10% from yesterday',
      color: 'text-blue-600'
    },
    {
      icon: ShoppingCart,
      value: summary.total_order,
      label: 'Total Order',
      change: '+3% from yesterday',
      color: 'text-green-600'
    },
    {
      icon: Gift,
      value: summary.product_shipped,
      label: 'Product Shipped',
      change: '+2% from yesterday',
      color: 'text-purple-600'
    },
    {
      icon: TrendingUp,
      value: summary.new_goods,
      label: 'New Goods',
      change: '+3% from yesterday',
      color: 'text-orange-600'
    }
  ] : [];

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <h3 className="card-title text-lg font-semibold mb-4">Shipment Summary</h3>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <div key={index} className="stat bg-base-200 rounded-lg p-4">
              <div className="stat-figure">
                <stat.icon className={stat.color} size={24} />
              </div>
              <div className="stat-title text-sm font-medium text-gray-600">{stat.label}</div>
              <div className="stat-value text-2xl font-bold">{stat.value}</div>
              <div className="stat-desc text-xs text-success">
                <TrendingUp size={12} className="inline mr-1" />
                {stat.change}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShipmentSummary;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart } from 'recharts';

const SalesGraph = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/sales_performance?time_range=${timeRange}`);
        setData(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [timeRange]);

  if (loading) return <p>Loading graph data...</p>;
  if (error) return <p>Error fetching graph data: {error}</p>;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-lg shadow-xl border border-gray-200">
          <p className="font-bold text-gray-800 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: <span className="font-semibold">{entry.value}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="flex justify-between items-center mb-4">
          <h3 className="card-title text-lg font-semibold">Sales Performance</h3>
          <div className="join">
            <input 
              className="join-item btn btn-sm" 
              type="radio" 
              name="timeRange" 
              aria-label="Day" 
              checked={timeRange === 'day'}
              onChange={() => setTimeRange('day')}
            />
            <input 
              className="join-item btn btn-sm" 
              type="radio" 
              name="timeRange" 
              aria-label="Week" 
              checked={timeRange === 'week'}
              onChange={() => setTimeRange('week')}
            />
            <input 
              className="join-item btn btn-sm" 
              type="radio" 
              name="timeRange" 
              aria-label="Month" 
              checked={timeRange === 'month'}
              onChange={() => setTimeRange('month')}
            />
          </div>
        </div>

        <div className="chart-container" style={{ height: '350px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                stroke="#6b7280" 
                fontSize={12}
              />
              <YAxis 
                stroke="#6b7280" 
                fontSize={12}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area
                type="monotone"
                dataKey="sales"
                stroke="#3b82f6"
                fillOpacity={1}
                fill="url(#colorSales)"
                name="Sales ($)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#10b981"
                fillOpacity={1}
                fill="url(#colorRevenue)"
                name="Revenue ($)"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="orders"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 4 }}
                name="Orders"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="stats stats-vertical lg:stats-horizontal shadow bg-base-200 mt-4">
          <div className="stat">
            <div className="stat-title">Total Sales</div>
            <div className="stat-value text-primary">${data.reduce((sum, item) => sum + item.sales, 0).toLocaleString()}</div>
            <div className="stat-desc">21% more than last period</div>
          </div>
          
          <div className="stat">
            <div className="stat-title">Total Revenue</div>
            <div className="stat-value text-secondary">${data.reduce((sum, item) => sum + item.revenue, 0).toLocaleString()}</div>
            <div className="stat-desc">15% more than last period</div>
          </div>
          
          <div className="stat">
            <div className="stat-title">Total Orders</div>
            <div className="stat-value text-accent">{data.reduce((sum, item) => sum + item.orders, 0)}</div>
            <div className="stat-desc">8% more than last period</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesGraph;
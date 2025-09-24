import React from 'react';
import SalesGraph from './SalesGraph';
import ShipmentSummary from './ShipmentSummary';
import TopProducts from './TopProducts';
import ItemsShipped from './ItemsShipped';
import LevelComparison from './LevelComparison';
import DonutChart from './DonutChart';

function Dashboard() {
  return (
    <div
      className="flex-1 p-6 bg-white/90 flex flex-col min-h-screen"
      style={{ backgroundImage: "url('https://drive.google.com/uc?export=view&id=1qHb8jyLR0d9rfZcvFImfJeV38sQ3sRaz')" }}
    >
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">iShop4U</h1>
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-gray-800">Today's Shipment</h2>
          <div className="text-sm text-gray-500">
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </div>
        </div>
      </header>

      {/* Main Dashboard Grid */}
      <div className="dashboard-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
        <div className="w-full h-full"><ShipmentSummary /></div>
        <div className="w-full h-full"><TopProducts /></div>
        <div className="w-full h-full"><ItemsShipped /></div>
        <div className="w-full h-full"><LevelComparison /></div>
        <div className="w-full h-full"><DonutChart /></div>
        <div className="w-full h-full"><SalesGraph /></div>
      </div>
    </div>
  );
}

export default Dashboard;

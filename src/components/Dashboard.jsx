import React from 'react';
function Dashboard() {
  return (
    
    
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

     
      
  );
}

export default Dashboard;

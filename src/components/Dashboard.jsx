import React from "react";
import { SearchBar } from "./SearchBar";
// import TopProducts from "./TopProducts";
// import ShipmentSummary from "./ShipmentSummary";
// import DonutChart from "./DonutChart";
// import ItemsShipped from "./ItemsShipped";
// import LevelComparison from "./LevelComparison";
// import SalesGraph from "./SalesGraph";

function Dashboard() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
      }}
    >
      <div className="backdrop-blur-xs bg-black/20 min-h-screen p-4 md:p-8">
        <header className="mb-8 md:mb-12 relative">
          {/* Today's Shipment (Top Right) */}
          <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-bl-2xl rounded-tr-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-lg font-bold">Today's Shipment</h2>
            <div className="text-sm opacity-95 font-medium">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>

          {/* Title Centered */}
          <div className="pt-16 md:pt-20">
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tighter text-center drop-shadow-2xl">
              iShop<span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">4U</span>
            </h1>
            <p className="text-lg text-white/90 text-center max-w-2xl mx-auto font-light mb-8 drop-shadow-lg">
              Discover amazing products with our intelligent search platform
            </p>
          </div>

          {/* Search Bar */}
          <div className="flex justify-center px-4">
            <div className="w-full max-w-4xl">
              <SearchBar />
            </div>
          </div>
        </header>

        
      </div>
    </div>
  );
}

export default Dashboard;
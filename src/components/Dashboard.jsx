import React from "react";
import { Search } from "lucide-react";

function Dashboard() {
  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJhLG_4XbprkRrzzAJBzcWn50EOLobkOGPvQ&s')",
      }}
    >
      <div className="backdrop-blur-sm bg-white/70 min-h-screen p-8">
        <header className="mb-10 relative">
          {/* Today's Shipment (Top Right) */}
          <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-2 rounded-bl-xl shadow-md">
            <h2 className="text-lg font-semibold">Today's Shipment</h2>
            <div className="text-xs opacity-90">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>

          {/* Title Centered */}
          <h1 className="text-4xl font-extrabold text-gray-900 mb-6 tracking-tight text-center">
            iShop4U
          </h1>

          {/* Search Bar */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-md">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search products, brands, categories..."
                className="w-full pl-12 pr-4 py-3 rounded-full bg-white/60 border border-gray-200 shadow-sm 
                           focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all duration-200"
              />
            </div>
          </div>
        </header>
      </div>
    </div>
  );
}

export default Dashboard;






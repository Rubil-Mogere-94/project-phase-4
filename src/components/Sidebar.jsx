import React from "react";
import { Link, useLocation } from "react-router-dom";
import { User, Trophy, ShoppingBag, Package, BarChart2, MessageSquare, 
         Settings, Heart, History, LogOut } from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { name: "Dashboard", icon: <User size={20} />, path: "/" },
    { name: "Top Products", icon: <Package size={20} />, path: "/products" },
    { name: "Shipment Summary", icon: <ShoppingBag size={20} />, path: "/shipments" },
    { name: "Items Shipped", icon: <BarChart2 size={20} />, path: "/items-shipped" },
    { name: "Level Comparison", icon: <Trophy size={20} />, path: "/level-comparison" },
    { name: "Donut Chart", icon: <Heart size={20} />, path: "/donut-chart" },
    { name: "Sales Graph", icon: <MessageSquare size={20} />, path: "/sales-graph" },
  ];

  return (
    <div className="w-64 min-h-screen bg-gray-800 text-white shadow-lg flex flex-col">
      {/* Profile section */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="w-12 rounded-full ring ring-primary ring-offset-gray-800 ring-offset-2">
              <img src="https://i.pravatar.cc/100?img=12" alt="Profile" />
            </div>
          </div>
          <div>
            <h2 className="font-bold text-lg">James</h2>
            <p className="text-sm text-gray-400">User</p>
          </div>
        </div>
      </div>

      {/* Navigation links */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`flex items-center gap-3 p-3 rounded-lg w-full text-left transition-colors duration-200
              ${location.pathname === item.path ? "bg-gray-700" : "hover:bg-gray-600"}`}
          >
            {item.icon} <span>{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Sign Out */}
      <div className="p-4 border-t border-gray-700">
        <button className="flex items-center gap-3 p-3 rounded-lg w-full text-left hover:bg-red-600 transition-colors duration-200 text-red-400 font-semibold">
          <LogOut size={20} /> <span>Sign Out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;


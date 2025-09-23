import React from "react"
import { User, Trophy, ShoppingBag, Package, BarChart2, MessageSquare, 
         Settings, Heart, History, LogOut } from "lucide-react"

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-base-200 shadow-lg flex flex-col">
      {/* Profile section */}
      <div className="p-6 border-b border-base-300">
        <div className="flex items-center space-x-3">
          <div className="avatar">
            <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src="https://i.pravatar.cc/100?img=12" alt="Profile" />
            </div>
          </div>
          <div>
            <h2 className="font-bold text-lg">John Doe</h2>
            <p className="text-sm text-gray-500">Admin</p>
          </div>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="flex-1 p-4 space-y-2">
        <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-300">
          <User size={20} /> <span>Profile</span>
        </a>
        <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-300">
          <Trophy size={20} /> <span>Leaderboard</span>
        </a>
        <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-300">
          <ShoppingBag size={20} /> <span>Order</span>
        </a>
        <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-300">
          <Package size={20} /> <span>Products</span>
        </a>
        <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-300">
          <BarChart2 size={20} /> <span>Progress Bar</span>
        </a>
        <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-300">
          <MessageSquare size={20} /> <span>Messages</span>
        </a>
        <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-300">
          <Settings size={20} /> <span>Settings</span>
        </a>
        <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-300">
          <Heart size={20} /> <span>Favourites</span>
        </a>
        <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-300">
          <History size={20} /> <span>History</span>
        </a>
      </nav>

      {/* Sign out */}
      <div className="p-4 border-t border-base-300">
        <a href="#" className="flex items-center gap-3 p-3 rounded-lg hover:bg-red-100 text-red-600 font-semibold">
          <LogOut size={20} /> <span>Sign Out</span>
        </a>
      </div>
    </div>
  )
}

export default Sidebar

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import TopProductsPage from "./pages/TopProductsPage";
import ShipmentSummaryPage from "./pages/ShipmentSummaryPage";
import ItemsShippedPage from "./pages/ItemsShippedPage";
import LevelComparisonPage from "./pages/LevelComparisonPage";
import DonutChartPage from "./pages/DonutChartPage";
import SalesGraphPage from "./pages/SalesGraphPage";

function App() {
  return (
    <Router>
      <div className="flex min-h-screen">
        {/* Sidebar always visible */}
        <Sidebar />

        {/* Main content area */}
        <div className="flex-1 p-6 bg-gray-50">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/products" element={<TopProductsPage />} />
            <Route path="/shipments" element={<ShipmentSummaryPage />} />
            <Route path="/items-shipped" element={<ItemsShippedPage />} />
            <Route path="/level-comparison" element={<LevelComparisonPage />} />
            <Route path="/donut-chart" element={<DonutChartPage />} />
            <Route path="/sales-graph" element={<SalesGraphPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

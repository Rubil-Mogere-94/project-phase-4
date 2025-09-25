import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import AllProductsPage from "./pages/AllProductsPage";
import ShipmentSummaryPage from "./pages/ShipmentSummaryPage";
import ItemsShippedPage from "./pages/ItemsShippedPage";
import LevelComparisonPage from "./pages/LevelComparisonPage";
import DonutChartPage from "./pages/DonutChartPage";
import SalesGraphPage from "./pages/SalesGraphPage";
import TopProductsPage from "./pages/TopProductsPage";
import CartPage from "./pages/CartPage";
import Login from "./components/Login";
import ForgotPassword from "./components/ForgotPassword";
import ProtectedRoute from "./components/ProtectedRoute";

// Main app content that requires authentication
function AuthenticatedApp() {
  const { currentUser, logout } = useAuth();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 bg-gray-50">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/products" element={<AllProductsPage />} />
          <Route path="/shipments" element={<ShipmentSummaryPage />} />
          <Route path="/items-shipped" element={<ItemsShippedPage />} />
          <Route path="/level-comparison" element={<LevelComparisonPage />} />
          <Route path="/donut-chart" element={<DonutChartPage />} />
          <Route path="/sales-graph" element={<SalesGraphPage />} />
          <Route path="/top-products" element={<TopProductsPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route
            path="/*"
            element={
              <ProtectedRoute>
                <AuthenticatedApp />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
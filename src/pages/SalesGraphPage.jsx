import React from "react";
import SalesGraph from "../components/SalesGraph";

function SalesGraphPage() {
  return (
    <div className="flex-1 p-6 bg-white/90 flex flex-col min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Sales Performance</h2>
      <SalesGraph />
    </div>
  );
}

export default SalesGraphPage;

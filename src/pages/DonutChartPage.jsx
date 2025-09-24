import React from "react";
import DonutChart from "../components/DonutChart";

function DonutChartPage() {
  return (
    <div className="flex-1 p-6 bg-white/90 flex flex-col min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Product Categories Distribution</h2>
      <DonutChart />
    </div>
  );
}

export default DonutChartPage;

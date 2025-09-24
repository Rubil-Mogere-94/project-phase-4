import React from "react";
import LevelComparison from "../components/LevelComparison";

function LevelComparisonPage() {
  return (
    <div className="flex-1 p-6 bg-white/90 flex flex-col min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Level Comparison</h2>
      <LevelComparison />
    </div>
  );
}

export default LevelComparisonPage;

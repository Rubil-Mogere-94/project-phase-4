import React from "react";
import ShipmentSummary from "../components/ShipmentSummary";

function ShipmentSummaryPage() {
  return (
    <div className="flex-1 p-6 bg-white/90 flex flex-col min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Shipment Summary</h2>
      <ShipmentSummary />
    </div>
  );
}

export default ShipmentSummaryPage;

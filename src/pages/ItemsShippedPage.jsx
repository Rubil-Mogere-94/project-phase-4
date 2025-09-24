import React from "react";
import ItemsShipped from "../components/ItemsShipped";

function ItemsShippedPage() {
  return (
    <div className="flex-1 p-6 bg-white/90 flex flex-col min-h-screen">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Items Shipped</h2>
      <ItemsShipped />
    </div>
  );
}

export default ItemsShippedPage;

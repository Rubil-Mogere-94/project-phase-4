import React from "react";
import Product from "../components/Product";

const AllProductsPage = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">All Products</h1>
      <Product />
    </div>
  );
};

export default AllProductsPage;
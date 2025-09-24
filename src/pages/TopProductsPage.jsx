import React, { useEffect, useState } from "react"
import axios from "axios"  // For future API calls
import TopProducts from "../components/TopProducts"

const ProductsPage = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    // Placeholder: fetch from backend later
    // axios.get("/products").then(res => setProducts(res.data))
    setProducts([
      { id: "P1", name: "Nome Decore Range", price: 120, image_url: "", affiliate: "" },
      { id: "P2", name: "Disney Princess Dress", price: 80, image_url: "", affiliate: "" },
      { id: "P3", name: "Bathroom Essentials", price: 40, image_url: "", affiliate: "" },
      { id: "P4", name: "Apple Smartwatch", price: 350, image_url: "", affiliate: "" },
    ])
  }, [])

  const handleAddToCart = (product) => {
    console.log("Add to cart:", product)
    // Future: call backend to add product to user's cart
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="card bg-base-100 shadow-md p-4">
            <img src={product.image_url || "https://via.placeholder.com/150"} alt={product.name} className="mb-2" />
            <h2 className="font-semibold text-lg">{product.name}</h2>
            <p className="text-gray-600">${product.price}</p>
            <button
              onClick={() => handleAddToCart(product)}
              className="mt-2 btn btn-primary w-full"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductsPage

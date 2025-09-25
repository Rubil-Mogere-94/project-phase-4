import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../contexts/CartContext";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [source, setSource] = useState("escuelajs"); // 'escuelajs' or 'fakestore'
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `http://127.0.0.1:5000/api/products?source=${source}`
        );
        setProducts(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [source]);

  if (loading) return <p>Loading products...</p>;
  if (error) return <p>Error fetching products: {error}</p>;

  const isValidImageUrl = (url) => {
    return url && (url.startsWith("http://") || url.startsWith("https://"));
  };

  return (
    <div>
      <div className="mb-4">
        <button
          onClick={() => setSource("escuelajs")}
          className={`btn mr-2 ${source === "escuelajs" ? "btn-primary" : ""}`}
        >
          EscuelaJS Products
        </button>
        <button
          onClick={() => setSource("fakestore")}
          className={`btn mr-2 ${source === "fakestore" ? "btn-primary" : ""}`}
        >
          Fake Store Products
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="card bg-base-100 shadow-xl">
            <figure>
              <img 
                src={isValidImageUrl(product.image) ? product.image : "https://via.placeholder.com/150"} 
                alt={product.title}
                className="w-full h-48 object-cover"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{product.title}</h2>
              <p>{product.description}</p>
              <div className="card-actions justify-end">
                <button
                  onClick={() => addToCart(product)}
                  className="btn btn-primary"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Product;
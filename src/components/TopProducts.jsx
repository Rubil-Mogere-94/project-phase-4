import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useCart } from '../contexts/CartContext'

const TopProducts = () => {
  const [topProducts, setTopProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchTopProducts = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/top_products`)
        setTopProducts(response.data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchTopProducts()
  }, [])

  if (loading) return <p>Loading top products...</p>
  if (error) return <p>Error fetching top products: {error}</p>

  const isValidImageUrl = (url) => {
    return url && (url.startsWith("http://") || url.startsWith("https://"));
  };

  return (
    <div className="card bg-base-100 shadow-xl h-full">
      <div className="card-body">
        <h3 className="card-title text-lg font-semibold mb-4">Top Products</h3>
        
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th className="bg-base-200">Image</th>
                <th className="bg-base-200">Name</th>
                <th className="bg-base-200">Price</th>
                <th className="bg-base-200">Source</th>
                <th className="bg-base-200">Action</th>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product) => (
                <tr key={product.id} className="hover:bg-base-200 transition-colors">
                  <td>
                    <img 
                      src={isValidImageUrl(product.image) ? product.image : "https://via.placeholder.com/50"} 
                      alt={product.title}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td>{product.title}</td>
                  <td>${product.price.toFixed(2)}</td>
                  <td>{product.source}</td>
                  <td>
                    <button 
                      onClick={() => addToCart(product)}
                      className="btn btn-sm btn-primary"
                    >
                      Add to Cart
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default TopProducts
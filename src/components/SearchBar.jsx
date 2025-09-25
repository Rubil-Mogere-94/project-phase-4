import React, { useState } from 'react';
import { Search, Loader, ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

export const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchSource, setSearchSource] = useState('escuelajs'); // New state for search source
  const { addToCart } = useCart();

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/products?query=${encodeURIComponent(query)}&source=${searchSource}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error);
      }
      
      if (!Array.isArray(data)) {
        throw new Error('Invalid response format from server');
      }
      
      setProducts(data);
    } catch (error) {
      setError(error.message);
      setProducts([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const isValidImageUrl = (url) => {
    return url && (url.startsWith("http://") || url.startsWith("https://"));
  };

  return (
    <div className="w-full">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Search for products, brands, or categories..."
          className="w-full pl-12 pr-24 py-4 text-lg bg-white/95 backdrop-blur-sm border-0 rounded-2xl shadow-2xl focus:ring-4 focus:ring-blue-400/50 transition-all duration-300 placeholder-gray-500"
        />
        <button 
          onClick={handleSearch}
          disabled={isLoading}
          className="absolute right-2 top-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:transform-none transition-all duration-200 flex items-center space-x-2"
        >
          {isLoading ? (
            <Loader className="h-4 w-4 animate-spin" />
          ) : (
            <Search className="h-4 w-4" />
          )}
          <span>Search</span>
        </button>
      </div>

      {/* Source Selection Buttons */}
      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={() => setSearchSource('escuelajs')}
          className={`btn btn-sm ${searchSource === 'escuelajs' ? 'btn-primary' : 'btn-ghost'}`}
        >
          EscuelaJS
        </button>
        <button
          onClick={() => setSearchSource('fakestore')}
          className={`btn btn-sm ${searchSource === 'fakestore' ? 'btn-primary' : 'btn-ghost'}`}
        >
          Fake Store
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-6 bg-red-50 border-l-4 border-red-500 p-4 rounded-lg shadow-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-red-500">⚠️</span>
            </div>
            <div className="ml-3">
              <p className="text-red-700 font-medium">Error: {error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading && (
        <div className="mt-12 flex justify-center">
          <div className="animate-pulse flex space-x-4">
            <div className="rounded-full bg-blue-600 h-12 w-12"></div>
          </div>
        </div>
      )}

      {/* Results Grid */}
      {products.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-white mb-6 text-center drop-shadow-lg">
            Found {products.length} {products.length === 1 ? 'product' : 'products'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map(product => (
              <div 
                key={product.id} 
                className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300 hover:shadow-2xl border border-white/20"
              >
                {/* Product Image */}
                <div className="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <img 
                    src={isValidImageUrl(product.image) ? product.image : "https://via.placeholder.com/150"} 
                    alt={product.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110" 
                  />
                  <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded-full text-sm font-semibold">
                    ${product.price}
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2 leading-tight">
                    {product.title}
                  </h3>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="inline-block bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
                      {product.category || 'Uncategorized'}
                    </span>
                    <button 
                      onClick={() => addToCart(product)}
                      className="bg-gradient-to-r from-green-500 to-emerald-600 text-white p-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200"
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && products.length === 0 && query && !error && (
        <div className="mt-12 text-center">
          <div className="text-white/80 text-lg font-light">
            No products found for "<span className="font-semibold">{query}</span>"
          </div>
          <p className="text-white/60 mt-2">Try searching with different keywords</p>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
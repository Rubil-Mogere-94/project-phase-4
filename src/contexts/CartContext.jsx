import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext'; // Assuming AuthContext provides currentUser

const CartContext = createContext();

export const useCart = () => {
  return useContext(CartContext);
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const { currentUser } = useAuth(); // Get current user from AuthContext

  const fetchCart = async () => {
    if (currentUser && currentUser.uid) {
      try {
        const response = await axios.get(`http://127.0.0.1:5000/api/cart?user_id=${currentUser.uid}`);
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    } else {
      setCartItems([]); // Clear cart if no user is logged in
    }
  };

  useEffect(() => {
    fetchCart();
  }, [currentUser]); // Refetch cart when user changes

  const addToCart = async (product, notes = null) => {
    if (!currentUser || !currentUser.uid) {
      console.error("User not logged in. Cannot add to cart.");
      return;
    }
    try {
      const response = await axios.post('http://127.0.0.1:5000/api/cart', {
        product_id: product.id,
        user_id: currentUser.uid,
        quantity: 1,
        notes: notes,
      });
      if (response.status === 201) {
        fetchCart(); // Refresh cart after adding item
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const updateCartItemQuantity = async (cartItemId, newQuantity) => {
    if (!currentUser || !currentUser.uid) {
      console.error("User not logged in. Cannot update cart.");
      return;
    }
    try {
      const response = await axios.put(`http://127.0.0.1:5000/api/cart/${cartItemId}`, {
        quantity: newQuantity,
      });
      if (response.status === 200) {
        fetchCart(); // Refresh cart after updating quantity
      }
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
    }
  };

  const updateCartItemNotes = async (cartItemId, newNotes) => {
    if (!currentUser || !currentUser.uid) {
      console.error("User not logged in. Cannot update cart.");
      return;
    }
    try {
      const response = await axios.put(`http://127.0.0.1:5000/api/cart/${cartItemId}`, {
        notes: newNotes,
      });
      if (response.status === 200) {
        fetchCart(); // Refresh cart after updating notes
      }
    } catch (error) {
      console.error("Error updating cart item notes:", error);
    }
  };

  const removeFromCart = async (cartItemId) => {
    if (!currentUser || !currentUser.uid) {
      console.error("User not logged in. Cannot remove from cart.");
      return;
    }
    try {
      const response = await axios.delete(`http://127.0.0.1:5000/api/cart/${cartItemId}`);
      if (response.status === 200) {
        fetchCart(); // Refresh cart after removing item
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const clearCart = async () => {
    // This would require a new backend endpoint to clear all items for a user
    // For now, we can just remove items one by one or implement a new endpoint later
    console.warn("Clear cart functionality not fully implemented yet.");
  };

  const value = {
    cartItems,
    addToCart,
    updateCartItemQuantity,
    updateCartItemNotes,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
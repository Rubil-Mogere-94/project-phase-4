import React, { useEffect, useState, useCallback } from "react";
import { useCart } from "../contexts/CartContext";
import debounce from 'lodash/debounce';

const CartPage = () => {
  const { cartItems, updateCartItemQuantity, updateCartItemNotes, removeFromCart } = useCart();

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleQuantityChange = (cartItemId, newQuantity) => {
    if (newQuantity > 0) {
      updateCartItemQuantity(cartItemId, newQuantity);
    }
  };

  const debouncedUpdateNotes = useCallback(
    debounce((cartItemId, newNotes) => {
      updateCartItemNotes(cartItemId, newNotes);
    }, 500), // 500ms debounce delay
    []
  );

  const handleNotesChange = (cartItemId, newNotes) => {
    // Optimistically update the UI
    const newCartItems = cartItems.map(item => 
      item.id === cartItemId ? { ...item, notes: newNotes } : item
    );
    // This local state update is not working as expected without a state setter.
    // Instead, we rely on the debounced function to trigger a re-fetch from the context.
    debouncedUpdateNotes(cartItemId, newNotes);
  };

  const handleGoToBuy = (affiliateLink) => {
    window.open(affiliateLink, "_blank");
  };

  const handleOpenAllInTabs = () => {
    cartItems.forEach((item) => {
      if (item.product.affiliate_link) {
        window.open(item.product.affiliate_link, "_blank");
      }
    });
  };

  const handleCopyCheckoutList = () => {
    const links = cartItems
      .map((item) => item.product.affiliate_link)
      .filter(Boolean)
      .join("\n");
    navigator.clipboard.writeText(links);
    alert("Checkout links copied to clipboard!");
  };

  const isValidImageUrl = (url) => {
    return url && (url.startsWith("http://") || url.startsWith("https://"));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Source</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Notes</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img
                      src={isValidImageUrl(item.product.image) ? item.product.image : "https://via.placeholder.com/50"}
                      alt={item.product.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                  </td>
                  <td>{item.product.title}</td>
                  <td>{item.product.source}</td>
                  <td>${item.product.price.toFixed(2)}</td>
                  <td>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(item.id, parseInt(e.target.value))
                      }
                      className="input input-bordered w-20"
                    />
                  </td>
                  <td>
                    <textarea
                      defaultValue={item.notes || ''}
                      onChange={(e) => handleNotesChange(item.id, e.target.value)}
                      className="textarea textarea-bordered w-full"
                      rows="2"
                    ></textarea>
                  </td>
                  <td>${(item.product.price * item.quantity).toFixed(2)}</td>
                  <td>
                    <button
                      onClick={() => handleGoToBuy(item.product.affiliate_link)}
                      className="btn btn-sm btn-info mr-2"
                    >
                      Go to Buy
                    </button>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="btn btn-sm btn-error"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 text-right">
            <h2 className="text-xl font-semibold">Total: ${total.toFixed(2)}</h2>
            <div className="mt-2">
              <button onClick={handleOpenAllInTabs} className="btn btn-primary mr-2">
                Open All in Tabs
              </button>
              <button onClick={handleCopyCheckoutList} className="btn btn-secondary">
                Copy Checkout List
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
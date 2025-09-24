import React, { useState, useEffect } from "react"
import axios from "axios"

const CartPage = () => {
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    // Placeholder: fetch from backend
    // axios.get("/cart-items").then(res => setCartItems(res.data))
    setCartItems([
      { id: "C1", name: "Nome Decore Range", price: 120, quantity: 2 },
      { id: "C2", name: "Disney Princess Dress", price: 80, quantity: 1 },
    ])
  }, [])

  const handleRemove = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id))
    // Future: call backend to remove item
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <table className="table table-zebra w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>${item.price}</td>
              <td>{item.quantity}</td>
              <td>${item.price * item.quantity}</td>
              <td>
                <button
                  onClick={() => handleRemove(item.id)}
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
        <h2 className="text-xl font-semibold">Total: ${total}</h2>
        <button className="btn btn-primary mt-2">Checkout</button>
      </div>
    </div>
  )
}

export default CartPage

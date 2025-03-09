import React, { useContext, useEffect } from "react";
import { CartContext } from "../components/CartContext";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
    getProductDetails,
  } = useContext(CartContext);
  // Calculate total price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + (item.price || 0) * item.quantity,
    0
  );
  // Fetch missing product details for cart items (if needed)
  useEffect(() => {
    cartItems.forEach((item) => {
      if (!item.price) {
        getProductDetails(item._id); // Fetch missing product details
      }
    });
  }, [cartItems, getProductDetails]);
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty!</p>
      ) : (
        <div>
          {/* List all cart items */}
          {cartItems.map((item) => (
            <CartItem
              key={item._id} // Use item._id as the key to ensure no duplication
              item={item}
              removeFromCart={removeFromCart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
            />
          ))}
          {/* Clear Cart Button */}
          <button
            className="bg-red-500 text-white p-2 rounded mt-4"
            onClick={clearCart}
          >
            Clear Cart
          </button>
          {/* Total Price */}
          <div className="mt-4 flex justify-between items-center text-lg font-semibold">
            <span>Total: ${totalPrice.toFixed(2)}</span>
            {/* Checkout Button */}
            <Link to="/checkout">
              <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
export default Cart;

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
  // Fetch missing product details for cart items (if needed)
  useEffect(() => {
    cartItems.forEach((item) => {
      if (!item.price) {
        getProductDetails(item._id); // Fetch missing product details
      }
    });
  }, [cartItems, getProductDetails]);
  // Calculate the total price
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  return (
    <div className="bg-[#F9F5FF] min-h-screen py-6">
      <div className="container mx-auto p-4 max-w-5xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">
          Your Cart
        </h1>
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-10 bg-white rounded-lg shadow-md">
            <div className="text-purple-400 text-6xl mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="8" cy="21" r="1"></circle>
                <circle cx="19" cy="21" r="1"></circle>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
              </svg>
            </div>
            <p className="text-center text-gray-600 text-lg mb-3">
              Your cart is empty!
            </p>
            <Link to="/">
              <button className="btn btn-primary text-white py-2 px-5 rounded-md">
                Continue Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Cart Header - Keeping "Product" centered */}
            <div className="bg-purple-100 p-3 grid grid-cols-1 text-purple-700 font-medium text-sm text-center">
              <div className="col-span-1">Product</div>
            </div>
            {/* Cart Items */}
            <div className="divide-y">
              {cartItems.map((item) => (
                <CartItem
                  key={item._id} // Keeping your original logic
                  item={item}
                  removeFromCart={removeFromCart}
                  increaseQuantity={increaseQuantity}
                  decreaseQuantity={decreaseQuantity}
                />
              ))}
            </div>
            {/* Total Price */}
            <div className="p-4 bg-purple-100 text-right text-lg font-semibold text-purple-700">
              <span>Total: </span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            {/* Cart Footer */}
            <div className="p-4 bg-purple-100">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                <button
                  className="btn btn-error text-white py-2 px-4 rounded-md"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>
                <Link to="/shipment">
                  <button className="btn btn-success text-white py-2 px-5 rounded-md">
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Cart;

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
    <div className="bg-[#F9F5FF] min-h-screen py-6">
      <div className="container mx-auto p-6 max-w-7xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-purple-700">
          Your Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-14 bg-white rounded-lg shadow-md">
            <div className="text-purple-400 text-6xl mb-4">
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
            <p className="text-center text-gray-600 text-xl mb-4">
              Your cart is empty!
            </p>
            <p className="text-center text-gray-500 mb-6">
              Looks like you haven't added any products to your cart yet.
            </p>
            <Link to="/">
              <button className="btn btn-primary text-white font-medium py-2 px-6 rounded-md transition-colors duration-300">
                Continue Shopping
              </button>
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Cart Items Header */}
            <div className="bg-purple-100 p-4 grid grid-cols-12 gap-4 border-b text-purple-700 font-medium">
              <div className="col-span-6 sm:col-span-7">Product</div>
              <div className="col-span-3 sm:col-span-3 text-center">
                Quantity
              </div>
              <div className="col-span-3 sm:col-span-2 text-right">Price</div>
            </div>

            {/* List all cart items */}
            <div className="divide-y">
              {cartItems.map((item) => (
                <CartItem
                  key={item._id} // Use item._id as the key to ensure no duplication
                  item={item}
                  removeFromCart={removeFromCart}
                  increaseQuantity={increaseQuantity}
                  decreaseQuantity={decreaseQuantity}
                />
              ))}
            </div>

            {/* Cart Footer - Actions and Total */}
            <div className="p-4 bg-purple-100">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <button
                  className="btn btn-error text-white py-2 px-4 rounded-md transition-colors duration-300"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>

                <div className="text-lg font-semibold text-purple-700">
                  Total: ${totalPrice.toFixed(2)}
                </div>

                <Link to="/shipment">
                  <button className="btn btn-success text-white py-2 px-6 rounded-md transition-colors duration-300">
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

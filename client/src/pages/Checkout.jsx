import React, { useEffect, useState } from "react";
import { useCart } from "../components/CartContext"; // Import the useCart hook
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, clearCart } = useCart(); // Use the useCart hook
  const navigate = useNavigate();
  const [shippingDetails, setShippingDetails] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false); // Track if the order is placed

  useEffect(() => {
    const savedShipping = localStorage.getItem("shippingDetails");
    if (savedShipping) {
      setShippingDetails(JSON.parse(savedShipping)); // Set shipping details from localStorage
    } else {
      navigate("/shipment"); // Redirect to shipment if shipping details are missing
    }
  }, []);

  useEffect(() => {
    if (shippingDetails && !orderPlaced) {
      const savedPayment = localStorage.getItem("paymentMethod");
      if (savedPayment) {
        setPaymentMethod(savedPayment); // Set payment method from localStorage
      } else {
        navigate("/payment"); // Redirect to payment if payment method is missing
      }
    }
  }, [shippingDetails, navigate, orderPlaced]);

  useEffect(() => {
    if (orderPlaced) {
      localStorage.setItem("orderPlaced", "true");
    }
  }, [orderPlaced]);

  const handlePlaceOrder = () => {
    const orderDetails = {
      shippingDetails,
      paymentMethod,
      cartItems,
      totalPrice: getTotalPrice(),
    };
    // Save the order details to localStorage
    localStorage.setItem("order", JSON.stringify(orderDetails));
    // Clear cart and other data
    localStorage.removeItem("shippingDetails");
    localStorage.removeItem("paymentMethod");
    clearCart(); // Clear the cart items from the context
    localStorage.removeItem("cartItems"); // Clear cart items from localStorage
    setOrderPlaced(true); // Mark the order as placed
    navigate("/order-confirmation"); // Navigate to the Order Confirmation page
  };

  const getTotalPrice = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  if (!shippingDetails) {
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center text-purple-700">
          Loading shipping details...
        </h1>
      </div>
    );
  }

  return (
    <div className="bg-[#F9F5FF] min-h-screen">
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-6">
          Order Review
        </h1>
        {/* Shipping Details Section */}
        {shippingDetails && (
          <div className="border p-4 rounded-md shadow-md bg-white mb-6">
            <h2 className="text-xl font-bold text-purple-700">
              Shipping Details
            </h2>
            <p className="text-gray-600">{shippingDetails.fullName}</p>
            <p className="text-gray-600">
              {shippingDetails.address}, {shippingDetails.city}
            </p>
            <p className="text-gray-600">
              {shippingDetails.country}, {shippingDetails.postalCode}
            </p>
            <p className="text-gray-600">{shippingDetails.phone}</p>
          </div>
        )}

        {/* Payment Method Section */}
        {paymentMethod && (
          <div className="border p-4 rounded-md shadow-md bg-white mb-6">
            <h2 className="text-xl font-bold text-purple-700">
              Payment Method
            </h2>
            <p className="text-gray-600">
              {paymentMethod === "creditCard" ? "Credit Card" : "PayPal"}
            </p>
          </div>
        )}

        {/* Cart Summary */}
        <div className="border p-4 rounded-md shadow-md bg-white mb-6">
          <h2 className="text-xl font-bold text-purple-700">Cart Summary</h2>
          {cartItems.length === 0 ? (
            <p className="text-gray-600">Your cart is empty</p>
          ) : (
            cartItems.map((item, index) => (
              <div
                key={item.id || `${index}-${item.name}`}
                className="flex justify-between items-center mb-4"
              >
                <div className="flex items-center">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-16 h-25 object-cover rounded-md"
                  />
                  <span className="ml-4 text-gray-600">{item.name}</span>
                </div>
                <div>
                  <span className="text-gray-600">
                    ${item.price} x {item.quantity}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Total Price */}
        <div className="border p-4 rounded-md shadow-md bg-white mb-6">
          <h2 className="text-xl font-bold text-purple-700">
            Total: ${getTotalPrice()}
          </h2>
        </div>

        {/* Place Order Button */}
        <button
          className="bg-purple-500 text-white p-2 rounded-md mt-6 w-full hover:bg-purple-600 transition duration-300"
          onClick={handlePlaceOrder}
          disabled={orderPlaced || cartItems.length === 0}
        >
          Place Order
        </button>

        {/* Order Confirmation Message */}
        {orderPlaced && (
          <div className="text-center mt-4">
            <p className="text-green-500 font-semibold">
              Order has been placed successfully!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Checkout;

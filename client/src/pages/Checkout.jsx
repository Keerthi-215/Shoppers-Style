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
  // useEffect(() => {
  //   const savedShipping = localStorage.getItem("shippingDetails");
  //   if (savedShipping) {
  //     setShippingDetails(JSON.parse(savedShipping)); // Set shipping details from localStorage
  //   } else {
  //     navigate("/shipment"); // Redirect to shipment if shipping details are missing
  //   }
  // }, [navigate]);
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

  // Effect to update localStorage when orderPlaced changes
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
    //console.log(orderDetails);
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
        <h1 className="text-3xl font-bold text-center">
          Loading shipping details...
        </h1>
      </div>
    );
  }
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center">Order Review</h1>
      {shippingDetails && (
        <div className="border p-4 rounded mt-4">
          <h2 className="text-xl font-bold">Shipping Details</h2>
          <p>{shippingDetails.fullName}</p>
          <p>
            {shippingDetails.address}, {shippingDetails.city}
          </p>
          <p>
            {shippingDetails.country}, {shippingDetails.postalCode}
          </p>
          <p>{shippingDetails.phone}</p>
        </div>
      )}
      {paymentMethod && (
        <div className="border p-4 rounded mt-4">
          <h2 className="text-xl font-bold">Payment Method</h2>
          <p>{paymentMethod === "creditCard" ? "Credit Card" : "PayPal"}</p>
        </div>
      )}
      <div className="border p-4 rounded mt-4">
        <h2 className="text-xl font-bold">Cart Summary</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cartItems.map((item, index) => (
            <div
              key={item.id || `${index}-${item.name}`}
              className="flex justify-between items-center"
            >
              <div>
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-md"
                />
                <span className="ml-4">{item.name}</span>
              </div>
              <div>
                <span>
                  ${item.price} x {item.quantity}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
      <div className="border p-4 rounded mt-4">
        <h2 className="text-xl font-bold">Total: ${getTotalPrice()}</h2>
      </div>
      <button
        className="bg-blue-500 text-white p-2 rounded mt-6 w-full"
        onClick={handlePlaceOrder}
        disabled={cartItems.length === 0}
      >
        View Order
      </button>
      {orderPlaced && (
        <div className="text-center mt-4">
          <p>Order has been placed successfully!</p>
        </div>
      )}
    </div>
  );
};
export default Checkout;

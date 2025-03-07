import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../components/CartContext";

const Order = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const [shippingDetails, setShippingDetails] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    const savedShipping = localStorage.getItem("shippingDetails");
    const savedPayment = localStorage.getItem("paymentMethod");

    if (savedShipping) setShippingDetails(JSON.parse(savedShipping));
    if (savedPayment) setPaymentMethod(savedPayment);

    // Place Order when Shipping & Payment Data is Available
    if (savedShipping && savedPayment) {
      placeOrder();
    }
  }, []);

  const placeOrder = async () => {
    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");

    if (!userId || !token) {
      console.error("User not logged in!");
      return;
    }

    const orderData = {
      user: userId,
      shippingDetails: JSON.parse(localStorage.getItem("shippingDetails")),
      cartItems: cartItems,
      totalPrice: cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      ),
      paymentMethod: localStorage.getItem("paymentMethod") || "COD",
      isPaid: false, // Default to unpaid
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/orders",
        orderData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        console.log("Order saved successfully:", response.data);
        localStorage.setItem("order", JSON.stringify(response.data)); // Save order for confirmation page
        setOrderPlaced(true);
        clearCart();
        localStorage.removeItem("shippingDetails");
        localStorage.removeItem("paymentMethod");
        navigate("/order-confirmation"); // Redirect to confirmation page
      }
    } catch (error) {
      console.error(
        "Error placing order:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="container mx-auto p-6">
      {orderPlaced ? (
        <>
          <h1 className="text-3xl font-bold text-center">
            Order Placed Successfully!
          </h1>
          <div className="text-center mt-6">
            <p className="text-lg">
              Thank you for your purchase. Your order has been confirmed.
            </p>
            <button
              onClick={() => navigate("/")}
              className="mt-6 bg-blue-500 text-white p-2 rounded"
            >
              Go to Homepage
            </button>
          </div>
        </>
      ) : (
        <div className="text-center">
          <p className="text-xl font-semibold">Processing your order...</p>
        </div>
      )}
    </div>
  );
};

export default Order;

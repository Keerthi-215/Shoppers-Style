import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const [order, setOrder] = useState(
    JSON.parse(localStorage.getItem("order")) || {}
  );
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (order && order.cartItems) {
      storeOrderInDatabase();
    }
  }, []);

  const storeOrderInDatabase = async () => {
    setLoading(true);
    setMessage("");

    const token = localStorage.getItem("token"); // Retrieve token

    if (!token) {
      setMessage("Authentication required. Please log in.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/orders",
        {
          user: localStorage.getItem("userId"), // Ensure userId is stored in localStorage
          shippingDetails: order.shippingDetails,
          cartItems: order.cartItems,
          totalPrice: order.totalPrice,
          paymentMethod: order.paymentMethod || "COD", // Default to Cash on Delivery if not provided
          isPaid: false, // Default to unpaid order
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Pass authentication token
          },
        }
      );

      if (response.status === 201) {
        setMessage("Order placed successfully!");
        localStorage.removeItem("order"); // Clear order details after successful placement
      }
    } catch (error) {
      console.error("Error storing order:", error);
      setMessage("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-6 px-4">
      <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-purple-700">
          Order Confirmation
        </h1>

        {message && (
          <p
            className={`text-center mt-4 ${
              message.includes("success") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}

        <div className="mt-6">
          {order.shippingDetails ? (
            <>
              <p className="text-xl text-center text-gray-700">
                Thank you for your order,{" "}
                <span className="font-bold">
                  {order.shippingDetails.fullName}
                </span>
                !
              </p>
              <p className="mt-4 text-center text-gray-600">
                Your order will be shipped to:
                <br />
                <span className="font-semibold">
                  {order.shippingDetails.address}
                </span>
                <br />
                {order.shippingDetails.city}, {order.shippingDetails.country} -{" "}
                {order.shippingDetails.postalCode}
                <br />
                <span className="font-semibold">Phone:</span>{" "}
                {order.shippingDetails.phone}
              </p>

              <h3 className="mt-6 text-2xl font-semibold text-gray-800 text-center">
                Order Summary
              </h3>
              <ul className="mt-4 space-y-2">
                {order.cartItems.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between text-gray-700"
                  >
                    <span>{item.name}</span>
                    <span>
                      {item.quantity} x ${item.price}
                    </span>
                  </li>
                ))}
              </ul>

              <p className="mt-4 font-bold text-xl text-gray-900 text-center">
                Total: ${order.totalPrice}
              </p>
            </>
          ) : (
            <p className="text-center text-red-500">Order details not found.</p>
          )}

          <div className="text-center mt-8">
            <button
              onClick={() => navigate("/")}
              className="bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition duration-300"
            >
              Go to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;

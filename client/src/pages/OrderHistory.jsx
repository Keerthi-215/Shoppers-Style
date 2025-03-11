import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [returnReasons, setReturnReasons] = useState({}); // Track return reasons
  const [disabledReturns, setDisabledReturns] = useState(
    JSON.parse(localStorage.getItem("disabledReturns")) || {} // Load from localStorage
  );

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        if (!user || !user._id) {
          setError("User not found. Please log in.");
          setLoading(false);
          return;
        }
        if (!token) {
          setError("Authentication token missing. Please log in again.");
          setLoading(false);
          return;
        }

        const userId = user._id;
        console.log("🔍 Fetching orders for user:", userId);

        const response = await axios.get(
          `http://localhost:5000/api/orders/user/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        console.log("✅ API Response:", response.data);
        setOrders(response.data);
      } catch (err) {
        console.error(
          "❌ Error fetching orders:",
          err.response?.data || err.message
        );
        setError(err.response?.data?.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Show return reason input when clicking "Return Order"
  const handleReturnClick = (orderId) => {
    setReturnReasons((prev) => ({ ...prev, [orderId]: "" })); // Initialize reason input
  };

  // Update reason input
  const handleReasonChange = (orderId, reason) => {
    setReturnReasons((prev) => ({ ...prev, [orderId]: reason }));
  };

  // Submit return request (Static - Only Alert & Disable Button, Saved in Local Storage)
  const handleSubmitReturn = (orderId) => {
    const reason = returnReasons[orderId];
    if (!reason.trim()) {
      alert("Please provide a reason for returning the order.");
      return;
    }

    alert("Your return is getting processed."); // Show static alert

    // Disable the return button for this order
    const updatedDisabledReturns = { ...disabledReturns, [orderId]: true };
    setDisabledReturns(updatedDisabledReturns);
    localStorage.setItem(
      "disabledReturns",
      JSON.stringify(updatedDisabledReturns)
    ); // Save to localStorage

    // Remove the reason input
    setReturnReasons((prev) => {
      const newState = { ...prev };
      delete newState[orderId];
      return newState;
    });
  };

  if (loading)
    return (
      <p className="text-lg text-center text-gray-500">Loading orders...</p>
    );
  if (error) return <p className="text-lg text-center text-red-500">{error}</p>;

  return (
    <div className="order-history max-w-3xl mx-auto p-6 bg-[#F3E8FF] rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
        Order History
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-gray-600">No orders found.</p>
      ) : (
        <ul className="space-y-6">
          {orders.map((order) => (
            <li
              key={order._id}
              className="p-5 border border-purple-300 rounded-lg shadow-md bg-white"
            >
              <h3 className="text-xl font-semibold text-purple-800">
                Order ID: {order._id}
              </h3>
              <p className="text-gray-600">
                <strong className="text-purple-700">Status:</strong>{" "}
                {order.status}
              </p>
              <p className="text-gray-600">
                <strong className="text-purple-700">Total Price:</strong> $
                {order.totalPrice?.toFixed(2)}
              </p>
              <p className="text-gray-600">
                <strong className="text-purple-700">Ordered on:</strong>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>

              {order.status === "delivered" && (
                <>
                  {!returnReasons.hasOwnProperty(order._id) ? (
                    <button
                      onClick={() => handleReturnClick(order._id)}
                      disabled={disabledReturns[order._id]}
                      className={`mt-4 px-4 py-2 rounded-md transition duration-200 ${
                        disabledReturns[order._id]
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-purple-600 text-white hover:bg-purple-700"
                      }`}
                    >
                      {disabledReturns[order._id]
                        ? "Return Requested"
                        : "Return Order"}
                    </button>
                  ) : (
                    <div className="mt-4">
                      <textarea
                        value={returnReasons[order._id]}
                        onChange={(e) =>
                          handleReasonChange(order._id, e.target.value)
                        }
                        placeholder="Enter return reason..."
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                      <button
                        onClick={() => handleSubmitReturn(order._id)}
                        className="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition duration-200"
                      >
                        Submit Return
                      </button>
                    </div>
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;

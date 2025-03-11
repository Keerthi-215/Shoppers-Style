import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Retrieve user data and token
        const user = JSON.parse(localStorage.getItem("user"));
        const token = localStorage.getItem("token");

        // Validate if user and token exist
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

        const userId = user._id; // Extract user ID
        console.log("🔍 Fetching orders for user:", userId);

        // API call to fetch orders
        const response = await axios.get(
          `http://localhost:5000/api/orders/user/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` }, // Correct header format
          }
        );

        console.log("✅ API Response:", response.data);

        // Prevent duplicate orders from being set
        setOrders((prevOrders) => {
          const newOrders = response.data;
          return JSON.stringify(prevOrders) !== JSON.stringify(newOrders)
            ? newOrders
            : prevOrders;
        });
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

              <h4 className="text-lg font-semibold text-purple-700 mt-4">
                Products:
              </h4>
              <ul className="list-disc ml-5">
                {order.products.map((item, index) => (
                  <li
                    key={item._id || item.productId?._id || index}
                    className="text-gray-700"
                  >
                    {item.productId?.name || "Unknown Product"} (x
                    {item.quantity})
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistory;

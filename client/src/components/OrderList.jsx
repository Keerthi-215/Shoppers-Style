import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/orders`);
        console.log("API Response:", response.data);

        if (response.data && Array.isArray(response.data)) {
          setOrders(response.data);
          const initialStatuses = {};
          response.data.forEach((order) => {
            initialStatuses[order._id] = order.status;
          });
          setSelectedStatuses(initialStatuses);
        } else {
          setError("Unexpected response format");
          console.error("Unexpected response structure:", response.data);
        }
      } catch (err) {
        setError("Failed to load orders");
        console.error("Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    setSelectedStatuses((prev) => ({
      ...prev,
      [orderId]: newStatus,
    }));
  };

  const updateOrderStatus = async (orderId) => {
    try {
      await axios.put(`${API_BASE_URL}/orders/${orderId}`, {
        status: selectedStatuses[orderId],
      });

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? { ...order, status: selectedStatuses[orderId] }
            : order
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Back Button */}
      <button
        onClick={() => window.history.back()}
        className="mb-4 px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-600"
      >
        ← Back
      </button>

      <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
        📦 Order List
      </h1>

      {loading && (
        <p className="text-center text-gray-600">Loading orders...</p>
      )}
      {error && <p className="text-center text-red-500">{error}</p>}

      {!loading && !error && orders.length === 0 && (
        <p className="text-center text-gray-500">No orders found.</p>
      )}

      {!loading && orders.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-3 border">Order ID</th>
                <th className="p-3 border">Product ID</th>
                <th className="p-3 border">Product Name</th>
                <th className="p-3 border">Quantity</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) =>
                order.products && order.products.length > 0 ? (
                  order.products.map((product, index) => (
                    <tr
                      key={`${order._id}-${index}`}
                      className="text-center border-b hover:bg-gray-100"
                    >
                      <td className="p-3 border">{order._id}</td>
                      <td className="p-3 border">
                        {product.productId?._id || "N/A"}
                      </td>
                      <td className="p-3 border">
                        {product.productId?.name || "N/A"}
                      </td>
                      <td className="p-3 border">{product.quantity}</td>
                      <td className="p-3 border">
                        <select
                          className="p-2 border rounded-md bg-gray-100"
                          value={selectedStatuses[order._id] || order.status}
                          onChange={(e) =>
                            handleStatusChange(order._id, e.target.value)
                          }
                        >
                          <option value="pending">Pending</option>
                          <option value="packed">Packed</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      </td>
                      <td className="p-3 border">
                        <button
                          onClick={() => updateOrderStatus(order._id)}
                          className="px-4 py-2 bg-purple-400 text-white rounded-md hover:bg-purple-600"
                        >
                          Update Status
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr
                    key={order._id}
                    className="text-center border-b hover:bg-gray-100"
                  >
                    <td className="p-3 border">{order._id}</td>
                    <td className="p-3 border" colSpan="5">
                      No items found
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default OrderList;

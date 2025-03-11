import { useState, useEffect } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState({});
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/orders`);

      if (response.data && Array.isArray(response.data)) {
        setOrders(response.data);
        const initialStatuses = {};
        response.data.forEach((order) => {
          initialStatuses[order?._id] = order.status;
        });
        setSelectedStatuses(initialStatuses);
      } else {
        setError("Unexpected response format");
      }
    } catch (err) {
      setError("Failed to load orders: " + (err.message || "Unknown error"));
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = (orderId, newStatus) => {
    setSelectedStatuses((prev) => ({
      ...prev,
      [orderId]: newStatus,
    }));
  };

  const updateOrderStatus = async (orderId) => {
    try {
      await axios.put(
        `${API_BASE_URL}/orders/${orderId}`,
        { status: selectedStatuses[orderId] },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order?._id === orderId
            ? { ...order, status: selectedStatuses[orderId] }
            : order
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  const confirmDeleteOrder = (orderId) => {
    setDeleteConfirm(orderId);
  };

  const cancelDelete = () => {
    setDeleteConfirm(null);
  };

  const deleteOrder = async (orderId) => {
    try {
      await axios.delete(`${API_BASE_URL}/orders/${orderId}`);
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order?._id !== orderId)
      );
      setDeleteConfirm(null);
    } catch (err) {
      console.error("Error deleting order:", err);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#F3E8FF] p-6 flex flex-col items-center relative">
      {/* Back Button at the Top Left */}
      <div className="absolute top-4 left-4">
        <button
          onClick={() => window.history.back()}
          className="btn btn-neutral"
        >
          ← Back
        </button>
      </div>

      <h1 className="text-4xl font-bold text-gray-800 text-center mb-6">
        📦 Order Management
      </h1>

      <div className="mb-4 flex justify-end w-full max-w-4xl">
        <button onClick={fetchOrders} className="btn btn-primary">
          Refresh Orders
        </button>
      </div>

      {loading && (
        <div className="flex flex-col items-center">
          <span className="loading loading-spinner loading-lg"></span>
          <p className="mt-2 text-gray-600">Loading orders...</p>
        </div>
      )}

      {error && (
        <div className="alert alert-error shadow-lg my-4">
          <span>{error}</span>
        </div>
      )}

      {!loading && orders.length === 0 && (
        <div className="alert alert-info shadow-lg">
          <span>No orders found.</span>
        </div>
      )}

      {!loading && orders.length > 0 && (
        <div className="overflow-x-auto w-full max-w-4xl shadow-lg rounded-lg bg-white p-4">
          <table className="table w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer ID</th>
                <th className="p-3">Status</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="p-3">{order?._id}</td>
                  <td className="p-3">{order?.userId?._id || "N/A"}</td>
                  <td className="p-3">
                    <select
                      className="select select-bordered w-full"
                      value={selectedStatuses[order?._id] || order.status}
                      onChange={(e) =>
                        handleStatusChange(order?._id, e.target.value)
                      }
                    >
                      <option value="pending">Pending</option>
                      <option value="packed">Packed</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-3">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => updateOrderStatus(order?._id)}
                        className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md"
                      >
                        Update
                      </button>

                      {deleteConfirm === order?._id ? (
                        <div className="flex flex-col items-center space-y-2">
                          <p className="text-sm text-red-600 font-semibold">
                            Confirm delete?
                          </p>
                          <button
                            onClick={() => deleteOrder(order?._id)}
                            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md"
                          >
                            Yes, Delete
                          </button>
                          <button
                            onClick={cancelDelete}
                            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => confirmDeleteOrder(order?._id)}
                          className="px-4 py-2 bg-red-300 hover:bg-red-700 text-white rounded-md"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Scroll to Top Button */}
      {/* <button
        onClick={scrollToTop}
        className="fixed bottom-6 right-6 bg-gray-700 hover:bg-gray-800 text-white p-3 rounded-full shadow-lg"
      >
        ↑
      </button> */}
    </div>
  );
}

export default OrderList;

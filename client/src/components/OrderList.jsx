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
      setError("Failed to load orders: " + (err.message || "Unknown error"));
      console.error("Error fetching orders:", err);
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
      console.log(
        `Updating order ${orderId} with status: ${selectedStatuses[orderId]}`
      );

      // Make sure we're using the correct property name (_id not _Id)
      const response = await axios.put(`${API_BASE_URL}/orders/${orderId}`, {
        status: selectedStatuses[orderId],
      });

      console.log("Update response:", response.data);

      // Update the local state with the new status
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === orderId
            ? { ...order, status: selectedStatuses[orderId] }
            : order
        )
      );

      // Show success message
      alert(`Order ${orderId} status updated successfully!`);
    } catch (err) {
      console.error("Error updating status:", err);
      alert(
        `Failed to update order status: ${
          err.message || "Unknown error"
        }. Check the console for details.`
      );
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
      console.log(`Deleting order ${orderId}`);

      // Make sure we're using the correct property name (_id not _Id)
      const response = await axios.delete(`${API_BASE_URL}/orders/${orderId}`);

      console.log("Delete response:", response.data);

      // Remove the order from state
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order._id !== orderId)
      );
      setDeleteConfirm(null);

      // Show success message
      alert(`Order ${orderId} successfully deleted!`);
    } catch (err) {
      console.error("Error deleting order:", err);
      alert(
        `Failed to delete order: ${
          err.message || "Unknown error"
        }. Check the console for details.`
      );
    }
  };

  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleString();
    } catch (err) {
      return dateString || "N/A";
    }
  };

  const formatPrice = (price) => {
    if (price === undefined || price === null) return "N/A";
    try {
      return `$${Number(price).toFixed(2)}`;
    } catch (err) {
      return price;
    }
  };

  // Helper to safely display product ID
  const safeDisplayId = (productItem) => {
    if (!productItem) return "N/A";

    // Handle different ways the productId might be stored
    if (!productItem.productId) return "N/A";

    if (typeof productItem.productId === "string") {
      return productItem.productId;
    } else if (productItem.productId._id) {
      return productItem.productId._id;
    } else if (typeof productItem.productId === "object") {
      // This handles ObjectId case
      return productItem.productId.toString
        ? productItem.productId.toString()
        : JSON.stringify(productItem.productId).slice(0, 20) + "...";
    } else {
      return String(productItem.productId);
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
        📦 Order Management
      </h1>

      <div className="mb-4 flex justify-end">
        <button
          onClick={fetchOrders}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Refresh Orders
        </button>
      </div>

      {loading && (
        <div className="text-center p-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-purple-500"></div>
          <p className="mt-2 text-gray-600">Loading orders...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4">
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && orders.length === 0 && (
        <div className="text-center p-8 bg-white rounded-lg shadow">
          <p className="text-gray-500 text-xl">No orders found.</p>
        </div>
      )}

      {!loading && orders.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 bg-white shadow-lg rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="p-3 border">Order ID</th>
                <th className="p-3 border">Customer ID</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Total Price</th>
                <th className="p-3 border">Products</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="text-center border-b hover:bg-gray-100"
                >
                  <td className="p-3 border">{order._id}</td>
                  <td className="p-3 border">{order.userId || "N/A"}</td>
                  <td className="p-3 border">{formatDate(order.createdAt)}</td>
                  <td className="p-3 border">
                    {formatPrice(order.totalPrice)}
                  </td>
                  <td className="p-3 border">
                    <div className="max-h-48 overflow-y-auto">
                      {order.products && order.products.length > 0 ? (
                        <table className="w-full text-sm">
                          <thead>
                            <tr className="bg-gray-100">
                              <th className="p-1">Product ID</th>
                              <th className="p-1">Quantity</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.products.map((product, idx) => (
                              <tr key={product._id || `product-${idx}`}>
                                <td className="p-1 border-t">
                                  {safeDisplayId(product)}
                                </td>
                                <td className="p-1 border-t">
                                  {product.quantity || "N/A"}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <p>No products found</p>
                      )}
                    </div>
                  </td>
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
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-3 border">
                    <div className="flex flex-col space-y-2">
                      <button
                        onClick={() => updateOrderStatus(order._id)}
                        className="px-4 py-2 bg-purple-500 text-white rounded-md hover:bg-purple-600"
                      >
                        Update
                      </button>

                      {deleteConfirm === order._id ? (
                        <div className="mt-2 flex flex-col space-y-2">
                          <p className="text-sm text-red-600 font-semibold">
                            Confirm delete?
                          </p>
                          <button
                            onClick={() => deleteOrder(order._id)}
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                          >
                            Yes, Delete
                          </button>
                          <button
                            onClick={cancelDelete}
                            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => confirmDeleteOrder(order._id)}
                          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
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
    </div>
  );
}

export default OrderList;

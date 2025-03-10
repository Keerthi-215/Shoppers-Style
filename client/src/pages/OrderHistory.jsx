import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Retrieve all orders from localStorage
    retrieveOrders();

    // Periodically update order statuses with randomized timing
    const interval = setInterval(() => {
      updateOrderStatus();
    }, 20000 + Math.random() * 10000); // Change status randomly between 20-30 seconds

    // Clean up the interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const retrieveOrders = () => {
    try {
      // Initialize allOrders array
      let allOrders = [];

      // Get multiple orders if they exist
      const ordersString = localStorage.getItem("orders");
      if (ordersString) {
        allOrders = JSON.parse(ordersString);
      }

      // Get single order if it exists (from the checkout flow) and it's not already in orders
      const orderString = localStorage.getItem("order");
      if (orderString) {
        const newOrder = JSON.parse(orderString);
        // Add some metadata if not present
        if (!newOrder.id) newOrder.id = `ORD-${Date.now()}`;
        if (!newOrder.orderDate) newOrder.orderDate = new Date().toISOString();
        if (!newOrder.status) newOrder.status = "Pending";

        // Check if this order is already in the orders array
        const orderExists = allOrders.some((order) => order.id === newOrder.id);

        if (!orderExists) {
          // Add the new order to the beginning of the array
          allOrders = [newOrder, ...allOrders];

          // Save the updated orders array back to localStorage
          localStorage.setItem("orders", JSON.stringify(allOrders));

          // Clear the single order from localStorage
          localStorage.removeItem("order");
        }
      }

      // Sort orders by date (newest first)
      allOrders.sort((a, b) => {
        const dateA = a.orderDate ? new Date(a.orderDate) : new Date(0);
        const dateB = b.orderDate ? new Date(b.orderDate) : new Date(0);
        return dateB - dateA;
      });

      setOrders(allOrders);
      setLoading(false);
    } catch (error) {
      console.error("Error retrieving orders:", error);
      setLoading(false);
    }
  };

  // Randomly update a single order status
  const updateOrderStatus = () => {
    setOrders((prevOrders) => {
      // Only proceed if there are orders to update
      if (prevOrders.length === 0) return prevOrders;

      // Get a random order to update (that isn't already delivered)
      const pendingOrders = prevOrders.filter(
        (order) => order.status !== "Delivered" && order.status !== "Cancelled"
      );

      if (pendingOrders.length === 0) return prevOrders;

      // Select a random pending order
      const randomIndex = Math.floor(Math.random() * pendingOrders.length);
      const orderToUpdate = pendingOrders[randomIndex];
      const orderIndex = prevOrders.findIndex(
        (order) => order.id === orderToUpdate.id
      );

      // Create a deep copy of the orders array
      const updatedOrders = [...prevOrders];

      // Update the status based on current status
      if (updatedOrders[orderIndex].status === "Pending") {
        updatedOrders[orderIndex] = {
          ...updatedOrders[orderIndex],
          status: "Processing",
        };
      } else if (updatedOrders[orderIndex].status === "Processing") {
        updatedOrders[orderIndex] = {
          ...updatedOrders[orderIndex],
          status: "Shipped",
        };
      } else if (updatedOrders[orderIndex].status === "Shipped") {
        updatedOrders[orderIndex] = {
          ...updatedOrders[orderIndex],
          status: "Delivered",
        };
      }

      // Small chance (5%) of an order being cancelled if it's still pending or processing
      const status = updatedOrders[orderIndex].status;
      if (
        (status === "Pending" || status === "Processing") &&
        Math.random() < 0.05
      ) {
        updatedOrders[orderIndex] = {
          ...updatedOrders[orderIndex],
          status: "Cancelled",
        };
      }

      // Save updated orders to localStorage
      localStorage.setItem("orders", JSON.stringify(updatedOrders));

      return updatedOrders;
    });
  };

  // Handle return order function
  const handleReturnOrder = (orderId) => {
    setOrders((prevOrders) => {
      const updatedOrders = prevOrders.map((order) => {
        if (order.id === orderId && order.status === "Delivered") {
          return { ...order, status: "Return Requested" };
        }
        return order;
      });

      // Save to localStorage
      localStorage.setItem("orders", JSON.stringify(updatedOrders));

      return updatedOrders;
    });
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  // Get status badge class based on status
  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-purple-100 text-purple-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "return requested":
        return "bg-orange-100 text-orange-800";
      case "returned":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Calculate total items in an order
  const getTotalItems = (cartItems) => {
    if (!cartItems || !Array.isArray(cartItems)) return 0;
    return cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-3xl font-bold">Order History</h1>
        <p className="mt-4">Loading your orders...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Order History</h1>

      {orders.length === 0 ? (
        <div className="text-center py-8 border rounded-lg shadow-sm bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">No Orders Found</h2>
          <p className="text-gray-600 mb-4">
            You haven't placed any orders yet.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded transition-colors"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div
              key={order.id || index}
              className="border rounded-lg shadow-sm overflow-hidden"
            >
              {/* Order Header */}
              <div className="bg-gray-50 p-4 border-b flex flex-col sm:flex-row justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="text-xl font-bold">
                      Order #{order.id || index + 1}
                    </h2>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeClass(
                        order.status
                      )}`}
                    >
                      {order.status || "Pending"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    Placed on {formatDate(order.orderDate)}
                  </p>
                </div>
                <div className="mt-2 sm:mt-0 sm:text-right">
                  <p className="font-bold">
                    ${parseFloat(order.totalPrice).toFixed(2)}
                  </p>
                  <p className="text-sm text-gray-600">
                    {getTotalItems(order.cartItems)} items
                  </p>
                </div>
              </div>

              {/* Order Content */}
              <div className="p-4">
                {/* Shipping Details */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h3 className="font-semibold mb-2 text-gray-700">
                      Shipping Details
                    </h3>
                    {order.shippingDetails ? (
                      <div className="text-sm">
                        <p>{order.shippingDetails.fullName}</p>
                        <p>
                          {order.shippingDetails.address},{" "}
                          {order.shippingDetails.city}
                        </p>
                        <p>
                          {order.shippingDetails.country},{" "}
                          {order.shippingDetails.postalCode}
                        </p>
                        {order.shippingDetails.phone && (
                          <p>Phone: {order.shippingDetails.phone}</p>
                        )}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500">
                        No shipping details available
                      </p>
                    )}
                  </div>

                  <div>
                    <h3 className="font-semibold mb-2 text-gray-700">
                      Payment Method
                    </h3>
                    <p className="text-sm">
                      {order.paymentMethod === "creditCard"
                        ? "Credit Card"
                        : order.paymentMethod || "Not specified"}
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <h3 className="font-semibold mb-2 text-gray-700">Items</h3>
                {order.cartItems && order.cartItems.length > 0 ? (
                  <div className="divide-y">
                    {order.cartItems.map((item, idx) => (
                      <div
                        key={idx}
                        className="py-3 flex justify-between items-center"
                      >
                        <div className="flex items-center">
                          {item.imageUrl && (
                            <img
                              src={item.imageUrl}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded mr-3"
                              onError={(e) => (e.target.style.display = "none")}
                            />
                          )}
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-600">
                              Qty: {item.quantity}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p>${parseFloat(item.price).toFixed(2)}</p>
                          <p className="text-sm text-gray-600">
                            Subtotal: ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">
                    No items in this order
                  </p>
                )}
              </div>

              {/* Order Footer */}
              <div className="bg-gray-50 p-4 border-t flex flex-wrap justify-between items-center">
                <div className="flex space-x-4">
                  {/* <button
                    onClick={() =>
                      navigate(`/order-details/${order.id || index}`)
                    }
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                  >
                    View Details
                  </button> */}

                  {order.status === "Delivered" && (
                    <button
                      onClick={() => handleReturnOrder(order.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Return Order
                    </button>
                  )}
                </div>
                <p className="font-bold">
                  Total: ${parseFloat(order.totalPrice).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-3 mt-8">
        <button
          onClick={() => navigate("/")}
          className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded flex-1 transition-colors"
        >
          Continue Shopping
        </button>
        {orders.length > 0 && (
          <button
            onClick={() => navigate("/login")}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 p-2 rounded flex-1 transition-colors"
          >
            Back to Account
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;

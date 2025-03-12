// Function to fetch orders by user ID
const fetchOrdersByUserId = async (userId) => {
  try {
    // Validate that userId is provided
    if (!userId) {
      throw new Error("User ID is required");
    }

    // Create the URL for the API endpoint
    const url = `/api/orders/user/${userId}`;

    // Make the API request
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Include authorization if your API requires it
        // 'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
    });

    // Check if the response is successful
    if (!response.ok) {
      // Parse the error response
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch orders");
    }

    // Parse and return the orders
    const orders = await response.json();
    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

// Usage example:
// This function could be called in a React component like this:
/*
  import React, { useState, useEffect } from 'react';
  
  const UserOrdersPage = ({ userId }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      // Fetch orders when component mounts
      const loadOrders = async () => {
        try {
          setLoading(true);
          const userOrders = await fetchOrdersByUserId(userId);
          setOrders(userOrders);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      loadOrders();
    }, [userId]);
  
    if (loading) return <p>Loading orders...</p>;
    if (error) return <p>Error: {error}</p>;
    if (orders.length === 0) return <p>No orders found</p>;
  
    return (
      <div>
        <h2>Your Orders</h2>
        <div className="orders-list">
          {orders.map(order => (
            <div key={order._id} className="order-card">
              <p>Order ID: {order._id}</p>
              <p>Status: {order.status}</p>
              <p>Total: ${order.totalPrice}</p>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default UserOrdersPage;
  */

export default fetchOrdersByUserId;

import React, { useEffect, useState } from "react";
import axios from "axios";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [returnReasons, setReturnReasons] = useState({});
  const [disabledReturns, setDisabledReturns] = useState(
    JSON.parse(localStorage.getItem("disabledReturns")) || {}
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

        const response = await axios.get(
          `http://localhost:5000/api/orders/user/${user._id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setOrders(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleReturnClick = (orderId) => {
    setReturnReasons((prev) => ({ ...prev, [orderId]: "" }));
  };

  const handleReasonChange = (orderId, reason) => {
    setReturnReasons((prev) => ({ ...prev, [orderId]: reason }));
  };

  const handleSubmitReturn = (orderId) => {
    const reason = returnReasons[orderId];
    if (!reason.trim()) {
      alert("Please provide a reason for returning the order.");
      return;
    }

    alert("Your return is getting processed.");
    const updatedDisabledReturns = { ...disabledReturns, [orderId]: true };
    setDisabledReturns(updatedDisabledReturns);
    localStorage.setItem(
      "disabledReturns",
      JSON.stringify(updatedDisabledReturns)
    );

    setReturnReasons((prev) => {
      const newState = { ...prev };
      delete newState[orderId];
      return newState;
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100">
      <div className="w-full max-w-3xl p-6 bg-white shadow-lg rounded-lg my-6">
        <h2 className="text-3xl font-bold text-center text-purple-700 mb-6">
          Order History
        </h2>

        {loading ? (
          <p className="text-lg text-center text-gray-500">Loading orders...</p>
        ) : error ? (
          <p className="text-lg text-center text-red-500">{error}</p>
        ) : orders.length === 0 ? (
          <div className="flex items-center justify-center h-[50vh]">
            <p className="text-xl text-gray-500">No orders found.</p>
          </div>
        ) : (
          <ul className="space-y-6">
            {orders.map((order) => (
              <li
                key={order._id}
                className="card bg-white shadow-lg p-5 rounded-lg"
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
                        className={`btn w-24 mt-4 ${
                          disabledReturns[order._id]
                            ? "btn-disabled"
                            : "bg-blue-500 hover:bg-blue-600 text-white"
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
                          className="btn btn-error mt-2"
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

      {/* Footer at the bottom */}
      {/* <footer className="w-full bg-gray-200 py-4 text-center text-gray-600 mt-auto">
        &copy; {new Date().getFullYear()} My E-Commerce. All rights reserved.
      </footer> */}
    </div>
  );
};

export default OrderHistory;

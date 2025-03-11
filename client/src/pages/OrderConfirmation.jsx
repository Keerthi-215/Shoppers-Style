import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/CartContext";

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const [order, setOrder] = useState(null);
  const [saveStatus, setSaveStatus] = useState({ local: false, db: false });
  const [error, setError] = useState(null);
  const [orderId, setOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fixed API endpoint - ensure it matches your backend configuration
  const API_PATH = "/api/orders";

  useEffect(() => {
    // Get order details from localStorage
    try {
      const savedOrder = JSON.parse(localStorage.getItem("order"));

      if (
        !savedOrder ||
        !savedOrder.cartItems ||
        savedOrder.cartItems.length === 0
      ) {
        setTimeout(() => navigate("/order-confirmation"), 2000);

        //navigate("/");
        return;
      }

      setOrder(savedOrder);
      setSaveStatus((prev) => ({ ...prev, local: true }));

      // Format the order data according to your MongoDB schema
      const formatOrderForDB = () => {
        // Get the user ID from localStorage or context if available
        const userId = localStorage.getItem("userId") || "guest";

        return {
          userId: userId,
          totalPrice: savedOrder.totalPrice,
          status: "pending",
          products: savedOrder.cartItems.map((item) => ({
            productId: item.id, // Make sure this matches your MongoDB Product ID format
            name: item.name,
            price: item.price,
            quantity: item.quantity,
          })),
          shippingDetails: savedOrder.shippingDetails,
        };
      };

      // Save order to MongoDB
      const saveOrderToDatabase = async () => {
        try {
          setIsLoading(true);
          const orderData = formatOrderForDB();
          //new update
          if (order?._id) {
            console.log("Order already saved, skipping API call.");
            return;
          }

          const token = localStorage.getItem("token");
          //console.log(token);
          if (localStorage.getItem("order")) {
            const res = await axios.post(
              "http://localhost:5000/api/orders",
              orderData,
              {
                headers: {
                  "Content-Type": "application/json",
                  ...(token && { authorization: `Bearer ${token}` }),
                },
              }
            );
            setOrder(null);
            const data = res?.data;
            // Update the order in localStorage with the MongoDB _id
            const updatedOrder = {
              ...savedOrder,
              _id: data._id || data.id,
              createdAt: data.createdAt || new Date().toISOString(),
            };
            localStorage.setItem("order", JSON.stringify(updatedOrder));

            setOrder(updatedOrder);
            setOrderId(data._id || data.id);
            setSaveStatus((prev) => ({ ...prev, db: true }));
          }
          // Clear the cart after successful order placement
          clearCart();
          localStorage.removeItem("order");
          // const savedOrder = JSON.parse(localStorage.getItem("order"));
        } catch (err) {
          console.error("Error saving order to database:", err);
          setError(err.message);
        } finally {
          setIsLoading(false);
        }
      };
      if (localStorage.getItem("order")) {
        saveOrderToDatabase();
      }
    } catch (err) {
      console.error("Error parsing order from localStorage:", err);
      setError("Failed to load order information");
      setIsLoading(false);
    }
    return () => {
      return localStorage.removeItem("order");
    };
  }, [navigate]);

  if (isLoading && !order) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!order && !isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">
            Order Not Found
          </h2>
          <p className="text-gray-700 mb-6">
            We couldn't find your order information. Please try again or contact
            support.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-6 px-4">
      <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600">
          Order Confirmation
        </h1>

        {/* Storage confirmation messages */}
        <div className="mt-2 text-center space-y-2">
          {saveStatus.local && (
            <span className="block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
              ✓ Order saved locally
            </span>
          )}

          {saveStatus.db ? (
            <span className="block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
              ✓ Order saved to database
            </span>
          ) : error ? (
            <span className="block bg-red-100 text-red-800 text-sm font-medium px-3 py-1 rounded-full">
              ✗ Failed to save to database: {error}
            </span>
          ) : (
            <span className="block bg-yellow-100 text-yellow-800 text-sm font-medium px-3 py-1 rounded-full">
              ⟳ Saving to database...
            </span>
          )}

          {orderId && (
            <p className="text-gray-600 text-sm mt-1">Order ID: {orderId}</p>
          )}
        </div>

        <div className="mt-6">
          {order?.shippingDetails ? (
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
                {order.cartItems &&
                  order.cartItems.map((item, index) => (
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
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300"
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

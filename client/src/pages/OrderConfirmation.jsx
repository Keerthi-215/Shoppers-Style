import { useNavigate } from "react-router-dom";
import { useCart } from "../components/CartContext"; // Import useCart hook

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart(); // Get cart items from the context
  const order = JSON.parse(localStorage.getItem("order")) || {}; // Get order details from localStorage

  // If the order doesn't exist or the cart is empty, redirect to the home page
  if (!order || !order.cartItems || order.cartItems.length === 0) {
    navigate("/");
    return null;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 py-6 px-4">
      <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-blue-600">
          Order Confirmation
        </h1>

        {/* Storage confirmation message */}
        <div className="mt-2 text-center">
          <span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
            ✓ Order successfully created
          </span>
        </div>

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

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/CartContext";

const Order = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const [shippingDetails, setShippingDetails] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    const savedShipping = localStorage.getItem("shippingDetails");
    const savedPayment = localStorage.getItem("paymentMethod");

    if (savedShipping) setShippingDetails(JSON.parse(savedShipping));
    if (savedPayment) setPaymentMethod(savedPayment);

    // Simulate order placement after payment
    if (savedShipping && savedPayment) {
      setOrderPlaced(true);
      // Clear cart and local storage after order is placed
      clearCart();
      localStorage.removeItem("shippingDetails");
      localStorage.removeItem("paymentMethod");
    }
  }, [clearCart]);

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-6">
      {orderPlaced ? (
        <>
          <h1 className="text-3xl font-bold text-center">Order Confirmation</h1>
          <div className="mt-6 text-center">
            <p className="text-xl font-semibold">
              Your order has been placed successfully!
            </p>
            <div className="mt-4 border p-4 rounded">
              <h2 className="text-xl font-bold">Order Summary</h2>

              {shippingDetails && (
                <div className="mt-4">
                  <h3 className="font-semibold">Shipping Information</h3>
                  <p>{shippingDetails.fullName}</p>
                  <p>
                    {shippingDetails.address}, {shippingDetails.city},{" "}
                    {shippingDetails.country}, {shippingDetails.postalCode}
                  </p>
                  <p>{shippingDetails.phone}</p>
                </div>
              )}

              {paymentMethod && (
                <div className="mt-4">
                  <h3 className="font-semibold">Payment Method</h3>
                  <p>
                    {paymentMethod === "creditCard" ? "Credit Card" : "PayPal"}
                  </p>
                </div>
              )}

              <div className="mt-4">
                <h3 className="font-semibold">Cart Items</h3>
                <ul>
                  {cartItems.map((item) => (
                    <li key={item.id} className="flex justify-between py-2">
                      <span>
                        {item.name} x{item.quantity}
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex justify-between text-lg font-semibold">
                  <span>Total Price:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigate("/")}
              className="bg-blue-500 text-white p-2 rounded mt-6"
            >
              Go to Homepage
            </button>
          </div>
        </>
      ) : (
        <div className="text-center">
          <p className="text-xl font-semibold">Order processing...</p>
        </div>
      )}
    </div>
  );
};

export default Order;

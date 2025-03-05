import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const [isPayPalReady, setIsPayPalReady] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    shippingDetails: JSON.parse(localStorage.getItem("shippingDetails")) || {},
    paymentMethod: "paypal", // default to PayPal
    totalPrice: 100.0, // Example total price; replace with actual total from cart
  });

  const PAYPAL_CLIENT_ID =
    "AaB0UeeqSCx4j1kuOcS5wc9mzr_TKTGUBwb7TKTLCdlt3MWId82Pe0D6_bUfHtu5mw6dI-FJpfh9eu9B"; // Use your actual PayPal Client ID

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&components=buttons`;
    script.onload = () => setIsPayPalReady(true);
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (isPayPalReady) {
      window.paypal
        .Buttons({
          createOrder: function (data, actions) {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: orderDetails.totalPrice.toString(),
                  },
                },
              ],
            });
          },
          onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
              alert("Payment Successful: " + details.payer.name.given_name);
              localStorage.setItem("paymentMethod", "paypal"); // Store payment method
              localStorage.setItem("order", JSON.stringify(orderDetails)); // Save order details
              navigate("/checkout"); // Proceed to checkout page after payment
            });
          },
          onCancel: function () {
            alert("Payment cancelled");
            navigate("/checkout"); // Navigate back to checkout if payment is canceled
          },
        })
        .render("#paypal-button-container");
    }
  }, [isPayPalReady, orderDetails, navigate]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center">Payment Method</h1>
      <form className="max-w-lg mx-auto mt-6">
        <div className="mt-4">
          <label className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              value="paypal"
              checked={orderDetails.paymentMethod === "paypal"}
              readOnly
              className="mr-2"
            />
            PayPal or Credit Card via PayPal
          </label>
        </div>

        {isPayPalReady && (
          <div className="mt-6">
            <div id="paypal-button-container"></div>
          </div>
        )}
      </form>
    </div>
  );
};

export default Payment;

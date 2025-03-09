import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const [isPayPalReady, setIsPayPalReady] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    shippingDetails: JSON.parse(localStorage.getItem("shippingDetails")) || {},
    paymentMethod: "paypal",
    totalPrice: 100.0, // Example total price; replace with actual total from cart
  });

  const PAYPAL_CLIENT_ID =
    "AaB0UeeqSCx4j1kuOcS5wc9mzr_TKTGUBwb7TKTLCdlt3MWId82Pe0D6_bUfHtu5mw6dI-FJpfh9eu9B";

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
              localStorage.setItem("paymentMethod", "paypal");
              localStorage.setItem("order", JSON.stringify(orderDetails));
              navigate("/checkout");
            });
          },
          onCancel: function () {
            alert("Payment cancelled");
            navigate("/checkout");
          },
        })
        .render("#paypal-button-container");
    }
  }, [isPayPalReady, orderDetails, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F3E8FF] p-6">
      <div className="card w-full max-w-lg bg-white shadow-xl p-6 rounded-lg">
        <h1 className="text-3xl font-bold text-purple-700 text-center">
          Payment Method
        </h1>

        <form className="mt-6">
          <div className="form-control">
            {/* <label className="label cursor-pointer flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={orderDetails.paymentMethod === "paypal"}
                readOnly
                className="radio radio-primary mr-2"
              />
              <span className="text-purple-700 font-medium text-lg tracking-wide px-4 py-2 ">
                PayPal or Credit Card via PayPal
              </span>
            </label> */}
          </div>

          {isPayPalReady && (
            <div className="mt-6">
              <div id="paypal-button-container"></div>
            </div>
          )}

          <div className="mt-6">
            <button
              onClick={() => navigate("/")}
              className="btn btn-outline border-purple-600 text-purple-600 w-full transition-all duration-300 ease-in-out hover:bg-purple-400 hover:text-white"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Payment;

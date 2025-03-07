import { useState } from "react";
import axios from "axios";

const SaveOrder = ({ userId, products, totalPrice }) => {
  const [status, setStatus] = useState(null);
  const [error, setError] = useState(null);

  const handleOrderSubmit = async () => {
    try {
      const orderData = { userId, products, totalPrice };
      const response = await axios.post("/api/orders", orderData, {
        headers: { "Content-Type": "application/json" },
      });
      setStatus("Order placed successfully!");
      console.log("Order Response:", response.data);
    } catch (err) {
      setError("Failed to place order. Please try again.");
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Confirm Your Order</h2>
      <p>Total Price: ${totalPrice}</p>
      <button onClick={handleOrderSubmit}>Place Order</button>
      {status && <p style={{ color: "green" }}>{status}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default SaveOrder;

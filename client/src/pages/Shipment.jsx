import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Shipment = () => {
  const navigate = useNavigate();
  const [shippingDetails, setShippingDetails] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setShippingDetails({ ...shippingDetails, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting shipping details:", shippingDetails); // Debugging log
    localStorage.setItem("shippingDetails", JSON.stringify(shippingDetails)); // Save to localStorage
    navigate("/payment"); // Navigate to payment page after saving details
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center">Shipping Details</h1>
      <form className="max-w-lg mx-auto mt-6" onSubmit={handleSubmit}>
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          required
          className="w-full p-2 border rounded mt-2"
          onChange={handleChange}
        />
        <input
          type="text"
          name="address"
          placeholder="Address"
          required
          className="w-full p-2 border rounded mt-2"
          onChange={handleChange}
        />
        <input
          type="text"
          name="city"
          placeholder="City"
          required
          className="w-full p-2 border rounded mt-2"
          onChange={handleChange}
        />
        <input
          type="text"
          name="postalCode"
          placeholder="Postal Code"
          required
          className="w-full p-2 border rounded mt-2"
          onChange={handleChange}
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          required
          className="w-full p-2 border rounded mt-2"
          onChange={handleChange}
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          required
          className="w-full p-2 border rounded mt-2"
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white w-full p-2 rounded mt-4"
        >
          Continue to Payment
        </button>
      </form>
    </div>
  );
};

export default Shipment;

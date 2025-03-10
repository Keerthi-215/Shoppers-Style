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
    const { name, value } = e.target;
    // For postalCode and phone, only allow numeric values
    if (name === "postalCode" || name === "phone") {
      if (!/^\d*$/.test(value)) return; // Block non-numeric input
    }
    setShippingDetails({ ...shippingDetails, [name]: value });
  };
  // Handle key press to prevent non-numeric input for specific fields
  const handleKeyPress = (e) => {
    const { name } = e.target;
    if (name === "postalCode" || name === "phone") {
      // Allow only digits and control keys
      if (
        !/^\d$/.test(e.key) &&
        e.key !== "Backspace" &&
        e.key !== "Delete" &&
        e.key !== "ArrowLeft" &&
        e.key !== "ArrowRight" &&
        e.key !== "Tab"
      ) {
        e.preventDefault();
      }
    }
  };
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting shipping details:", shippingDetails);
    localStorage.setItem("shippingDetails", JSON.stringify(shippingDetails));
    navigate("/payment");
  };
  return (
    <div className="min-h-screen bg-[#F3E8FF] flex items-center justify-center p-6">
      <div className="card w-full max-w-lg bg-white shadow-xl p-6 rounded-lg">
        <h1 className="text-3xl font-bold text-purple-700 text-center">
          Shipping Details
        </h1>
        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-purple-600">Full Name</span>
            </label>
            <input
              type="text"
              name="fullName"
              placeholder="Enter your full name"
              required
              className="input input-bordered w-full"
              onChange={handleChange}
              value={shippingDetails.fullName}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-purple-600">Address</span>
            </label>
            <input
              type="text"
              name="address"
              placeholder="Enter your address"
              required
              className="input input-bordered w-full"
              onChange={handleChange}
              value={shippingDetails.address}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-purple-600">City</span>
            </label>
            <input
              type="text"
              name="city"
              placeholder="Enter your city"
              required
              className="input input-bordered w-full"
              onChange={handleChange}
              value={shippingDetails.city}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-purple-600">Postal Code</span>
            </label>
            <input
              type="text"
              name="postalCode"
              placeholder="Enter postal code"
              required
              className="input input-bordered w-full"
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              value={shippingDetails.postalCode}
              inputMode="numeric"
              pattern="[0-9]*"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-purple-600">Country</span>
            </label>
            <input
              type="text"
              name="country"
              placeholder="Enter your country"
              required
              className="input input-bordered w-full"
              onChange={handleChange}
              value={shippingDetails.country}
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-purple-600">Phone Number</span>
            </label>
            <input
              type="text"
              name="phone"
              placeholder="Enter phone number"
              required
              className="input input-bordered w-full"
              onChange={handleChange}
              onKeyDown={handleKeyPress}
              value={shippingDetails.phone}
              inputMode="numeric"
              pattern="[0-9]*"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary bg-purple-600 hover:bg-purple-800 text-white w-full mt-4"
          >
            Continue to Payment
          </button>
        </form>
      </div>
    </div>
  );
};
export default Shipment;

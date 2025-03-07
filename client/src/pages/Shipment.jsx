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

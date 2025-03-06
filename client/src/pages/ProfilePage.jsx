import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const EditProfileModal = ({ user, onUpdate }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    mobileNumber: "",
    password: "",
  });

  useEffect(() => {
    let storedUser = user;

    if (!storedUser) {
      storedUser = JSON.parse(localStorage.getItem("user"));
      console.log("Retrieved user from localStorage:", storedUser);
    }

    if (storedUser) {
      setFormData({
        name: storedUser.name || "",
        email: storedUser.email || "",
        address: storedUser.address || "",
        mobileNumber: storedUser.mobileNumber || "",
        password: "",
      });
    } else {
      console.error("No user data found!");
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let currentUser = user || JSON.parse(localStorage.getItem("user"));

    if (!currentUser || !currentUser._id) {
      console.error("User ID is missing:", currentUser);
      alert("Error: User ID is missing. Please try again.");
      return;
    }

    try {
      const updateData = {
        name: formData.name,
        email: formData.email,
        address: formData.address,
        mobileNumber: formData.mobileNumber,
      };

      if (formData.password) {
        updateData.password = formData.password;
      }

      // 🔥 API request using the direct URL
      await axios.put(
        `http://localhost:5000/api/users/${currentUser._id}`,
        updateData,
        { headers: { "Content-Type": "application/json" } }
      );

      const updatedUser = { ...currentUser, ...updateData };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      onUpdate();
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error);
      alert("Profile update failed. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate("/login");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96 max-h-[80vh] overflow-y-auto border border-gray-300">
        <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center">
          Edit Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-gray-700">
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </label>
          <label className="block text-gray-700">
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </label>
          <label className="block text-gray-700">
            Address
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </label>
          <label className="block text-gray-700">
            Mobile Number
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </label>
          <label className="block text-gray-700">
            Reset Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="input input-bordered w-full"
              placeholder="Enter new password"
            />
          </label>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={handleCancel}
              className="btn bg-gray-300 hover:bg-gray-400 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn bg-gray-600 hover:bg-gray-700 text-white"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;

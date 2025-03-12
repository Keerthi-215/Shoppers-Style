import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfilePage = ({ user, onUpdate }) => {
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

    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found, user is not authenticated.");
      alert("Error: You are not authorized. Please log in again.");
      return;
    }

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

      await axios.put(
        `https://shoppers-bsxp.onrender.com//users/${currentUser._id}`,
        updateData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedUser = { ...currentUser, ...updateData };
      localStorage.setItem("user", JSON.stringify(updatedUser));

      alert("Profile updated successfully!");

      if (typeof onUpdate === "function") {
        onUpdate();
      } else {
        console.warn("onUpdate is not provided or not a function");
      }

      navigate("/");
    } catch (error) {
      console.error("Error updating profile:", error.response?.data || error);
      alert("Profile update failed. Please try again.");
    }
  };

  const handleCancel = () => {
    navigate("/");
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#F3E8FF]">
      <div className="bg-white/90 p-8 rounded-2xl shadow-xl w-96 backdrop-blur-md border border-gray-300">
        <h2 className="text-2xl font-bold mb-4 text-purple-700 text-center">
          Edit Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block text-gray-800 font-medium">
            Name
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-purple-300 rounded-lg focus:ring focus:ring-purple-400 bg-[#F3E8FF] text-gray-800"
              required
            />
          </label>
          <label className="block text-gray-800 font-medium">
            Email
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-purple-300 rounded-lg focus:ring focus:ring-purple-400 bg-[#F3E8FF] text-gray-800"
              required
            />
          </label>
          <label className="block text-gray-800 font-medium">
            Address
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-3 border border-purple-300 rounded-lg focus:ring focus:ring-purple-400 bg-[#F3E8FF] text-gray-800"
            />
          </label>
          <label className="block text-gray-800 font-medium">
            Mobile Number
            <input
              type="text"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              className="w-full p-3 border border-purple-300 rounded-lg focus:ring focus:ring-purple-400 bg-[#F3E8FF] text-gray-800"
            />
          </label>
          <label className="block text-gray-800 font-medium">
            Reset Password
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border border-purple-300 rounded-lg focus:ring focus:ring-purple-400 bg-[#F3E8FF] text-gray-800"
              placeholder="Enter new password"
            />
          </label>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg px-4 py-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gradient-to-r from-pink-500 via-fuchsia-600 to-purple-700 text-white rounded-lg px-4 py-2"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;

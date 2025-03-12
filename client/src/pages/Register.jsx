import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// API instance for cleaner requests
const api = axios.create({
  baseURL: "http://localhost:5000/api/auth",
  headers: { "Content-Type": "application/json" },
});

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // Handle input changes dynamically
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
  };

  // Handle form submission
  const handleCreateUser = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic validation check before sending the request
    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.address
    ) {
      setError("All fields are required.");
      return;
    }

    try {
      await api.post("/register", formData);

      setSuccess("User created successfully! Redirecting...");
      setFormData({ name: "", email: "", password: "", address: "" });

      // Redirect to login after short delay
      setTimeout(() => navigate("/login"), 1500);
    } catch (error) {
      console.error(
        "Registration error:",
        error.response?.data || error.message
      );
      setError(error.response?.data?.message || "Failed to create user");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleCreateUser}
        className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center">Create New User</h2>

        {error && <p className="text-sm text-red-500">{error}</p>}
        {success && <p className="text-sm text-green-500">{success}</p>}

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          className="w-full input input-bordered"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full input input-bordered"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full input input-bordered"
          required
        />

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={formData.address}
          onChange={handleChange}
          className="w-full input input-bordered"
          required
        />

        <button
          type="submit"
          className="w-full btn bg-gradient-to-r from-pink-500 via-fuchsia-600 to-purple-700 btn-primary"
        >
          Create User
        </button>
      </form>
    </div>
  );
};

export default Register;

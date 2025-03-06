import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // Match backend API
  headers: { "Content-Type": "application/json" },
});

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState(""); // Add address state
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      await axios.post("http://localhost:5000/api/auth/register", {
        name,
        email,
        password,
        address, // Include address in the request
      });

      setSuccess("User created successfully!");
      setName("");
      setEmail("");
      setPassword("");
      setAddress(""); // Clear address field
      navigate("/login");
    } catch (error) {
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
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full input input-bordered"
          required
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full input input-bordered"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full input input-bordered"
          required
        />

        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
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

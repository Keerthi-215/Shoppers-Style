import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      navigate("/login"); // ✅ Redirect to homepage if already logged in
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage(""); // Reset message on new login attempt

    try {
      const { data } = await axios.post(
        "https://shoppers-bsxp.onrender.com/api/auth/login",
        { email, password }
      );

      const { token, user } = data;
      console.log(token, user);

      if (token && user) {
        // ✅ Store token and user details in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("userId", user._id);

        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

        setUser(user); // Update state
        setMessage("Login successful!");
        navigate("/"); // ✅ Redirect to homepage after login
      } else {
        setMessage("Invalid login response, please try again.");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  const handleLogout = () => {
    // Clear user authentication data only
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    delete axios.defaults.headers.common["Authorization"];

    // Note: Not clearing order summary data from localStorage
    // Any order-related data will be preserved

    setMessage("Logout successful!");
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        {user ? (
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-semibold">
              Welcome, {user.name}!
            </h2>

            {/* Order List Button */}
            <button
              onClick={() => navigate("/order-history")}
              className="w-full mb-3 btn bg-gradient-to-r from-green-500 via-teal-600 to-blue-700 hover:bg-blue-800"
            >
              View Order List
            </button>

            {/* Update Profile Button */}
            <button
              onClick={() => navigate("/profile")}
              className="w-full mb-3 btn bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-blue-800"
            >
              Update Profile
            </button>

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="w-full btn bg-gradient-to-r from-pink-500 via-fuchsia-600 to-purple-700 hover:bg-[#9333EA]"
            >
              Logout
            </button>

            {message && (
              <div className="mt-4 shadow-lg alert alert-success">
                {message}
              </div>
            )}
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-6">
            <h2 className="text-2xl font-semibold text-center">Login</h2>

            {message && (
              <div className="shadow-lg alert alert-error">{message}</div>
            )}

            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full input input-bordered"
                required
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full input input-bordered"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full btn text-white bg-gradient-to-r from-pink-500 via-fuchsia-600 to-purple-700 hover:bg-[#9333EA]"
            >
              Login
            </button>

            <div className="mt-4 text-center">
              <span className="text-sm text-gray-500">
                Do not have an account?
              </span>
              <button
                onClick={() => navigate("/register")}
                className="ml-2 text-blue-600 hover:underline"
              >
                Register
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Login;

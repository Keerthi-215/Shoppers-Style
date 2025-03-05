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
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );
      setUser(response.data.user);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setMessage("Login successful!");
      navigate("/posts"); // Redirect to posts after login
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setMessage("Logout successful!");
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        {user ? (
          <div className="text-center">
            <h2 className="mb-4 text-2xl font-semibold">
              Welcome, {user.name}!
            </h2>
            <button onClick={handleLogout} className="w-full btn btn-primary">
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
                placeholder="Email"
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
              className="w-full btn text-white bg-[#C084FC] hover:bg-[#9333EA]"
            >
              Login
            </button>

            <div className="mt-4 text-center">
              <span className="text-sm text-gray-500">
                Do not have an account?
              </span>
              <button
                onClick={() => navigate("/register")}
                className="ml-2 text-blue-500 hover:underline"
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

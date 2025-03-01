import { useState, useEffect } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AdminPanel from "./pages/AdminPanel";
import Login from "./pages/Login";
import Register from "./pages/Register"; // Import the Register component
import CreateProduct from "./pages/CreateProduct";

// Set up a global axios instance for API calls to the backend on port 5000
const api = axios.create({
  baseURL: "http://localhost:5000", // Backend API server
  headers: {
    "Content-Type": "application/json",
  },
});

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/login" element={<Login />} /> {/* Add Login route */}
        <Route path="/register" element={<Register />} />
        <Route path="/create-product" element={<CreateProduct api={api} />} />
        {/* Add Register route */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

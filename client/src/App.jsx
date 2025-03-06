import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./components/CartContext";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AdminPanel from "./pages/AdminPanel";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateProduct from "./pages/CreateProduct";
import Collections from "./pages/Collections";
import ProductDetails from "./pages/ProductDetails";
import Wishlist from "./pages/Wishlist";
import Reviews from "./pages/Reviews";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Shipment from "./pages/Shipment";
import Payment from "./pages/Payment";
import Order from "./pages/Order";
import OrderConfirmation from "./pages/OrderConfirmation";
import About from "./pages/About";
import Contact from "./pages/Contact"; // Correct import for Contact component
import ViewProducts from "./pages/ViewProduct";
import ProfilePage from "./pages/ProfilePage";

// Set up a global axios instance for API calls to the backend on port 5000
const api = axios.create({
  baseURL: "http://localhost:5000",
  headers: { "Content-Type": "application/json" },
});

function App() {
  return (
    <CartProvider>
      {/* Wrap your app with CartProvider */}
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact api={api} />} />
          <Route path="/view-product" element={<ViewProducts api={api} />} />
          <Route path="/create-product" element={<CreateProduct api={api} />} />
          <Route path="/profile" element={<ProfilePage api={api} />} />
          <Route path="/collections" element={<Collections api={api} />} />
          <Route path="/product/:id" element={<ProductDetails api={api} />} />
          <Route path="/wishlist" element={<Wishlist api={api} />} />
          <Route path="/reviews" element={<Reviews api={api} />} />
          <Route path="/cart" element={<Cart api={api} />} />
          <Route path="/checkout" element={<Checkout api={api} />} />
          <Route path="/shipment" element={<Shipment />} />
          <Route path="/payment" element={<Payment api={api} />} />
          <Route path="/order" element={<Order api={api} />} />
          <Route path="/confirmation" element={<OrderConfirmation />} />
        </Routes>
        <Footer />
      </Router>
    </CartProvider>
  );
}

export default App;

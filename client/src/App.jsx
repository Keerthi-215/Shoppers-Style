import { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./components/CartContext";
import { WishlistProvider } from "./components/WishlistContext";
import { ReviewProvider } from "./components/ReviewContext";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AdminPanel from "./pages/AdminPanel";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CreateProduct from "./pages/CreateProduct";
import Collections from "./pages/Collections";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Shipment from "./pages/Shipment";
import Payment from "./pages/Payment";
import OrderHistory from "./pages/OrderHistory";
//import fetchOrdersByUserId from "./utils/fetchOrdersByUserId";
import OrderConfirmation from "./pages/OrderConfirmation";
import About from "./pages/About";
import Contact from "./pages/Contact";
import ViewProducts from "./pages/ViewProduct";
import ProfilePage from "./pages/ProfilePage";
import OrderList from "./components/OrderList";
import Wishlist from "./pages/Wishlist";
import Reviews from "./pages/Reviews";
import FAQ from "./pages/FAQ"; // Added FAQ import

// Set up a global axios instance for API calls
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

function App() {
  return (
    <ReviewProvider>
      <CartProvider>
        <WishlistProvider>
          <Router>
            <Header />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact api={api} />} />
              <Route path="/collections" element={<Collections api={api} />} />
              <Route
                path="/product/:id"
                element={<ProductDetails api={api} />}
              />
              <Route path="/wishlist" element={<Wishlist api={api} />} />
              <Route path="/order-list" element={<OrderList api={api} />} />
              <Route
                path="/reviews/:productId"
                element={<Reviews api={api} />}
              />
              <Route path="/faq" element={<FAQ />} /> {/* Added FAQ route */}
              {/* Authentication Routes */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<ProfilePage api={api} />} />
              {/* Admin Routes */}
              <Route path="/admin" element={<AdminPanel />} />
              <Route
                path="/create-product"
                element={<CreateProduct api={api} />}
              />
              <Route
                path="/view-product"
                element={<ViewProducts api={api} />}
              />
              {/* Shopping & Order Routes */}
              <Route path="/cart" element={<Cart api={api} />} />
              <Route path="/checkout" element={<Checkout api={api} />} />
              <Route path="/shipment" element={<Shipment />} />
              <Route path="/payment" element={<Payment api={api} />} />
              <Route
                path="/order-history"
                element={<OrderHistory api={api} />}
              />
              <Route
                path="/order-confirmation"
                element={<OrderConfirmation api={api} />}
              />
            </Routes>
            <Footer />
          </Router>
        </WishlistProvider>
      </CartProvider>
    </ReviewProvider>
  );
}

export default App;

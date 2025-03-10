import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Collections() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/products`);
      if (response.data && Array.isArray(response.data.data)) {
        setProducts(response.data.data);
      } else {
        setError("Unexpected response format");
      }
    } catch (err) {
      setError("Failed to load products");
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#F3E8FF] p-8">
      <h3 className="text-4xl font-bold text-purple-700 text-center mb-8">
        ✨ Our Collections ✨
      </h3>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array(8)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="skeleton h-64 w-full rounded-lg"
              ></div>
            ))}
        </div>
      )}

      {error && <p className="text-center text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {Array.isArray(products) &&
          products.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="card bg-white shadow-lg border border-gray-200 rounded-xl overflow-hidden transition-transform duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <figure className="relative w-full h-48 bg-gray-100">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-auto h-full object-cover rounded-t-xl"
                />
              </figure>
              <div className="p-4">
                <h3 className="text-gray-900 font-semibold text-m line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm font-medium mt-1">
                  ${product.price}
                </p>
              </div>
            </Link>
          ))}
      </div>

      {showScroll && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 bg-purple-700 text-white p-3 rounded-full shadow-lg hover:bg-purple-800 transition"
        >
          ↑
        </button>
      )}
    </div>
  );
}

export default Collections;

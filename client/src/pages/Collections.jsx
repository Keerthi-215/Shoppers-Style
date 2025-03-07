import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Collections() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
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

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#F3E8FF] p-8">
      <h1 className="text-4xl font-bold text-purple-700 text-center mb-8">
        ✨ Our Collections ✨
      </h1>

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
              className="card bg-white shadow-xl border border-purple-300 rounded-lg transition-transform duration-300 transform hover:scale-105 hover:shadow-2xl"
            >
              <figure className="bg-purple-100 p-4 rounded-t-lg">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-48 object-contain rounded-md"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-purple-800">{product.name}</h2>
                <p className="text-purple-600 text-lg font-medium">
                  ${product.price}
                </p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}

export default Collections;

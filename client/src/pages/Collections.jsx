import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function Collections() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filter states
  const [categoryFilter, setCategoryFilter] = useState("");
  const [subCategoryFilter, setSubCategoryFilter] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/products`);
        if (response.data && Array.isArray(response.data.data)) {
          setProducts(response.data.data);
          setFilteredProducts(response.data.data);
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

  // Function to filter products
  useEffect(() => {
    if (products.length === 0) return;
    let filtered = [...products];

    if (categoryFilter) {
      filtered = filtered.filter(
        (product) =>
          product.category?.toLowerCase() === categoryFilter.toLowerCase()
      );
    }

    if (subCategoryFilter) {
      filtered = filtered.filter(
        (product) =>
          product.subcategory?.toLowerCase() === subCategoryFilter.toLowerCase()
      );
    }

    if (priceFilter === "lowToHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (priceFilter === "highToLow") {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(filtered);
  }, [categoryFilter, subCategoryFilter, priceFilter, products]);

  return (
    <div className="max-screen bg-[#F9F5FF] min-h-screen">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold text-purple-900 text-center mb-8">
          Collections
        </h1>

        {loading && (
          <p className="text-center text-gray-500 text-lg">Loading...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Filters */}
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-purple-800 mb-4">
            Filters
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Category Filter */}
            <div>
              <label className="block font-semibold mb-2">Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="">All</option>
                <option value="Women">Women</option>
                <option value="Men">Men</option>
                <option value="Kids">Kids</option>
              </select>
            </div>

            {/* Sub-category Filter */}
            <div>
              <label className="block font-semibold mb-2">Sub-Category</label>
              <select
                value={subCategoryFilter}
                onChange={(e) => setSubCategoryFilter(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="">All</option>
                <option value="Casual Wear">Casual Wear</option>
                <option value="Luxury">Luxury</option>
                <option value="Indian wear">Indian wear</option>
                <option value="Western">Western</option>
              </select>
            </div>

            {/* Price Filter */}
            <div>
              <label className="block font-semibold mb-2">Price</label>
              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="select select-bordered w-full"
              >
                <option value="">All</option>
                <option value="lowToHigh">Price: Low to High</option>
                <option value="highToLow">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="card bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-transform transform hover:scale-105"
              >
                <Link to={`/product/${product._id}`}>
                  <figure className="relative h-96 w-full overflow-hidden rounded-t-lg">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </figure>
                  <div className="card-body p-4 ">
                    <h2 className="card-title text-lg font-semibold text-gray-800 truncate">
                      {product.name}
                    </h2>
                    <p className="text-purple-600 font-medium text-lg">
                      ${product.price}
                    </p>
                    <p className="text-sm text-gray-500">
                      {product.subcategory}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 text-lg">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
}

export default Collections;

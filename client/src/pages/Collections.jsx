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
          setFilteredProducts(response.data.data); // Initially, show all products
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
    // Apply category filter
    if (categoryFilter) {
      filtered = filtered.filter(
        (product) =>
          product.category?.toLowerCase() === categoryFilter.toLowerCase()
      );
    }
    // Apply sub-category filter
    if (subCategoryFilter) {
      filtered = filtered.filter(
        (product) =>
          product.subcategory?.toLowerCase() === subCategoryFilter.toLowerCase()
      );
    }
    // Apply price filter
    if (priceFilter === "lowToHigh") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (priceFilter === "highToLow") {
      filtered.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(filtered);
  }, [categoryFilter, subCategoryFilter, priceFilter, products]);
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Collections</h1>
      {loading && <p className="text-center text-gray-500">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      {/* Filters */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-4">Filters</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Category Filter */}
          <div>
            <label className="block font-semibold mb-2">Category</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full p-2 border rounded"
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
              className="w-full p-2 border rounded"
            >
              <option value="">All</option>
              <option value="Casual Wear">Casual Wear</option>
              <option value="Luxury">Luxury</option>
              <option value="Western">Western</option>
              <option value="Indian wear">Indian wear</option>
            </select>
          </div>
          {/* Price Filter */}
          <div>
            <label className="block font-semibold mb-2">Price</label>
            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="w-full p-2 border rounded"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product._id} className="border p-4 rounded-lg shadow">
              <Link to={`/product/${product._id}`}>
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-md"
                />
                <h2 className="mt-2 font-semibold">{product.name}</h2>
                <p className="text-gray-600">${product.price}</p>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No products found.</p>
      )}
    </div>
  );
}
export default Collections;

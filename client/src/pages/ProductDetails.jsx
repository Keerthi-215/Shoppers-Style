import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../components/CartContext"; // Import the useCart hook
import ToastNotification from "../components/ToastNotification"; // Import ToastNotification component

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");

  const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"]; // Predefined sizes

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/products/${id}`);
        setProduct(response.data.data);
      } catch (err) {
        setError("Failed to load product details");
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart!");
      return;
    }

    if (product) {
      addToCart({ ...product, selectedSize });
      setShowToast(true);
    }
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert("Please select a size before proceeding!");
      return;
    }

    const orderDetails = {
      productId: product._id,
      name: product.name,
      price: product.price,
      size: selectedSize,
    };

    localStorage.setItem("orderDetails", JSON.stringify(orderDetails)); // Store order details
    navigate("/shipment"); // Redirect to Payment Page
  };

  if (loading)
    return (
      <p className="text-center text-gray-500">Loading product details...</p>
    );
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Product Image */}
        <div className="flex-1">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-90 object-cover rounded-md shadow-md"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-purple-700">{product.name}</h1>
          <p className="text-purple-600 mt-2 text-lg font-medium">
            ${product.price}
          </p>

          <div className="mt-4">
            <h3 className="font-semibold">Product Description:</h3>
            <p>{product.description}</p>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold">Category:</h3>
            <p>{product.category}</p>
          </div>

          {/* Size Selection */}
          <div className="mt-4">
            <h3 className="font-semibold">Select Size:</h3>
            <select
              className="mt-2 block w-full p-2 border border-purple-300 rounded-md focus:ring focus:ring-purple-200"
              value={selectedSize}
              onChange={(e) => setSelectedSize(e.target.value)}
            >
              <option value="">Choose a size</option>
              {availableSizes.map((size, index) => (
                <option key={index} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold">Stock:</h3>
            <p>{product.stock} items available</p>
          </div>

          {/* Buttons: Add to Cart & Buy Now */}
          <div className="mt-6 flex gap-4">
            <button
              onClick={handleAddToCart}
              className="w-40 bg-purple-600 hover:bg-purple-800 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300"
            >
              Add to Cart
            </button>

            <button
              onClick={handleBuyNow}
              className="w-40 bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300"
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Show Toast Notification when a product is added */}
      {showToast && (
        <ToastNotification
          message="Your product has been added to the cart!"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}

export default ProductDetails;

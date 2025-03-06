import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../components/CartContext"; // Import the useCart hook
import ToastNotification from "../components/ToastNotification"; // Import ToastNotification component

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ProductDetails() {
  const { id } = useParams(); // Get product id from URL
  const { addToCart } = useCart(); // Use addToCart from CartContext
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false); // State to control toast visibility

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
    if (product) {
      addToCart(product); // Add the product to the cart
      setShowToast(true); // Show the toast when product is added
    }
  };

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-96 object-cover rounded-md"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600 mt-2">${product.price}</p>

          <div className="mt-4">
            <h3 className="font-semibold">Product Description:</h3>
            <p>{product.description}</p>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold">Category:</h3>
            <p>{product.category}</p>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold">Sub Category:</h3>
            <p>{product.subCategory}</p>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold">Size:</h3>
            <p>{product.size}</p>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold">Stock:</h3>
            <p>{product.stock} items available</p>
          </div>

          <div className="mt-6">
            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart} // Call addToCart when button is clicked
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Show Toast Notification when a product is added */}
      {showToast && (
        <ToastNotification
          message="Your product has been added to the cart!"
          onClose={() => setShowToast(false)} // Close the toast after 3 seconds
        />
      )}
    </div>
  );
}

export default ProductDetails;

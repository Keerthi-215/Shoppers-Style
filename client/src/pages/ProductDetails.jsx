import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../components/CartContext";
import { useWishlist } from "../components/WishlistContext";
import ToastNotification from "../components/ToastNotification";
import Reviews from "../pages/Reviews";
import { FaHeart } from "react-icons/fa"; // Importing heart icon from react-icons

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { wishlist, addToWishlist } = useWishlist();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCartToast, setShowCartToast] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");

  const adultSizes = ["S", "M", "L", "XL", "XXL"];
  const kidsSizes = [
    "0-2 years",
    "2-4 years",
    "4-6 years",
    "6-8 years",
    "8-10 years",
    "10-12 years",
  ];

  useEffect(() => {
    if (!id) {
      setError("Product ID is missing or invalid");
      setLoading(false);
      return;
    }
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/products/${id}`);
        setProduct(response.data.data);
      } catch (err) {
        setError("Failed to load product details");
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      const productWithSize = selectedSize
        ? { ...product, selectedSize }
        : product;
      addToCart(productWithSize);
      setShowCartToast(true);
    }
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const isKidsProduct = () => {
    if (!product) return false;
    const productName = product.name?.toLowerCase() || "";
    const productDescription = product.description?.toLowerCase() || "";
    const productCategory = product.category?.toLowerCase() || "";

    return (
      productName.includes("kid") ||
      productName.includes("child") ||
      productName.includes("baby") ||
      productDescription.includes("kid") ||
      productDescription.includes("child") ||
      productDescription.includes("baby") ||
      productCategory.includes("kid") ||
      productCategory.includes("child") ||
      productCategory.includes("baby")
    );
  };

  const getSizes = () => {
    return isKidsProduct() ? kidsSizes : adultSizes;
  };

  if (loading)
    return <p className="text-center text-lg">Loading product details...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="flex-1">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg shadow-md"
          />
        </div>

        {/* Product Info */}
        <div className="flex-1 space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600 text-lg font-semibold">
            ${product.price}
          </p>

          {/* Description */}
          <div>
            <h3 className="font-semibold text-lg">Product Description:</h3>
            <p className="text-gray-700">{product.description}</p>
          </div>

          {/* Size Selection */}
          <div>
            <h3 className="font-semibold text-lg">Select Size:</h3>
            <div className="flex flex-wrap gap-3 mt-2">
              {getSizes().map((size) => (
                <label
                  key={size}
                  className={`px-4 py-2 border rounded-md cursor-pointer text-sm ${
                    selectedSize === size
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}
                >
                  <input
                    type="radio"
                    name="size"
                    checked={selectedSize === size}
                    onChange={() => handleSizeChange(size)}
                    className="hidden"
                  />
                  {size}
                </label>
              ))}
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-6">
            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2 px-4 rounded-md shadow-md transition-all"
            >
              Add to Cart
            </button>

            {/* Wishlist Heart Icon */}
            <button className="text-red-500 text-2xl hover:scale-110 transition-all">
              <FaHeart />
            </button>
          </div>
        </div>
      </div>

      {/* Show Toast for Cart */}
      {showCartToast && (
        <ToastNotification
          message="Your product has been added to the cart!"
          onClose={() => setShowCartToast(false)}
        />
      )}

      {/* Reviews Section with Stars */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Reviews</h3>
        <Reviews productId={id} showStarsOnly={true} />
      </div>
    </div>
  );
}

export default ProductDetails;

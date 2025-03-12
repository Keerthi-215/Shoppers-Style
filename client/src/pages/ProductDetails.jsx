import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useCart } from "../components/CartContext";
import { useWishlist } from "../components/WishlistContext";
import ToastNotification from "../components/ToastNotification";
import Reviews from "../pages/Reviews";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { wishlist, addToWishlist } = useWishlist();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showCartToast, setShowCartToast] = useState(false);
  const [showWishlistToast, setShowWishlistToast] = useState(false);
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

  const handleAddToWishlist = () => {
    if (product) {
      const productWithSize = selectedSize
        ? { ...product, selectedSize }
        : product;
      addToWishlist(productWithSize);
      setShowWishlistToast(true);
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

  const isProductInWishlist = wishlist.some(
    (item) => item._id === product?._id
  );

  if (loading) return <p className="text-center">Loading product details...</p>;
  if (error) return <p className="text-red-500 text-center">{error}</p>;

  return (
    <div className="max-screen bg-[#F9F5FF] min-h-screen">
      <div className="container mx-auto p-10">
        <div className="flex flex-col md:flex-row gap-6 bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="flex-1">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-85 object-cover rounded-md shadow-lg"
            />
          </div>
          <div className="flex-1 p-6">
            <h1 className="text-3xl font-bold text-purple-700">
              {product.name}
            </h1>
            <p className="text-gray-600 mt-2 text-lg font-semibold">
              ${product.price}
            </p>
            <div className="mt-4">
              <h3 className="font-semibold text-lg">Product Description:</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>

            {/* Size Selection */}
            <div className="mt-4">
              <h3 className="font-semibold text-lg">Select Size:</h3>
              <div className="flex flex-wrap gap-2 mt-2">
                {getSizes().map((size) => (
                  <label
                    key={size}
                    className={`flex items-center cursor-pointer px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-100 transition ${
                      selectedSize === size ? "bg-purple-100" : ""
                    }`} // Add background highlight when selected
                  >
                    <input
                      type="radio"
                      name="size"
                      value={size}
                      checked={selectedSize === size}
                      onChange={() => handleSizeChange(size)}
                      className="mr-1 hidden" // Keep input hidden
                    />
                    <span className="text-sm">{size}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex gap-4">
              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-3 text-sm font-semibold rounded-md shadow-md transition"
              >
                Add to Cart
              </button>

              {/* Add to Wishlist Button */}
              <button
                onClick={handleAddToWishlist}
                className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-3 text-sm font-semibold rounded-md shadow-md transition"
                disabled={isProductInWishlist}
              >
                {isProductInWishlist ? "Added to Wishlist" : "Add to Wishlist"}
              </button>
            </div>
          </div>
        </div>

        {/* Toast Notifications */}
        {showCartToast && (
          <ToastNotification
            message="Your product has been added to the cart!"
            onClose={() => setShowCartToast(false)}
          />
        )}
        {showWishlistToast && (
          <ToastNotification
            message="Your product has been added to the wishlist!"
            onClose={() => setShowWishlistToast(false)}
          />
        )}

        {/* Reviews Section - Only Stars, No Dropdowns */}
        <div className="mt-8">
          <Reviews productId={id} showStarsOnly={true} />
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;

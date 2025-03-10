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
  const [showCartToast, setShowCartToast] = useState(false); // State for Cart Toast
  const [showWishlistToast, setShowWishlistToast] = useState(false); // State for Wishlist Toast
  const [selectedSize, setSelectedSize] = useState(""); // State for size selection

  // Available sizes based on product category
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
      // Add product with selected size if available
      const productWithSize = selectedSize
        ? { ...product, selectedSize }
        : product;
      addToCart(productWithSize);
      setShowCartToast(true); // Show Cart Toast
    }
  };

  const handleAddToWishlist = () => {
    if (product) {
      // Add product with selected size if available
      const productWithSize = selectedSize
        ? { ...product, selectedSize }
        : product;
      addToWishlist(productWithSize);
      setShowWishlistToast(true); // Show Wishlist Toast
    }
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  // Determine if product is for kids based on product category or tags
  const isKidsProduct = () => {
    if (!product) return false;

    // Check if product has category or tags that indicate it's for kids
    // This logic can be adjusted based on how your products are categorized
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

  // Get the appropriate sizes array based on product type
  const getSizes = () => {
    return isKidsProduct() ? kidsSizes : adultSizes;
  };

  const isProductInWishlist = wishlist.some(
    (item) => item._id === product?._id
  );

  if (loading) return <p>Loading product details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-85 object-cover rounded-md"
          />
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-600 mt-2">${product.price}</p>
          <div className="mt-4">
            <h3 className="font-semibold">Product Description:</h3>
            <p>{product.description}</p>
          </div>
          {/* <div className="mt-4">
            <h3 className="font-semibold">Stock:</h3>
            <p>{product.stock} items available</p>
          </div> */}

          {/* Size Selection */}
          <div className="mt-4">
            <h3 className="font-semibold">Select Size:</h3>
            <div className="flex flex-wrap gap-2 mt-2">
              {getSizes().map((size) => (
                <label key={size} className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="size"
                    checked={selectedSize === size}
                    onChange={() => handleSizeChange(size)}
                    className="mr-1"
                  />
                  <span className="text-sm">{size}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={handleAddToCart}
              className="bg-blue-500 text-white py-2 px-4 rounded-md"
            >
              Add to Cart
            </button>
          </div>
          <div className="mt-4">
            <button
              onClick={handleAddToWishlist}
              className={`${
                isProductInWishlist ? "bg-red-500" : "bg-yellow-500"
              } text-white py-2 px-4 rounded-md`}
              disabled={isProductInWishlist}
            >
              {isProductInWishlist ? "Added to Wishlist" : "Add to Wishlist"}
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
      {/* Show Toast for Wishlist */}
      {showWishlistToast && (
        <ToastNotification
          message="Your product has been added to the wishlist!"
          onClose={() => setShowWishlistToast(false)}
        />
      )}
      Reviews Section
      <div className="mt-8">
        <Reviews productId={id} />
      </div>
    </div>
  );
}
export default ProductDetails;

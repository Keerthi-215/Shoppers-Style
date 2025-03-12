import { createContext, useContext, useState } from "react";
import ToastNotification from "../components/ToastNotification";
// Create a Wishlist Context
const WishlistContext = createContext();
// Wishlist Provider to wrap around the app or components that need access to the wishlist
export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);
  // Function to add a product to the wishlist
  const addToWishlist = (product) => {
    if (!product) return; // Prevent adding undefined or null products
    // Check if the product already exists in the wishlist by comparing _id
    const isProductInWishlist = wishlist.some(
      (item) => item._id === product._id
    );
    if (!isProductInWishlist) {
      // Add the product if it does not exist in the wishlist
      setWishlist((prevWishlist) => [...prevWishlist, product]);
    } else {
      // Product already in wishlist
      alert("This product is already in your wishlist!");
    }
  };
  // Function to remove a product from the wishlist by _id
  const removeFromWishlist = (productId) => {
    setWishlist((prevWishlist) =>
      prevWishlist.filter((item) => item._id !== productId)
    );
  };
  return (
    <WishlistContext.Provider
      value={{ wishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
// Custom hook to access Wishlist context
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

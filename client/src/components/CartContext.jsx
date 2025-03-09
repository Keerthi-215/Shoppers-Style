import React, { createContext, useContext, useState } from "react";
// Create a context for the cart
export const CartContext = createContext();
// A custom hook to access the cart context
export const useCart = () => {
  return useContext(CartContext);
};
// A provider component to wrap the app and provide cart data
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  // Add product to the cart
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item._id === product._id);
      if (existingItem) {
        // If the item already exists, increase the quantity
        return prevItems.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // If it's a new item, add it with quantity 1
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };
  // Remove product from the cart
  const removeFromCart = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
  };
  // Clear the cart
  const clearCart = () => {
    setCartItems([]);
  };
  // Increase the quantity of an item
  const increaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };
  // Decrease the quantity of an item
  const decreaseQuantity = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };
  // Calculate total number of items in the cart
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );
  // Calculate the total price of the cart items
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        increaseQuantity,
        decreaseQuantity,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
export default CartProvider;

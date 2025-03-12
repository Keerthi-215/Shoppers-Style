import Cart from "../models/Cart.js";

const getCartItems = async (req, res) => {
  try {
    const cartItems = await Cart.find({ userId: req.user.id }).populate(
      "productId"
    );
    res.json(cartItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addToCart = async (req, res) => {
  try {
    const cartItem = await Cart.create({ ...req.body, userId: req.user.id });
    res.status(201).json(cartItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { getCartItems, addToCart };

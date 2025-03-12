import Wishlist from "../models/Wishlist.js";

const getWishlistItems = async (req, res) => {
  try {
    const wishlistItems = await Wishlist.find({ userId: req.user.id }).populate(
      "productId"
    );
    res.json(wishlistItems);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const wishlistItem = await Wishlist.create({
      ...req.body,
      userId: req.user.id,
    });
    res.status(201).json(wishlistItem);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { getWishlistItems, addToWishlist };

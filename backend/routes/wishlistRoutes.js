import express from "express";
import {
  getWishlistItems,
  addToWishlist,
} from "../controllers/wishlistController.js";

const router = express.Router();

router.get("/", getWishlistItems);
router.post("/", addToWishlist);

export default router;

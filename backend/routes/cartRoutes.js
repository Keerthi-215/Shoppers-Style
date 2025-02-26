import express from "express";
import { getCartItems, addToCart } from "../controllers/cartController.js";

const router = express.Router();

router.get("/", getCartItems);
router.post("/", addToCart);

export default router;

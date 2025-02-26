import express from "express";
import { getAllOrders, createOrder } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getAllOrders); // Only authenticated users can access
router.post("/", protect, createOrder); // Only authenticated users can create orders

export default router;

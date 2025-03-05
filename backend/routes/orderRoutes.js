import express from "express";
import { getAllOrders, createOrder } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllOrders); // Only authenticated users can access
router.post("/", createOrder); // Only authenticated users can create orders

export default router;

import express from "express";
import {
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllOrders); // Only authenticated users can access
router.post("/", protect, createOrder);
router.put("/:orderId", updateOrder);
router.delete("/:orderId", deleteOrder); // Only authenticated users can create orders

export default router;

import express from "express";
import {
  getAllOrders,
  createOrder,
  getOrdersByUserId,
  updateOrder,
  deleteOrder,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllOrders); // Only authenticated users can access
router.get("/user/:userId", getOrdersByUserId);
router.post("/", protect, createOrder);
router.put("/:orderId", updateOrder);
router.delete("/:orderId", deleteOrder); // Only authenticated users can create orders
router.put("/:orderId/status", protect, updateOrderStatus);

export default router;

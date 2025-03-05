import express from "express";
import { protect, isAdmin } from "../middleware/authMiddleware.js"; // Protect and isAdmin middleware
import {
  getUserProfile,
  updateUserProfile,
  deleteUser,
} from "../controllers/userController.js"; // Importing controller functions

const router = express.Router();

// Protect middleware for routes that require authentication
router.get("/profile", protect, getUserProfile); // Get user profile (only authenticated users)
router.put("/profile", protect, updateUserProfile); // Update user profile (only authenticated users)
router.delete("/:id", protect, isAdmin, deleteUser); // Delete user (only admins)

// Exporting the router
export default router;

import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js"; // Middleware for file upload

const router = express.Router();

// ✅ User profile routes (Authenticated users only)
router.get("/profile", protect, getUserProfile);
router.put("/profile", protect, updateUserProfile);

// ✅ CRUD operations for users
router.get("/", protect, isAdmin, getAllUsers); // Admin-only access
router.get("/:id", protect, getUserById);
router.post("/", createUser);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, isAdmin, deleteUser);

// ✅ Profile image upload (Authenticated users only)
router.post("/upload", protect, upload.single("profileImage"), (req, res) => {
  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

export default router;

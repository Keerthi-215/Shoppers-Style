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
// ✅ Get all users (Admin-only)
router.get("/", protect, getAllUsers);
// router.get("/", protect, getAllUsers);

// ✅ Get a single user by ID (Authenticated users only)
router.get("/:id", protect, getUserById);

// ✅ Create a new user
router.post("/", protect, createUser);
// router.post("/", protect, createUser);

// ✅ Update a user by ID (Admin or the same user)
router.put("/:id", protect, updateUser);

// ✅ Delete a user by ID (Admin-only)
router.delete("/:id", protect, deleteUser);

// ✅ Upload profile image (Authenticated users only)
router.post("/upload", upload.single("profileImage"), (req, res) => {
  res.json({ imageUrl: `/uploads/${req.file.filename}` });
});

export default router;

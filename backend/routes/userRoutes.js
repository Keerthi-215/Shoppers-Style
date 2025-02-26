import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js"; // Import file upload middleware

const router = express.Router();

// ✅ Get all users (Admin-only)
router.get("/", protect, getAllUsers);
// router.get("/", protect, getAllUsers);

// ✅ Get a single user by ID (Authenticated users only)
router.get("/:id", protect, getUserById);

// ✅ Create a new user
router.post("/", createUser);
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

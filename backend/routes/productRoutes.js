import express from "express";
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import upload from "../middleware/uploadMiddleware.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";
// const upload = multer({ storage: multer.memoryStorage() });
const router = express.Router();
router.get("/", getAllProducts); // Get all products
router.get("/:id", getProductById); // Get a single product by ID
router.post("/", upload.single("image"), createProduct); // Create a new product
// router.post("/", protect, upload.single("image"), createProduct); // Create a new product
router.put("/:id", upload.single("image"), updateProduct); // Update a product
router.delete("/:id", deleteProduct); // Delete a product
export default router;

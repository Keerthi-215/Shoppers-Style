import Product from "../models/Product.js";
import { bucket } from "../config/firebase.js";
import ErrorResponse from "../utils/errorResponse.js";

/**
 * @desc Get all products
 * @route GET /api/products
 * @access Public
 */
const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    next(new ErrorResponse(error.message, 500));
  }
};

/**
 * @desc Get a product by ID
 * @route GET /api/products/:id
 * @access Public
 */
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorResponse("Product not found", 404));
    }
    res.status(200).json({ success: true, data: product });
  } catch (error) {
    next(new ErrorResponse("Invalid Product ID", 400));
  }
};

/**
 * @desc Create a new product
 * @route POST /api/products
 * @access Private (Admin Only)
 */
const createProduct = async (req, res, next) => {
  try {
    const { name, category, price, stock, description, size, subcategory } =
      req.body;

    const image = req.file;
    if (!name || !category || !price || !stock) {
      return next(new ErrorResponse("Please provide all required fields", 400));
    }

    const newProduct = new Product({
      name,
      category,
      price,
      stock,
      description,
      size,
      subcategory,
    });

    if (image) {
      try {
        const blob = bucket.file(
          `images/products/${category}/${Date.now()}_${image.originalname}`
        );
        const blobStream = blob.createWriteStream({
          metadata: { contentType: image.mimetype },
        });

        await new Promise((resolve, reject) => {
          blobStream.on("error", (err) =>
            reject(new CustomError("Image upload failed", 500))
          );
          blobStream.on("finish", resolve);
          blobStream.end(image.buffer);
        });

        // Get signed URL after upload
        const signedUrl = await blob.getSignedUrl({
          action: "read",
          expires: "03-01-2500",
        });
        console.log(signedUrl[0]);

        newProduct.imageUrl = signedUrl[0];
      } catch (error) {
        next(new CustomError("Image upload failed", 500));
      }
    }

    const createdProduct = await newProduct.save();

    // console.log(name, category, price, stock, description);

    res.status(201).json({
      success: true,
      message: "Product created",
      data: createdProduct,
    });
  } catch (error) {
    next(new ErrorResponse(error.message, 500));
  }
};

/**
 * @desc Update a product by ID
 * @route PUT /api/products/:id
 * @access Private (Admin Only)
 */
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorResponse("Product not found", 404));
    }

    // Update fields dynamically
    Object.keys(req.body).forEach((key) => {
      product[key] = req.body[key];
    });

    const updatedProduct = await product.save();
    res.status(200).json({
      success: true,
      message: "Product updated",
      data: updatedProduct,
    });
  } catch (error) {
    next(new ErrorResponse(error.message, 500));
  }
};

/**
 * @desc Delete a product by ID
 * @route DELETE /api/products/:id
 * @access Private (Admin Only)
 */
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return next(new ErrorResponse("Product not found", 404));
    }

    await product.deleteOne();
    res.status(200).json({ success: true, message: "Product deleted" });
  } catch (error) {
    next(new ErrorResponse(error.message, 500));
  }
};

export {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};

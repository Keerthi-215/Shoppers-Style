import User from "../models/User.js";
import ErrorResponse from "../utils/errorResponse.js";

/**
 * Get all users (Admin only)
 */
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password"); // Exclude password field
    res.status(200).json(users);
  } catch (error) {
    next(new ErrorResponse(error.message, 500));
  }
};

/**
 * Get user by ID
 */
const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }
    res.status(200).json(user);
  } catch (error) {
    next(new ErrorResponse("Invalid user ID", 400));
  }
};

/**
 * Create a new user (Admin only)
 */
const createUser = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return next(new ErrorResponse("User already exists", 400));
    }

    // Create a new user
    const user = await User.create({
      name,
      email,
      password,
      role: role || "user", // Default to "user" if not specified
    });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    next(new ErrorResponse(error.message, 500));
  }
};

/**
 * Update user details (Admin or the same user)
 */
const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }

    // Allow user to update their own profile or admin to update any profile
    if (req.user.id !== user.id && !req.user.isAdmin) {
      return next(new ErrorResponse("Unauthorized action", 403));
    }

    // Update fields
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      success: true,
      message: "User updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    next(new ErrorResponse(error.message, 500));
  }
};

/**
 * Delete a user (Admin only)
 */
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new ErrorResponse("User not found", 404));
    }

    await user.deleteOne(); // Use deleteOne() instead of remove()
    res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    next(new ErrorResponse(error.message, 500));
  }
};

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };

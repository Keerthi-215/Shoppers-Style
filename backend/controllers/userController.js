import User from "../models/User.js";
import bcrypt from "bcryptjs"; // Import your User model

// Function to get user profile
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id); // Find user by ID from the request
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user); // Return the user profile as a response
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving user profile", error: error.message });
  }
};

// Function to update user profile
const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id); // Find user by ID from the request
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.name = req.body.name || user.name; // Update user properties
    user.email = req.body.email || user.email;
    user.address = req.body.address || user.address;
    user.mobileNumber = req.body.mobileNumber || user.mobileNumber;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save(); // Save the updated user
    res.json(updatedUser); // Return updated user as response
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user profile", error: error.message });
  }
};

// Function to delete user
const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.remove(); // Remove user from database
    res.json({ message: "User removed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};

// Function to get all users (Admin-only)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving users", error: error.message });
  }
};

// Function to get a single user by ID
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving user", error: error.message });
  }
};

// Function to create a new user
// const createUser = async (req, res) => {
//   try {
//     const { name, email, password, address, mobileNumber } = req.body;
//     const user = new User({ name, email, password, address, mobileNumber });
//     const newUser = await user.save();
//     res.status(201).json(newUser);
//   } catch (error) {
//     res
//       .status(500)
//       .json({ message: "Error creating user", error: error.message });
//   }
// };

const createUser = async (req, res) => {
  try {
    const { name, email, password, address, mobileNumber } = req.body;

    // Convert email to lowercase for consistency
    const lowerCaseEmail = email.toLowerCase();

    // Check if the email is already in use
    const existingUser = await User.findOne({ email: lowerCaseEmail });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      name,
      email: lowerCaseEmail,
      password: hashedPassword,
      address,
      mobileNumber,
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, role: "user" },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    // Respond with user data (excluding password) and token
    res.status(201).json({
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        address: newUser.address,
        mobileNumber: newUser.mobileNumber,
      },
      token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

export default createUser;

// Function to update a user by ID
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user details
    user.name = req.body.name || user.name;
    user.email = req.body.email ? req.body.email.toLowerCase() : user.email;
    user.address = req.body.address || user.address;
    user.mobileNumber = req.body.mobileNumber || user.mobileNumber;

    // Hash new password if provided
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      address: updatedUser.address,
      mobileNumber: updatedUser.mobileNumber,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};

// Exporting all functions
export {
  getUserProfile,
  updateUserProfile,
  deleteUser,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
};

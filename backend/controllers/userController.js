import User from "../models/User.js"; // Import your User model

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
    // Additional user properties to update can be added here

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

// Exporting all functions
export { getUserProfile, updateUserProfile, deleteUser };

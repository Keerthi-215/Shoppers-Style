import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Protect middleware to check for valid token
const protect = async (req, res, next) => {
  let token;
  console.log(req.headers.authorization);
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract the token from the authorization header
      console.log(req.headers.authorization);

      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, invalid token" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next(); // Proceed if the user is an admin
  } else {
    res.status(403).json({ message: "Access denied, admin only" }); // Deny access if not an admin
  }
};

export { protect, isAdmin }; // Ensure both are exported here

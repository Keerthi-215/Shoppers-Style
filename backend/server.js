import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import { errorHandler, notFound } from "./middleware/errorHandler.js";

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();
// if (!5000 || !"http://localhost:5173") {
//   console.error("Please provide PORT and CLIENT_URL");
//   process.exit(1);
// }

// Middleware
app.use(express.json()); // Body parser
app.use(
  cors({
    origin: "https://shoppersstyle.netlify.app",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Enable CORS
app.get("/", (req, res) => {
  res.send("Hello");
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/contact", contactRoutes);

// Global Error Handling
app.use(notFound);
app.use(errorHandler);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// when getting token from login store it in localStorage
// localStorage.setItem("token", token)

// when sending a protected HTTP request
// const token = JSON.parse(localStorage.getItem("token"))

// authorization: token,

// replace cookies system with headers

// {
//     withCredentials: true,
//   }

// headers: {
//     'Content-Type': 'application/json',
//     Authorization: `Bearer ${userInfo.token}`,
//   },

import mongoose from "mongoose";
import Order from "./models/Order.js"; // Adjust the import path if needed

const sampleOrders = [
  {
    _id: new mongoose.Types.ObjectId(),
    userId: new mongoose.Types.ObjectId(),
    totalPrice: 150.99,
    status: "pending",
    products: [
      { productId: new mongoose.Types.ObjectId(), quantity: 2 },
      { productId: new mongoose.Types.ObjectId(), quantity: 1 },
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: new mongoose.Types.ObjectId(),
    totalPrice: 200.5,
    status: "shipped",
    products: [{ productId: new mongoose.Types.ObjectId(), quantity: 3 }],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: new mongoose.Types.ObjectId(),
    totalPrice: 89.99,
    status: "delivered",
    products: [
      { productId: new mongoose.Types.ObjectId(), quantity: 1 },
      { productId: new mongoose.Types.ObjectId(), quantity: 2 },
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: new mongoose.Types.ObjectId(),
    totalPrice: 320.75,
    status: "pending",
    products: [{ productId: new mongoose.Types.ObjectId(), quantity: 5 }],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: new mongoose.Types.ObjectId(),
    totalPrice: 450.0,
    status: "cancelled",
    products: [
      { productId: new mongoose.Types.ObjectId(), quantity: 2 },
      { productId: new mongoose.Types.ObjectId(), quantity: 1 },
      { productId: new mongoose.Types.ObjectId(), quantity: 3 },
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: new mongoose.Types.ObjectId(),
    totalPrice: 175.25,
    status: "shipped",
    products: [{ productId: new mongoose.Types.ObjectId(), quantity: 2 }],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: new mongoose.Types.ObjectId(),
    totalPrice: 99.99,
    status: "pending",
    products: [{ productId: new mongoose.Types.ObjectId(), quantity: 1 }],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: new mongoose.Types.ObjectId(),
    totalPrice: 500.0,
    status: "delivered",
    products: [
      { productId: new mongoose.Types.ObjectId(), quantity: 3 },
      { productId: new mongoose.Types.ObjectId(), quantity: 2 },
    ],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: new mongoose.Types.ObjectId(),
    totalPrice: 299.5,
    status: "shipped",
    products: [{ productId: new mongoose.Types.ObjectId(), quantity: 4 }],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    userId: new mongoose.Types.ObjectId(),
    totalPrice: 120.0,
    status: "pending",
    products: [
      { productId: new mongoose.Types.ObjectId(), quantity: 1 },
      { productId: new mongoose.Types.ObjectId(), quantity: 1 },
    ],
  },
];

const seedOrders = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/ecommerceDB", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Order.insertMany(sampleOrders);
    console.log("Orders seeded successfully!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding orders:", error);
  }
};

seedOrders();

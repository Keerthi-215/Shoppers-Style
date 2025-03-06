import Order from "../models/Order.js";

const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("userId", "name email");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createOrder = async (req, res) => {
  try {
    const { paymentMethod, totalPrice, products } = req.body;

    const order = await Order.create({
      paymentMethod,
      totalPrice,
      products,
      userId: req.user._id, // Associate the order with the logged-in user
    });

    res.status(201).json(order); // Send back the created order as response
  } catch (error) {
    console.error("Order creation failed:", error);
    res.status(400).json({ error: error.message });
  }
};

export { getAllOrders, createOrder };

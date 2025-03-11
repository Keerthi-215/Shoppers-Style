import Order from "../models/Order.js";

const getAllOrders = async (req, res) => {
  try {
    console.log();
    const orders = await Order.find().populate("userId", "name email");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getOrdersByUserId = async (req, res) => {
  try {
    const { userId } = req.params; // Get userId from route parameters
    console.log("🔍 Received request for user ID:", userId); // ✅ Debugging

    const orders = await Order.find({ userId }).populate(
      "userId",
      "name email"
    );

    console.log("📦 Orders found:", orders); // ✅ Debugging

    if (!orders.length) {
      console.warn("⚠️ No orders found for this user");
      return res.status(404).json({ message: "No orders found for this user" });
    }

    res.json(orders);
  } catch (error) {
    console.error("❌ Error fetching orders:", error);
    res.status(500).json({ error: error.message });
  }
};

const createOrder = async (req, res) => {
  try {
    console.log(req.body);
    console.log(req.user);

    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const updateOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    const updates = req.body;
    console.log(req.body);
    console.log(req.user);

    const updateOrder = await Order.findByIdAndUpdate(orderId, updates, {
      new: true,
      runValidators: true,
    }).populate("userId", "name email");
    // const orders = await Order.find({_id:orderId}).populate("userId", "name email");
    // const newOrder= new Order{
    //   name:name,
    //   price:price,
    // }
    // // const order = await Order.create(req.body);
    // await newOrder.save()
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const deleteOrder = async (req, res) => {
  try {
    const { orderId } = req.params;
    console.log(req.body);
    console.log(req.user);
    const deletedPost = await Order.findByIdAndDelete(orderId);

    res.status(201).json({ message: "order is deleted!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

///✅ New Function: Update Order Status
const updateOrderStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!["pending", "shipped", "delivered", "cancelled"].includes(status)) {
      return res.status(400).json({ message: "Invalid status update" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true, runValidators: true }
    ).populate("userId", "name email");

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
export {
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrdersByUserId,
  updateOrderStatus,
};

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

    const updatedPost = await Order.findByIdAndUpdate(orderId, updates, {
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

export { getAllOrders, createOrder, updateOrder, deleteOrder };

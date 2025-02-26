import Stripe from "stripe";
import Payment from "../models/Payment.js";
import Order from "../models/Order.js";
import ErrorResponse from "../utils/errorResponse.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

/**
 * Process a new payment (Supports Stripe & Other Methods)
 */
const processPayment = async (req, res, next) => {
  try {
    const { orderId, paymentMethod, transactionId, amount, stripeToken } =
      req.body;

    // Validate required fields
    if (!orderId || !paymentMethod || !amount) {
      return next(new ErrorResponse("Missing required payment fields", 400));
    }

    // Validate payment method
    const validMethods = ["credit_card", "paypal", "bank_transfer", "stripe"];
    if (!validMethods.includes(paymentMethod)) {
      return next(new ErrorResponse("Invalid payment method", 400));
    }

    // Check if the order exists
    const order = await Order.findById(orderId);
    if (!order) {
      return next(new ErrorResponse("Order not found", 404));
    }

    let paymentData = {
      orderId,
      paymentMethod,
      transactionId: transactionId || null,
      amount,
      status: "pending",
    };

    // Stripe Payment Handling
    if (paymentMethod === "stripe") {
      if (!stripeToken) {
        return next(new ErrorResponse("Stripe token is required", 400));
      }

      const charge = await stripe.charges.create({
        amount: amount * 100, // Stripe requires amount in cents
        currency: "usd",
        source: stripeToken, // Token from frontend
        description: `Payment for order ${orderId}`,
      });

      paymentData.transactionId = charge.id;
      paymentData.status =
        charge.status === "succeeded" ? "completed" : "failed";
    }

    // Save payment record
    const payment = await Payment.create(paymentData);

    // Update order status if payment is successful
    if (payment.status === "completed") {
      await Order.findByIdAndUpdate(orderId, { status: "shipped" });
    }

    res.status(201).json({
      success: true,
      message: "Payment processed successfully",
      payment,
    });
  } catch (error) {
    next(new ErrorResponse(error.message, 500));
  }
};

export { processPayment };

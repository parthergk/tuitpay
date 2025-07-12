import Razorpay from "razorpay";
import { Request, Response, Router } from "express";
import { verifyJwt } from "../middleware/verifyJwt";
import { connectTodb, Payment } from "@repo/db";

const orderRouter: Router = Router();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID!,
  key_secret: process.env.RAZORPAY_KEY_SECRET!,
});

orderRouter.post("/", verifyJwt, async (req: Request, res: Response) => {
  const { planId, variant } = req.body;
  const { id } = req.user;

  if (!planId || !variant?.price) {
    res.status(400).json({ error: "Missing productId or variant" });
    return;
  }

  try {
    await connectTodb();
    
    const amountInPaise = Math.round(variant.price * 100);
    
    const razorpayOrder = await razorpay.orders.create({
        amount: amountInPaise,
        currency: "INR",
        receipt: `receipt_${Date.now()}`,
        notes: {
            planId: planId.toString()
        }
    });

    const order = await Payment.create({
        userId: id,
        planId,
        razorpayOrderId: razorpayOrder.id,
        amount: razorpayOrder.amount,
        status: "pending",
    });

    res.status(201).json({ 
      message: "Order created successfully",
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      dbOrderId: order._id,
    });
    
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      error: "Failed to create order",
      message: "Internal server error"
    });
  }
});

export default orderRouter;
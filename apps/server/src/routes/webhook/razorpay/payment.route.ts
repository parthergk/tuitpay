import { Request, Response, Router } from "express";
import crypto from "crypto";
import { Payment, User } from "@repo/db";
import { IPlan, IUser } from "@repo/types";
import { getTodayDate } from "../../../utils/dateUtils";

const paymentRouter: Router = Router();

paymentRouter.post("/", async (req: Request, res: Response) => {
  const body = req.body;
  const razorpaySignature = req.headers["x-razorpay-signature"] as string;

  if (!razorpaySignature) {
    res.status(400).json({ error: "Missing X-Razorpay-Signature header" });
    return;
  }

  // Convert body to string if it's an object
  const rawBody = typeof body === "string" ? body : JSON.stringify(body);

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
    .update(rawBody, "utf8")
    .digest("hex");

  if (expectedSignature !== razorpaySignature) {
    res.status(403).json({ error: "Invalid signature" });
    return;
  }

  // Parse event data
  const event = typeof body === "string" ? JSON.parse(body) : body;

  try {
    if (event.event === "payment.captured") {
      const payment = event.payload.payment.entity;

      const order = await Payment.findOneAndUpdate(
        {
          razorpayOrderId: payment.order_id,
          status: "pending",
        },
        {
          razorpayPaymentId: payment.id,
          status: "completed",
          updatedAt: getTodayDate(),
        },
        { new: true }
      ).populate<{ planId: IPlan; userId: IUser }>([
        { path: "planId", select: "type price studentLimit durationDays" },
        { path: "userId", select: "email name" },
      ]);

      if (!order) {
        res.status(404).json({
          status: "error",
          message: "Order not found or already processed",
        });
        return;
      }
      const user = order?.userId;
      const plan = order?.planId;

      let expiresAt = null;
      if (plan?.durationDays) {
        expiresAt = getTodayDate();
        expiresAt.setDate(expiresAt.getDate() + plan.durationDays);
      }

      await User.findByIdAndUpdate(user?._id, {
        planType: plan?.type,
        planStatus: "active",
        studentLimit: plan?.studentLimit ?? null,
        planActivatedAt: getTodayDate(),
        planExpiresAt: expiresAt,
      });

      console.log("Payment completed for order:", order._id);
      // console.log("User email:", order.userId?.email);
      // console.log("Plan:", order.planId?.name);

      // TODO: Send confirmation email
      // await sendPaymentConfirmationEmail(order.userId.email, order);

      res.status(200).json({
        status: "success",
        message: "Payment processed successfully",
        orderId: order._id,
      });
      return;
    }
    if (event.event === "payment.failed") {
      const payment = event.payload.payment.entity;

      const order = await Payment.findOneAndUpdate(
        {
          razorpayOrderId: payment.order_id,
          status: "pending",
        },
        {
          razorpayPaymentId: payment.id,
          status: "failed",
          failureReason: payment.error_description || "Payment failed",
          updatedAt: getTodayDate(),
        },
        { new: true }
      );

      if (!order) {
        res.status(404).json({
          status: "error",
          message: "Order not found for failed payment",
        });
        return;
      }
      await User.findByIdAndUpdate(order.userId, { planStatus: "expired" });
      console.log(`❌ Payment failed for order: ${order._id}`);

      res.status(200).json({
        status: "failed",
        message: "Payment failure processed",
        orderId: order._id,
      });
      return;
    }
    // Unhandled event
    console.log(`ℹ️ Unhandled event: ${event.event}`);
    res.status(200).json({
      status: "ignored",
      message: "Event received but not processed",
      event: event.event,
    });
    return;
  } catch (error) {
    console.error("🔥 Error processing webhook:", error);
    res.status(500).json({
      status: "error",
      message: "Internal server error while processing payment webhook",
    });
    return;
  }
});

export default paymentRouter;

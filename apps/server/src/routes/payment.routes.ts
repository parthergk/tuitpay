import { Request, Response, Router } from "express";
import crypto from "crypto";

const paymentStatusRouter: Router = Router();

paymentStatusRouter.post("/", async (req: Request, res: Response) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const hmac = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`);
  const generatedSignature = hmac.digest("hex");

  if (generatedSignature === razorpay_signature) {
    res
      .status(200)
      .json({ success: true, message: "Payment successful and verified" });
  } else {
    console.log("Invalid webhook signature! Payment verification failed");
    res
      .status(400)
      .json({ success: false, message: "Payment verification failed" });
  }
});

export default paymentStatusRouter;

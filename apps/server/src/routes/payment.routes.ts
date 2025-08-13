import { Payment } from "@repo/db";
import { Request, Response, Router } from "express";

const paymentStatusRouter: Router = Router();

paymentStatusRouter.get("/", async (req: Request, res: Response) => {
  try {
    const { order_id } = req.query;
    if (!order_id) {
      res.status(400).json({ status: "error", message: "Missing order_id" });
      return;
    }

    const payment = await Payment.findOne({ razorpayOrderId: order_id });
    if (!payment) {
      res.status(404).json({ status: "error", message: "Not found" });
      return;
    }

    res.json({ status: payment.status });
    return;
  } catch (e) {
    console.error(e);
    res.status(500).json({ status: "error" });
    return;
  }
});

export default paymentStatusRouter;

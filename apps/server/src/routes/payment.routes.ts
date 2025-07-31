import { FeePayment, Payment } from "@repo/db";
import { Request, Response, Router } from "express";

const paymentStatusRouter:Router =  Router();

paymentStatusRouter.get('/', async (req:Request, res:Response)=>{
  
    const { order_id } = req.query;

  if (!order_id) {
    res.status(400).json({
      error: "Order ID is required"
    });
    return;
  }

  
  try {
    const payment = await Payment.findOne({
      razorpayOrderId: order_id as string
    })

    if (!payment) {
       res.status(404).json({
        status: "not_found",
        message: "Order not found"
      });
      return;
    }
    
    res.json({
      status: payment.status,
      updatedAt: payment.updatedAt
    });

  } catch (error) {
    console.error("Error checking payment status:", error);
    res.status(500).json({
      error: "Internal server error"
    });
  }
});

export default paymentStatusRouter;
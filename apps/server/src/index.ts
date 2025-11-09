import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import student from "./routes/students.routes";
import dashboard from "./routes/dashboard.routes";
import plan from "./routes/plan.routes";
import order from "./routes/order.routes";
import feeStatusRouter from "./routes/feeStatus.routes";
import "./cron/index";
import { connectTodb } from "@repo/db";
import paymentRouter from "./routes/webhook/razorpay/payment.route";
import paymentStatusRouter from "./routes/payment.routes";
import sendOverduesRouter from "./routes/overdues.routes";
import teacherRouter from "./routes/teacher.route";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

async function startServer() {
  try {
    await connectTodb();
    app.use("/api/v1/student", student);
    app.use("/api/v1/dashboard", dashboard);
    app.use("/api/v1/plan", plan);
    app.use("/api/v1/order", order);
    app.use("/api/v1/status", feeStatusRouter);
    app.use("/api/v1/verify", paymentRouter);
    app.use("/api/v1/overdue", sendOverduesRouter);
    app.use("/api/v1/teacher", teacherRouter);
    app.use("/api/v1/verifyPayment",paymentStatusRouter)

    app.listen(PORT, () => {
      console.log(`Server is runing on port: ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to DB", error);
    process.exit(1);
  }
}

startServer();

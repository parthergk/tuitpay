import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import student from "./routes/students.routes";
import dashboard from "./routes/dashboard.routes";
import plan from "./routes/plan.routes";
import order from "./routes/order.routes";
import feeStatus from "./routes/feeStatus.routes";
import "./cron/index"

const app = express();
const PORT = process.env.PORT || 8080;

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/student", student);
app.use("/api/v1/dashboard", dashboard);
app.use("/api/v1/plan", plan);
app.use("/api/v1/order", order);
app.use("/api/v1/status", feeStatus);

app.listen(PORT, () => {
  console.log(`https server is runing on port ${PORT}`);
});

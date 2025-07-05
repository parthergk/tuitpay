import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
dotenv.config();
import student from "./routes/students.routes";
import dashboardRouter from "./routes/dashboard.routes";

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

app.use("/api/student", student);
app.use("/api/dashboard", dashboardRouter);

app.listen(PORT, () => {
  console.log(`https server is runing on port ${PORT}`);
});

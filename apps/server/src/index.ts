import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import student from "./routes/students.routes";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(cookieParser());
app.use(express.json());

dotenv.config();

app.use('/student', student);

app.listen(PORT,()=>{
    console.log(`https server is runing on port ${PORT}`);
})
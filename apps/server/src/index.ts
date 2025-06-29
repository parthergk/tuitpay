import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.listen(PORT,()=>{
    console.log(`https server is runing on port ${PORT}`);
})
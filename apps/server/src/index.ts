import express from "express";
import cors from "cors";
import user from "./routes/user.routes"

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.use('/user', user)
app.listen(PORT,()=>{
    console.log(`https server is runing on port ${PORT}`);
})
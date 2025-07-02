import { Request, Response, Router } from "express";
import { verifyJwt } from "../middleware/verifyJwt";

const studentRouter: Router = Router();

studentRouter.get("/", verifyJwt, async (req, res) => {
  console.log("Request data", req.user);
  
  res.send("Hello");
});

studentRouter.post("/", (req:Request, res:Response)=>{

});

studentRouter.put("/:id", (req:Request, res:Response)=>{

});

studentRouter.delete("/:id", (req:Request, res:Response)=>{

});

export default studentRouter;

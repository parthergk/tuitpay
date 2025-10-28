import { Request, Response, Router } from "express";
import { verifyJwt } from "../middleware/verifyJwt";
import { FeePayment } from "@repo/db";
import { IStudent } from "@repo/types";

const sendOverduesRouter:Router = Router();

sendOverduesRouter.get("/:id",verifyJwt, async (req:Request, res:Response)=>{
    const {id} = req.params;
    const record = await FeePayment.findById(id).populate<{studentId: IStudent}>("studentId", "name contact");
    
    
})

export default sendOverduesRouter;
import { Request, Response, Router } from "express";
import { verifyJwt } from "../middleware/verifyJwt";
import { FeePayment } from "@repo/db";
import { IStudent } from "@repo/types";
import { whatsappSender } from "../lib/whatsappClient";

const sendOverduesRouter: Router = Router();

sendOverduesRouter.get(
  "/:id",
  verifyJwt,
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const record = await FeePayment.findById(id).populate<{
      studentId: IStudent;
    }>("studentId", "name contact teacherId");

    if (!record) {
        res.status(404).json({success:false, error: "No record found"});
        return;
    }
    
    whatsappSender(
      {
        name: record?.studentId.name,
        contact: record?.studentId.contact,
        teacherId: record?.studentId.teacherId,
      },
      { dueDate: record.dueDate, amount: record.amount },
      "overdue"
    );
  }
);

export default sendOverduesRouter;

import { Request, Response, Router } from "express";
import { verifyJwt } from "../middleware/verifyJwt";
import { FeePayment } from "@repo/db";
import { getTodayDate } from "../utils/dateUtils";

const fee: Router = Router();

fee.post("/", verifyJwt, async (req: Request, res: Response) => {
  const userBody = req.user;
  const { data } = req.body;

  if (!data.status) {
    res.status(422).json({ status:false, error: "Status is required" });
    return;
  }

  if (data.status !== "paid") {
    res.status(403).json({ status:false, error: "Only 'paid' status is allowed" });
    return;
  }

  try {

    const feeRecord = await FeePayment.findOne({
      _id: data.feeId,
      teacherId: userBody.id
    });

    if (!feeRecord) {
        res.status(404).json({ status: false, error: "Fee record not found for this student" });
        return;
    }

    feeRecord.status = data.status;
    feeRecord.paidDate = getTodayDate();
    feeRecord.paidAmount = data.paidAmount;

    await feeRecord.save();

    // const dueDate = new Date(feeRecord.dueDate);
    // dueDate.setMonth(dueDate.getMonth() + 1);

    // const firstReminderDate = new Date(dueDate);
    // firstReminderDate.setDate(firstReminderDate.getDate() - 3);

    // await FeePayment.create({
    //   studentId: feeRecord.studentId,
    //   teacherId: feeRecord.teacherId,
    //   amount: feeRecord.amount,
    //   dueDate: dueDate,
    //   status: "pending",
    //   reminderCount: 0,
    //   nextReminderAt: firstReminderDate
    // });

    res.status(200).json({status:true, message: "Fee marked as paid." });
    return;

  } catch (error) {
    console.error("Error updating the status", error);
    res.status(500).json({status: false, error: error instanceof Error ? error.message : "Could not update status, try again." });
    return;
  }
});

export default fee;
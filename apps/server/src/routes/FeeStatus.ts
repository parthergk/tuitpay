import { Request, Response, Router } from "express";
import { verifyJwt } from "../middleware/verifyJwt";
import { connectTodb, FeePayment } from "@repo/db";

const feeStatusRouter: Router = Router();

feeStatusRouter.post("/", verifyJwt, async (req: Request, res: Response) => {
  const userBody = req.user;
  const { data } = req.body;

  if (!data.status) {
    res.status(422).json({ message: "Status is required" });
    return;
  }

  if (data.status !== "paid") {
    res.status(403).json({ message: "Only 'paid' status is allowed" });
    return;
  }

  try {
    await connectTodb();

    const feeRecord = await FeePayment.findOne({
      _id: data.feeId,
      teacherId: userBody.id
    });

    if (!feeRecord) {
        res.status(404).json({ message: "Fee record not found for this student" });
        return;
    }

    feeRecord.status = "paid";
    feeRecord.paidDate = new Date();

    await feeRecord.save();

    const dueDate = new Date(feeRecord.dueDate);
    dueDate.setMonth(dueDate.getMonth() + 1);

    const firstReminderDate = new Date(dueDate);
    firstReminderDate.setDate(firstReminderDate.getDate() - 3);

    await FeePayment.create({
      studentId: feeRecord.studentId,
      teacherId: feeRecord.teacherId,
      amount: feeRecord.amount,
      dueDate: dueDate,
      status: "pending",
      reminderCount: 0,
      nextReminderAt: firstReminderDate
    });

    res.status(200).json({ message: "Fee marked as paid. Next month fee created successfully." });
    return;

  } catch (error) {
    console.error("Error updating the status", error);
    res.status(500).json({ message: "Could not update status, try again.", error });
    return;
  }
});

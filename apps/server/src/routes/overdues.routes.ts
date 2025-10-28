import { Request, Response, Router } from "express";
import { verifyJwt } from "../middleware/verifyJwt";
import { FeePayment } from "@repo/db";
import { IStudent } from "@repo/types";
import { whatsappSender } from "../lib/whatsappClient";
import { getTodayDate } from "../utils/dateUtils";

const sendOverduesRouter: Router = Router();

sendOverduesRouter.get(
  "/:id",
  verifyJwt,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const userId = req.user?.id;

      if (!id) {
        res.status(400).json({
          success: false,
          message: "Invalid request. Payment record ID is required.",
        });
        return;
      }

      const record = await FeePayment.findById(id).populate<{
        studentId: IStudent;
      }>("studentId", "name contact teacherId");

      if (!record) {
        res.status(404).json({
          success: false,
          message: "No payment record found for the given ID.",
        });
        return;
      }

      if (record.studentId.teacherId.toString() !== userId) {
        res.status(403).json({
          success: false,
          message: "You are not authorized to send reminders for this record.",
        });
        return;
      }

      if (!record.studentId.contact) {
        res.status(400).json({
          success: false,
          message: `Contact number not available for student ${record.studentId.name}.`,
        });
        return;
      }

      const today = new Date().toISOString().split("T")[0];
      const lastReminder = new Date(record.lastReminderAt).toISOString().split("T")[0];
      if (today===lastReminder) {
        res.status(400).json({
          success: false,
          message: "You’ve already sent a reminder today for this student.",
        });
        return;
      }

      const sendResult = await whatsappSender(
        {
          name: record.studentId.name,
          contact: record.studentId.contact,
          teacherId: record.studentId.teacherId,
        },
        { dueDate: record.dueDate, amount: record.amount },
        "overdue"
      );

      if (!sendResult?.success) {
         res.status(500).json({
          success: false,
          message: "Failed to send WhatsApp reminder. Please try again later.",
        });
        return;
      }

      record.lastReminderAt = getTodayDate();
      await record.save();
      res.status(200).json({
        success: true,
        message: `Reminder successfully sent to ${record.studentId.name} for ₹${record.amount}.`,
      });
      return;
    } catch (error: any) {
      console.error("Error in sending overdue reminder:", error);

      res.status(500).json({
        success: false,
        message: "Something went wrong while sending the overdue reminder.",
        error:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      });
      return;
    }
  }
);

export default sendOverduesRouter;

import { Request, Response, Router } from "express";
import { verifyJwt } from "../middleware/verifyJwt";
import { FeePayment, Student, User } from "@repo/db";
import { IStudent } from "@repo/types";

const dashboardRouter: Router = Router();

dashboardRouter.get(
  "/summary",
  verifyJwt,
  async (req: Request, res: Response) => {
    const { id: userId } = req.user;
    try {
      const allStudents = await Student.find({ teacherId: userId });
      const paid = await FeePayment.countDocuments({
        teacherId: userId,
        status: "paid",
      });
      const unpaid = await FeePayment.countDocuments({
        teacherId: userId,
        status: "pending",
      });
      const overdue = await FeePayment.countDocuments({
        teacherId: userId,
        status: "overdue",
      });

      const recentPaid = await FeePayment.find({
        teacherId: userId,
        status: "paid",
      })
        .sort({ _id: -1 })
        .limit(4)
        .select("paidAmount paidDate studentId")
        .populate<{ studentId: IStudent }>("studentId", "name")
        .lean();

      const overdues = await FeePayment.find({
        teacherId: userId,
        status: "overdue",
      })
        .sort({ _id: -1 })
        .limit(4)
        .select("amount dueDate studentId")
        .populate<{ studentId: IStudent }>("studentId", "name")
        .lean();

      const today = new Date();

      const overduesWithDays = overdues.map((item) => {
        const dueDate = new Date(item.dueDate);
        const diffTime = today.getTime() - dueDate.getTime();
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        return {
          id: item._id,
          name: item.studentId.name || "Unknown",
          amount: item.amount,
          daysOverdue: diffDays > 0 ? diffDays : 0,
        };
      });

      const formatedData = recentPaid.map((item) => ({
        id: item._id,
        name: item.studentId.name || "Unknown",
        amount: item.paidAmount,
        paidDate: item.paidDate?.toDateString(),
      }));

      res.status(200).json({
        success: true,
        recentActivity: formatedData,
        upcomingDues: overduesWithDays,
        summary: { totalStudents: allStudents.length, paid, unpaid, overdue },
      });
    } catch (error) {
      console.error("Dashboard summary error:", error);
      res.status(500).json({
        success: false,
        message: "Unable to fetch summary data! Please try again.",
      });
    }
  }
);

dashboardRouter.get(
  "/feeRecord",
  verifyJwt,
  async (req: Request, res: Response) => {
    const { id: userId } = req.user;

    try {
      const feeRecords = await FeePayment.find({ teacherId: userId })
        .select("amount paidAmount dueDate status paidDate")
        .populate<{ studentId: IStudent }>("studentId", "name");

      if (!feeRecords || feeRecords.length === 0) {
        res.status(404).json({
          success: false,
          error: "No fee records found for this teacher.",
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: "Fee records fetched successfully.",
        data: feeRecords,
      });
      return;
    } catch (error) {
      console.error("Error fetching fee records:", error);

      res.status(500).json({
        success: false,
        error: "Internal Server Error. Unable to fetch fee records."});
      return;
    }
  }
);

export default dashboardRouter;

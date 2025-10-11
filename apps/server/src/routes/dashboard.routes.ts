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
        status: "pendding",
      });
      const overdue = await FeePayment.countDocuments({
        teacherId: userId,
        status: "overdue",
      });

      const recentPaid = await FeePayment.find({ status: "paid" })
        .sort({ _id: -1 })
        .limit(4)
        .select("amount paidDate studentId")
        .populate<{ studentId: IStudent }>("studentId", "name")
        .lean();
        
      const formatedData = recentPaid.map((item) => ({
        id: item._id,
        name: item.studentId.name || "Unknown",
        amount: item.amount,
        paidDate: item.paidDate,
      }));


      res.status(200).json({
        success: true,
        recentActivity: formatedData,
        summary: {
          totalStudents: allStudents.length,
          paid,
          unpaid,
          overdue,
        },
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: "Unable to fetch summary data! Please try again",
      });
    }
  }
);

export default dashboardRouter;

import { Request, Response, Router } from "express";
import { verifyJwt } from "../middleware/verifyJwt";
import { connectTodb, FeePayment, Student } from "@repo/db";

const dashboardRouter: Router = Router();

dashboardRouter.get(
  "/",
  verifyJwt,
  async (req: Request, res: Response) => {
    const teacher = req.user;
    try {
      await connectTodb();

      const totalStudents = await Student.find({
        teacherId: teacher.id,
      }).sort({ name: 1 });

      const now = new Date();

      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
      const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

      const totalPaidThisMonth = await FeePayment.find({
        teacherId: teacher.id,
        status: "paid",
        dueDate: {
          $gte: firstDay,
          $lte: lastDay,
        },
      });

      const totalUnPaidThisMonth = await FeePayment.find({
        teacherId: teacher.id,
        status: "pending",
        dueDate: {
          $gte: firstDay,
          $lte: lastDay,
        },
      });

      const today = new Date();
      const totalOverdue = await FeePayment.find({
        teacherId: teacher.id,
        status: "pending",
        dueDate: { $lt: today },
      });

      const data = {
        students: totalStudents,
        paid: totalPaidThisMonth,
        unpaid: totalUnPaidThisMonth,
        overDue: totalOverdue,
      };

      res.status(200).json({ message: "All students", data });
      return;
    } catch (error) {
      console.error("Error fetching teacher students:", error);
      res.status(500).json({ message: "student not found try again" });
    }
  }
);


export default dashboardRouter;
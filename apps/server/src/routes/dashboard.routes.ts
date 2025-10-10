import { Request, Response, Router } from "express";
import { verifyJwt } from "../middleware/verifyJwt";
import { FeePayment, Student, User } from "@repo/db";

const dashboardRouter: Router = Router();

dashboardRouter.get(
  "/summary",
  verifyJwt,
  async (req: Request, res: Response) => {
    const { id: userId } = req.user;
    try {
      const totalStudent = await Student.countDocuments({ teacherId: userId });
      const paid = await FeePayment.countDocuments({ teacherId: userId, status: "paid"});
      const unpaid = await FeePayment.countDocuments({ teacherId: userId, status: "pendding"});
      const overdue = await FeePayment.countDocuments({ teacherId: userId, status: "overdue"});

      res.status(200).json({
        success: true,
        summary: {
          totalStudent,
          paid,
          unpaid,
          overdue,
        },
      });
    } catch (error) {
      res.status(500).json({success: false,error: "Unable to fetch summary data! Please try again"});
    }
  }
);

export default dashboardRouter;

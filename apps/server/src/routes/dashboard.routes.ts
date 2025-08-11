import { Request, Response, Router } from "express";
import { verifyJwt } from "../middleware/verifyJwt";
import { FeePayment, Student, User } from "@repo/db";
import { getTodayDate } from "../utils/dateUtils";

const dashboardRouter: Router = Router();

dashboardRouter.get("/", verifyJwt, async (req: Request, res: Response) => {
  const { id: userId } = req.user;

  try {
    const allStudents = await Student.find({ teacherId: userId }).sort({ name: 1 });

    const teacher = await User.findById(userId);
    if (!teacher) {
      throw new Error("Dashboard data unavailable: teacher not found");
    }

    const now = getTodayDate();

    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const paidPayments = await FeePayment.find({
      teacherId: userId,
      status: "paid",
      dueDate: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
    });

    const unpaidPayments = await FeePayment.find({
      teacherId: userId,
      status: "pending",
      dueDate: { $gte: firstDayOfMonth, $lte: lastDayOfMonth },
    });

    const today = getTodayDate();
    const overduePayments = await FeePayment.find({
      teacherId: userId,
      status: "overdue",
      dueDate: { $lt: today },
    });

    const dashboardData = {
      teacher: {
        name: teacher.name,
        phone: teacher.phone,
        email: teacher.email,
        tuitionClassName: teacher.tuitionClassName,
        planType: teacher.planType,
        planStatus: teacher.planStatus,
        planActivatedAt: teacher.planActivatedAt,
        planExpiresAt: teacher.planExpiresAt,
        planPrice: teacher.planPrice,
        studentLimit: teacher.studentLimit,
        isVerified: teacher.isVerified,
        createdAt: teacher.createdAt,
      },
      students: allStudents,
      payments: {
        paid: paidPayments,
        unpaid: unpaidPayments,
        overdue: overduePayments,
      },
    };

    res.status(200).json({
      success: true,
      message: "Dashboard data retrieved successfully",
      data: dashboardData,
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({
      success: false,
      error: "Unable to fetch dashboard data. Please try again later.",
    });
  }
});

export default dashboardRouter;

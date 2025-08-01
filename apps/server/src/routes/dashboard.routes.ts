import { Request, Response, Router } from "express";
import { verifyJwt } from "../middleware/verifyJwt";
import { FeePayment, Student, User } from "@repo/db";
import { getTodayDate } from "../utils/dateUtils";

const dashboardRouter: Router = Router();

dashboardRouter.get("/", verifyJwt, async (req: Request, res: Response) => {
  const { id } = req.user;
  try {
    const totalStudents = await Student.find({
      teacherId: id,
    }).sort({ name: 1 });

    const teacher = await User.findById(id);
    if (!teacher) {
      throw new Error("Teacher not founded with this id");
    }

    const now = getTodayDate();

    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const totalPaidThisMonth = await FeePayment.find({
      teacherId: id,
      status: "paid",
      dueDate: {
        $gte: firstDay,
        $lte: lastDay,
      },
    });

    const totalUnPaidThisMonth = await FeePayment.find({
      teacherId: id,
      status: "pending",
      dueDate: {
        $gte: firstDay,
        $lte: lastDay,
      },
    });

    const today = getTodayDate();
    const totalOverdue = await FeePayment.find({
      teacherId: id,
      status: "overdue",
      dueDate: { $lt: today },
    });

    const data = {
      teacherInfo: {
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
});

export default dashboardRouter;

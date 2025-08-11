import { Request, Response, Router } from "express";
import { verifyJwt } from "../middleware/verifyJwt";
import { StudentSchema } from "@repo/validation/types";
import { Student, User, FeePayment } from "@repo/db";
import { checkPlanLimit } from "../middleware/checkPlanLimit";
import { getTodayDate } from "../utils/dateUtils";

const studentRouter: Router = Router();

studentRouter.get("/", verifyJwt, async (req, res) => {
  const teacherId = req.user;

  try {
    const students = await Student.find({
      teacherId: teacherId.id,
    }).sort({ name: 1 });

    res.status(200).json({ message: "All students", students });
    return;
  } catch (error) {
    console.error("Error fetching teacher students:", error);
    res.status(500).json({ message: "student not found try again" });
  }
});

studentRouter.post(
  "/",
  verifyJwt,
  checkPlanLimit,
  async (req: Request, res: Response) => {
    const data = req.body;

    const userBody = req.user;

    try {
      const parsedBody = StudentSchema.safeParse(data);

      if (!parsedBody.success) {
        console.error("Validation error:", parsedBody.error);
        res.status(422).json({
          success: false,
          error: "Invalid student inputs",
          errors: parsedBody.error.format(),
        });
        return;
      }

      const teacher = await User.findById(userBody.id);
      if (!teacher) {
        res.status(404).json({ success: false, error: "Teacher not found" });
        return;
      }

      const existStudent = await Student.findOne({
        teacherId: userBody.id,
        name: parsedBody.data.name,
        contact: parsedBody.data.contact,
      });

      if (existStudent) {
        res.status(409).json({
          success: false,
          error: "Student already exists with same name and contact",
        });
        return;
      }

      const joinDate = getTodayDate();
      const feeDay = parsedBody.data.feeDay || joinDate.getDate();

      const student = new Student({
        teacherId: userBody.id,
        name: parsedBody.data.name,
        contact: parsedBody.data.contact,
        class: parsedBody.data.class,
        sub: parsedBody.data.sub,
        monthlyFee: parsedBody.data.monthlyFee,
        isActivate: parsedBody.data.isActivate,
        joinDate: joinDate,
        feeDay: feeDay,
      });

      await student.save();

      let dueDate = new Date(student.joinDate);

      if (parsedBody.data.feeDay) {
        dueDate = new Date(
          joinDate.getFullYear(),
          joinDate.getMonth(),
          student.feeDay
        );
      }

      const firstReminderDate = new Date(dueDate);

      if (dueDate > new Date()) {
        firstReminderDate.setDate(firstReminderDate.getDate() - 1);
      }

      await FeePayment.create({
        studentId: student._id,
        teacherId: teacher._id,
        amount: student.monthlyFee,
        dueDate: dueDate,
        status: "pending",
        reminderCount: 0,
        nextReminderAt: firstReminderDate,
      });

      res
        .status(201)
        .json({
          success: true,
          message: "Student created successfully",
          student,
        });
      return;
    } catch (error) {
      console.error("Server error while adding student:", error);
      res.status(500).json({
        success: false,
        error:
          "Internal server error. Student was not added. Please try again.",
      });
      return;
    }
  }
);

studentRouter.put("/:id", verifyJwt, async (req: Request, res: Response) => {
  const { id } = req.params;
  const { data } = req.body;
  const userBody = req.user;

  try {
    const parsedBody = StudentSchema.safeParse(data);
    if (!parsedBody.success) {
      res.status(422).json({
        message: "Invalid student inputs",
        errors: parsedBody.error.format(),
      });
      return;
    }

    const student = await Student.findOne({ _id: id, teacherId: userBody.id });

    if (!student) {
      res.status(404).json({ message: "Student not found" });
      return;
    }

    student.name = parsedBody.data.name;
    student.class = parsedBody.data.class;
    student.sub = parsedBody.data.sub;
    student.contact = parsedBody.data.contact;
    student.monthlyFee = parsedBody.data.monthlyFee;
    student.isActivate = parsedBody.data.isActivate;

    await student.save();

    res.status(200).json({ message: "Student updated successfully", student });
    return;
  } catch (error) {
    console.error("Error updating student:", error);
    res
      .status(500)
      .json({ message: "Failed to update student. Please try again." });
    return;
  }
});

studentRouter.delete("/:id", verifyJwt, async (req: Request, res: Response) => {
  const { id } = req.params;
  const userBody = req.user;

  try {
    const student = await Student.findOne({ _id: id, teacherId: userBody.id });

    if (!student) {
      res.status(404).json({ message: "Student not found" });
      return;
    }

    await Student.deleteOne({ _id: id });

    // Optional: Also remove related fee payments
    await FeePayment.deleteMany({ studentId: id });

    res.status(200).json({
      message: "Student and related fee records deleted successfully",
    });
    return;
  } catch (error) {
    console.error("Error deleting student:", error);
    res
      .status(500)
      .json({ message: "Failed to delete student. Please try again." });
    return;
  }
});
export default studentRouter;

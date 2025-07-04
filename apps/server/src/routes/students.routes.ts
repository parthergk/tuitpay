import { Request, Response, Router } from "express";
import { verifyJwt } from "../middleware/verifyJwt";
import { StudentSchema } from "@repo/validation/types";
import { connectTodb, Student, User, FeePayment } from "@repo/db";

const studentRouter: Router = Router();

studentRouter.get("/", verifyJwt, async (req, res) => {
  const teacherId = req.user;

  try {
      const students = await Student.find({ 
        teacherId: teacherId,
        isActive: true 
      }).sort({ name: 1 });
      
      res.status(200).json({message: "All students", students})
        return;
    } catch (error) {
      console.error('Error fetching teacher students:', error);
      res.status(500).json({message: "student not found try again"});
    }
});

studentRouter.post("/", verifyJwt, async (req: Request, res: Response) => {
  const { data } = req.body;

  const userBody = req.user;

  try {
    const parsedBody = StudentSchema.safeParse(data);

    if (!parsedBody.success) {
      console.error("Validation error:", parsedBody.error);
      res
        .status(422)
        .json({
          message: "Invalid student inputs",
          errors: parsedBody.error.format(),
        });
      return;
    }

    await connectTodb();

    const teacher = await User.findById(userBody.id);
    if (!teacher) {
      res.status(404).json({ message: "Teacher not found" });
      return;
    }

    const existStudent = await Student.findOne({
      teacherId: userBody.id,
      name: parsedBody.data.name,
      contact: parsedBody.data.contact,
    });

    if (existStudent) {
      res
        .status(409)
        .json({ message: "Student already exists with same name and contact" });
      return;
    }

    const student = new Student({
      teacherId: userBody.id,
      name: parsedBody.data.name,
      class: parsedBody.data.class,
      sub: parsedBody.data.sub,
      contact: parsedBody.data.contact,
      monthlyFee: parsedBody.data.monthlyFee,
      isActivate: parsedBody.data.isActivate,
      joinDate: new Date(),
    });

    await student.save();

    const joinDate = student.joinDate;
    const dueDate = new Date(joinDate);
    dueDate.setMonth(dueDate.getMonth() + 1);

    await FeePayment.create({
      studentId: student._id,
      teacherId: teacher._id,
      amount: student.monthlyFee,
      dueDate: dueDate,
      status: "pending",
    });

    res.status(201).json({ message: "Student created successfully", student });
    return;
  } catch (error) {
    console.error("Server error while adding student:", error);
    res
      .status(500)
      .json({
        message:
          "Internal server error. Student was not added. Please try again.",
      });
    return;
  }
});

studentRouter.put("/:id", (req: Request, res: Response) => {});

studentRouter.delete("/:id", (req: Request, res: Response) => {});

export default studentRouter;

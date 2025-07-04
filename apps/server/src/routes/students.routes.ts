import { Request, Response, Router } from "express";
import { verifyJwt } from "../middleware/verifyJwt";
import { StudentSchema } from "@repo/validation/types";
import { connectTodb, Student, User, FeePayment } from "@repo/db";

const studentRouter: Router = Router();

studentRouter.get("/", verifyJwt, async (req, res) => {
  console.log("Request data", req.user);

  res.send("Hello");
});

studentRouter.post("/", verifyJwt, async (req: Request, res: Response) => {
  const { data } = await req.body;

  const userBody = req.user;
  try {
    const parsedBody = StudentSchema.safeParse(data);

    console.log("Error body parse", parsedBody.error);

    if (!parsedBody.success) {
      res.status(400).json({ message: "Invalid inputs" });
      return;
    }

    await connectTodb();

    const teacher = await User.findById(userBody.id);
    if (!teacher) {
      throw new Error("Teacher not found");
    }

    const existStudent = await Student.findOne({
      teacherId: userBody.id,
      name: parsedBody.data.name,
      contact: parsedBody.data.contact,
    });

    if (existStudent) {
      res.status(400).json({ message: "student already exist" });
      return;
    }

    const student = await Student.create({
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

    const joinDate = new Date(student.joinDate);
    let dueDate = new Date(joinDate);

    dueDate.setMonth(joinDate.getMonth() + 1);

    await FeePayment.create({
      studentId: student._id,
      teacherId: teacher._id,
      amount: student.monthlyFee,
      dueDate: dueDate,
      status: "pending",
    });

    console.log("student", student);
  } catch (error) {
    console.log("error", error);
  }
});

studentRouter.put("/:id", (req: Request, res: Response) => {});

studentRouter.delete("/:id", (req: Request, res: Response) => {});

export default studentRouter;

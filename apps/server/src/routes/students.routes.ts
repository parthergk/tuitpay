import { Request, Response, Router } from "express";
import { verifyJwt } from "../middleware/verifyJwt";
import { StudentSchema } from "@repo/validation/types";
import { connectTodb, Student } from "@repo/db";

const studentRouter: Router = Router();


studentRouter.get("/", verifyJwt, async (req, res) => {

  console.log("Request data", req.user);

  res.send("Hello");
});

studentRouter.post("/", verifyJwt, async (req: Request, res: Response) => {
  
  const {data} = await req.body;
  console.log("Body", data);
  
  const userBody = req.user;
  try {
  const parsedBody = StudentSchema.safeParse(data);

  if (!parsedBody.success) {
    res.status(400).json({ message: "Invalid inputs" });
    return;
  }

    await connectTodb();

    const existStudent = await Student.findOne({
      teacherId: userBody.id,
      name: parsedBody.data.name,
      contact: parsedBody.data.contact,
    });

    if (existStudent) {
      res
        .status(400)
        .json({ message: "student already exist with this detial" });
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
      joinDate: parsedBody.data.joinDate,
    });

    console.log("student", student);
  } catch (error) {
    console.log("error", error);
  }
});

studentRouter.put("/:id", (req: Request, res: Response) => {});

studentRouter.delete("/:id", (req: Request, res: Response) => {});

export default studentRouter;

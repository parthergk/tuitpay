import { User } from "@repo/db";
import { Request, Response, Router } from "express";
import { verifyJwt } from "../middleware/verifyJwt";

const teacherRouter:Router = Router();

teacherRouter.get("/", verifyJwt,async (req: Request, res: Response) => {
  const { id: userId } = req.user;
  try {
    const teacher = await User.findById(userId);
    console.log("Teacher", teacher);
    res.json({message: "Teacher",data: teacher});
  } catch (error) {
    console.log("Error", error);
  }
});

export default teacherRouter;
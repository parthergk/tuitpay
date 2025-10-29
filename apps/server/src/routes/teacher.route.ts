import { User } from "@repo/db";
import { Request, Response, Router } from "express";
import { verifyJwt } from "../middleware/verifyJwt";

const teacherRouter: Router = Router();

teacherRouter.get("/", verifyJwt, async (req: Request, res: Response) => {
  const { id: userId } = req.user;

  try {
    const teacher = await User.findById(userId).select(
      "name email phone tuitionClassName planType planStatus planPrice studentLimit planActivatedAt planExpiresAt"
    );

    if (!teacher) {
      res.status(404).json({
        success: false,
        message: "Teacher not found. Please check your account.",
      });
      return;
    }

     res.status(200).json({
      success: true,
      message: "Teacher profile fetched successfully.",
      data: teacher,
    });
    return;
  } catch (error) {
    console.error("Error fetching teacher profile:", error);
     res.status(500).json({
      success: false,
      message:
        "Something went wrong while fetching your profile. Please try again later.",
    });
    return;
  }
});

export default teacherRouter;

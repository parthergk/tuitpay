import { connectTodb, Student, User } from "@repo/db";
import { NextFunction, Request, Response } from "express";

async function checkPlanLimit(req: Request, res: Response, next: NextFunction) {
  const userId = req.user?.id;

  if (!userId) {
     res.status(401).json({
      message: "User not authenticated"
    });
    return;
  }

  try {
    await connectTodb();
    
    const user = await User.findById(userId);

    if (!user) {
       res.status(404).json({
        message: "Teacher not found"
      });
      return;
    }

    const studentCount = await Student.countDocuments({ teacherId: userId });

    if (studentCount >= user.studentLimit) {
       res.status(403).json({
        message: `You have reached your plan limit (${user.studentLimit} students). Upgrade your plan to add more students.`,
        currentStudents: studentCount,
        maxStudents: user.studentLimit
      });
      return;
    }

    next();
    
  } catch (error) {
    console.error("Error in checkPlanLimit middleware:", error);
     res.status(500).json({
      message: "Internal server error",
      error: "Failed to check plan limit"
    });
    return;
  }
}

export { checkPlanLimit };
import { connectTodb, Plan } from "@repo/db";
import { Request, Response, Router } from "express";
import { verifyJwt } from "../middleware/verifyJwt";
import { PlanSchema } from "@repo/validation/types";

const planRouter: Router = Router();

planRouter.post('/', verifyJwt, async (req: Request, res: Response) => {
  const parsedBody = PlanSchema.safeParse(req.body);

  if (!parsedBody.success) {
    res.status(400).json({
      message: "Invalid inputs",
      errors: parsedBody.error.errors
    });
    return;
  }

  const { data } = parsedBody;

  try {
    await connectTodb();

    const exist = await Plan.findOne({ type: data.type });
    if (exist) {
       res.status(409).json({ message: "Plan type already exists" });
       return;
    }

    const plan = await Plan.create({
      type: data.type,
      price: data.price,
      studentLimit: data.studentLimit
    });

    res.status(201).json({
      message: "Plan created successfully",
      plan
    });

  } catch (error) {
    console.error("Error creating plan:", error);
    res.status(500).json({
      message: "Internal server error"
    });
  }
});

export default planRouter;
import { Router, Request, Response } from "express";
import { Plan } from "@repo/db";
import { verifyJwt } from "../middleware/verifyJwt";
import { PlanSchema } from "@repo/validation/types";

const planRouter: Router = Router();

planRouter.post("/", verifyJwt, async (req: Request, res: Response) => {
  const parsed = PlanSchema.safeParse(req.body);

  if (!parsed.success) {
     res.status(400).json({
      message: "Invalid inputs",
      errors: parsed.error.errors,
    });
    return;
  }

  const { type, price, studentLimit } = parsed.data;

  try {


    // Optional: prevent duplicate plan types
    const exist = await Plan.findOne({ type });
    if (exist) {
       res.status(409).json({ message: "Plan type already exists" });
       return;
    }

    const plan = await Plan.create({
      type,
      price,
      studentLimit,
    });

     res.status(201).json({
      message: "Plan created successfully",
      plan,
    });
    return;
  } catch (error) {
    console.error("Error creating plan:", error);
     res.status(500).json({ message: "Internal server error" });
     return;
  }
});

planRouter.get("/", verifyJwt, async (_req: Request, res: Response) => {
  try {

    const plans = await Plan.find().sort({ price: 1 });
     res.status(200).json({ message: "All plans", plans });
     return;
  } catch (error) {
    console.error("Error fetching plans:", error);
     res.status(500).json({ message: "Internal server error" });
     return;
  }
});


planRouter.get("/:id", verifyJwt, async (req: Request, res: Response) => {
  const { id } = req.params;

  try {

    const plan = await Plan.findById(id);
    if (!plan) {
       res.status(404).json({ message: "Plan not found" });
       return;
    }
     res.status(200).json({ message: "Plan fetched", plan });
     return;
  } catch (error) {
    console.error("Error fetching plan:", error);
     res.status(500).json({ message: "Internal server error" });
     return;
  }
});


planRouter.put("/:id", verifyJwt, async (req: Request, res: Response) => {
  const { id } = req.params;
  const parsed = PlanSchema.safeParse(req.body);

  if (!parsed.success) {
     res.status(400).json({
      message: "Invalid inputs",
      errors: parsed.error.errors,
    });
    return;
  }

  const { type, price, studentLimit } = parsed.data;

  try {


    const plan = await Plan.findById(id);
    if (!plan) {
       res.status(404).json({ message: "Plan not found" });
       return;
    }

    plan.type = type;
    plan.price = price;
    plan.studentLimit = studentLimit;

    await plan.save();

     res.status(200).json({ message: "Plan updated", plan });
     return
  } catch (error) {
    console.error("Error updating plan:", error);
     res.status(500).json({ message: "Internal server error" });
     return
  }
});

planRouter.delete("/:id", verifyJwt, async (req: Request, res: Response) => {
  const { id } = req.params;

  try {


    const plan = await Plan.findById(id);
    if (!plan) {
       res.status(404).json({ message: "Plan not found" });
       return
    }

    await Plan.findByIdAndDelete(id);

     res.status(200).json({ message: "Plan deleted successfully" });
     return
  } catch (error) {
    console.error("Error deleting plan:", error);
     res.status(500).json({ message: "Internal server error" });
     return;
  }
});

export default planRouter;

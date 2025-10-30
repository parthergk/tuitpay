import { Router, Request, Response } from "express";
import { Plan } from "@repo/db";
import { PlanSchema } from "@repo/validation/types";

const planRouter: Router = Router();

planRouter.get("/new", async (req: Request, res: Response) => {
  const plans = [
    {
      type: "free",
      studentLimit: 20,
      durationDays: null,
      title: "Free",
      price: 0,
      description:
        "Best for individual tutors just starting with small batches of students.",
      features: [
        "Manage up to 20 students",
        "Track monthly fee payments",
        "Send WhatsApp reminders",
      ],
      buttonText: "Get Started",
    },
    {
      type: "pro",
      studentLimit: null,
      durationDays: 30,
      title: "Pro",
      price: 199,
      description:
        "Perfect for coaching centers managing multiple teachers and larger student groups.",
      features: [
        "Unlimited students",
        "Auto payment tracking",
        "WhatsApp & SMS reminders",
        "Dashboard & reports",
        "Priority support",
      ],
      buttonText: "Upgrade to Pro",
      highlight: true,
    }
  ];

  try {
    const createdPlans = [];

    for (const planData of plans) {
      const exist = await Plan.findOne({ type: planData.type });
      if (!exist) {
        const created = await Plan.create(planData);
        createdPlans.push(created);
      }
    }

    const allPlans = await Plan.find();

    res.status(200).json({
      message: "Plans ensured in database",
      plans: allPlans,
      newlyCreated: createdPlans,
    });
  } catch (error) {
    console.error("Error creating plans:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

planRouter.get("/", async (req: Request, res: Response) => {
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


planRouter.get("/:id", async (req: Request, res: Response) => {
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


planRouter.put("/:id", async (req: Request, res: Response) => {
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

planRouter.delete("/:id", async (req: Request, res: Response) => {
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

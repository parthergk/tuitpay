import express, { Request, Response, Router } from "express";
import { UserSchema } from "@repo/validation";

const userRouter: express.Router = Router();

userRouter.post("/user", async (req: Request, res: Response) => {
  const body = req.body;

  const parsedBody = UserSchema.safeParse(body);

  if (!parsedBody.success) {
    res
      .status(400)
      .json({ message: "Invalid Inputs", errors: parsedBody.error.flatten() });
    return;
  }
});

export default userRouter;

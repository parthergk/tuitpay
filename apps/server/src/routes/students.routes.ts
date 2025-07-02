import { Router } from "express";
import { verifyJwt } from "../middleware/verifyJwt";

const studentRouter: Router = Router();

studentRouter.get("/", verifyJwt, (req, res) => {
  res.send("Hello");
});

export default studentRouter;

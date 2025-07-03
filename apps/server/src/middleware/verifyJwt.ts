import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export function verifyJwt(req: Request, res: Response, next: NextFunction) {
  const token =
    req.cookies["next-auth.session-token"] ||
    req.cookies["__Secure-next-auth.session-token"];
    
  if (!token) {
    res.status(400).json({ message: "Not authenticated" });
    return;
  }

  try {
    const secret = process.env.NEXTAUTH_SECRET!;

    const decoded = jwt.verify(token, secret) as JwtPayload;

    if (decoded) {
      req.user = {
        id: decoded.id.toString(),
        email: decoded.email,
        plan: decoded.plan,
      };
      next();
      return;
    }

    res.status(401).json({ message: "Unauthorized" });
  } catch (err) {
    console.log("ERROR : ", err);
    res.status(401).json({ message: "Invalid token" });
    return;
  }
}

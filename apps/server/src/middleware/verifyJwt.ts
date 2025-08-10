import { NextFunction, Request, Response } from "express";
import { getToken } from "next-auth/jwt";

export async function verifyJwt(req: Request, res: Response, next: NextFunction):Promise<void> {
  try {
    const token = await getToken({
      req: { cookies: req.cookies, headers: req.headers } as any,
      secret: process.env.NEXTAUTH_SECRET,
    });

    if (!token) {
       res.status(401).json({ message: "Not authenticated" });
       return;
    }

    req.user = {
      id: token.id as string,
      email: token.email as string,
      plan: token.plan as string,
    };

    next();
  } catch (err) {
    console.error("ERROR: ", err);
    res.status(401).json({ message: "Invalid token" });
  }
}

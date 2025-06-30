import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      plan: string;
    };
  }

  interface User {
    id: string;
    plan: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    plan: string;
  }
}

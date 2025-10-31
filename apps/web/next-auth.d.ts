import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      plan: string;
      name: string;
      email: string;
      profileComplete: boolean;
    };
  }

  interface User {
    id: string;
    plan: string;
    name: string;
    email: string;
    profileComplete: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    plan: string;
    name: string;
    email: string;
    profileComplete: boolean;
  }
}

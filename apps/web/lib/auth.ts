import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectTodb, User } from "@repo/db";
import { bcryptjs } from "@repo/auth";
import { JWT } from "next-auth/jwt";
import jwt from "jsonwebtoken";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email@gmail.com" },
        password: { label: "Password", type: "password" },
      },

      // authorize function
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required");
        }

        try {
          await connectTodb();
          const user = await User.findOne({ email: credentials.email }).select(
            "+password"
          );

          if (!user) {
            throw new Error("No user found with this email");
          }

          const isValid = await bcryptjs.compare(
            credentials.password,
            user.password
          );

          if (!isValid) {
            throw new Error("Invalid Password");
          }

          return {
            id: user._id.toString(),
            email: user.email,
            plan: user.plan,
          };
        } catch (error) {
          console.error("Auth error", error);
          throw new Error("Authentication failed");
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.plan = user.plan;
      }
      return token;
    },

    async session({ session, token }) {
      ((session.user.id = token.id as string),
        (session.user.plan = token.plan as string));
      return session;
    },
  },

  pages: {
    signIn: "/login",
    error: "/login",
  },

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60,
  },
  jwt: {
  encode: async ({ token, secret }) => {
    return jwt.sign(token!, secret, { algorithm: "HS256" });
  },
  decode: async ({ token, secret }) => {
    return jwt.verify(token!, secret) as JWT;
  },
},

  secret: process.env.NEXTAUTH_SECRET,
};

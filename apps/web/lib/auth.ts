import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { connectTodb, User } from "@repo/db";
import { bcryptjs } from "@repo/auth";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email@gmail.com" },
        password: { label: "Password", type: "password" },
        token: { label: "Token", type: "text" },
      },

      // authorize function
      async authorize(credentials, req) {
        if (!credentials?.email) {
          throw new Error("Email is required");
        }

        try {
          await connectTodb();
          const user = await User.findOne({ email: credentials.email }).select(
            "+password"
          );

          if (!user) {
            throw new Error("No user found with this email");
          }

          if (credentials.token) {
            if (user.verificationToken !== credentials.token) {
              throw new Error("Invalid or expired token");
            }
            user.verificationToken = null;
            await user.save();
            return {
              id: user._id.toString(),
              email: user.email,
              name: user.name,
              plan: user.planType,
              profileComplete: user.profileComplete || false
            };
          }

          if (!credentials.password) {
            throw new Error("Password is required");
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
            name: user.name,
            plan: user.planType,
            profileComplete: user.profileComplete || false
          };
        } catch (error) {
          const errorMsg =
            error instanceof Error ? error.message : "Authentication failed";
          console.error("Auth error", error);
          throw new Error(errorMsg || "Authentication failed");
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        if (account?.provider === "google") {
          await connectTodb();
          const existingUser = await User.findOne({ email: user.email });

          if (!existingUser) {
            const newUser = await User.create({
              email: user.email,
              isVerified: true,
              profileComplete: false
            });
            user.id = newUser._id.toString();
            user.profileComplete = newUser.profileComplete;
            user.plan = newUser.planType;
          } else {
            user.id = existingUser._id.toString();
            user.name = existingUser.name;
            user.email = existingUser.email;
            user.plan = existingUser.planType;
            user.profileComplete = existingUser.profileComplete;
          }
        }

        return true;
      } catch (error) {
        console.error("Google sign-in error:", error);
        return false;
      }
    },
    
    async jwt({ token, user, trigger }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.plan = user.plan;
        token.email = user.email;
        token.profileComplete = user.profileComplete;
      }

      if (trigger === "update") {
        const upUser = await User.findById(token.id);
        if (upUser) {
          token.plan = upUser.planType;
          token.profileComplete = upUser.profileComplete;
        }
      }

      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.name = token.name as string;
      session.user.plan = token.plan as string;
      session.user.email = token.email as string;
      session.user.profileComplete = token.profileComplete as boolean
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
  // jwt: {
  //   encode: async ({ token, secret }) => {
  //     return jwt.sign(token!, secret, { algorithm: "HS256" });
  //   },
  //   decode: async ({ token, secret }) => {
  //     return jwt.verify(token!, secret) as JWT;
  //   },
  // },

  secret: process.env.NEXTAUTH_SECRET,
};

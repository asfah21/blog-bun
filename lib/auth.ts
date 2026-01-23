// lib/auth.ts
// import { PrismaClient, Role } from "@prisma/client"; // You no longer need PrismaClient here
// import { Role } from "@prisma/client"; // Only import Role if you're using it (which you are)
import bcrypt from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { consolePino } from "./logger";

import prisma from "@/lib/prisma"; // <--- IMPORT THE GLOBAL PRISMA CLIENT HERE

// Define Role as string since it's not an enum in schema
export type Role = string;

declare module "next-auth" {
  interface User {
    id: string;
    role: Role;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string | null;
      role: Role;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: Role;
    email?: string;
    name?: string | null;
  }
}

declare global {
  var loginRateLimit: Map<string, { attempts: number; blockExpires: number }> | undefined;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Please enter email and password");
        }

        const email = credentials.email.toLowerCase();

        // 1. Check Rate Limit
        const now = Date.now();
        const rateLimitRecord = globalThis.loginRateLimit?.get(email);

        if (rateLimitRecord) {
          if (rateLimitRecord.blockExpires > now) {
            const remainingMinutes = Math.ceil(
              (rateLimitRecord.blockExpires - now) / 60000,
            );
            throw new Error(
              `Terlalu banyak percobaan. Coba lagi dalam ${remainingMinutes} menit.`,
            );
          }
          // Reset usage if block time has passed
          if (rateLimitRecord.blockExpires > 0 && rateLimitRecord.blockExpires <= now) {
            globalThis.loginRateLimit?.delete(email);
          }
        }

        try {
          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user || !user.password) {
            // Increment failure count
            if (!globalThis.loginRateLimit) globalThis.loginRateLimit = new Map();
            const record = globalThis.loginRateLimit.get(email) || { attempts: 0, blockExpires: 0 };
            record.attempts += 1;

            if (record.attempts >= 5) {
              record.blockExpires = now + 15 * 60 * 1000; // 15 mins
            }
            globalThis.loginRateLimit.set(email, record);

            throw new Error("Email atau password salah");
          }

          const isValid = await bcrypt.compare(
            credentials.password,
            user.password,
          );

          if (!isValid) {
            // Increment failure count
            if (!globalThis.loginRateLimit) globalThis.loginRateLimit = new Map();
            const record = globalThis.loginRateLimit.get(email) || { attempts: 0, blockExpires: 0 };
            record.attempts += 1;

            if (record.attempts >= 5) {
              record.blockExpires = now + 15 * 60 * 1000; // 15 mins
            }
            globalThis.loginRateLimit.set(email, record);

            throw new Error("Email atau password salah");
          }

          // Success: Clear rate limit
          globalThis.loginRateLimit?.delete(email);

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error: any) {
          // Rethrow known errors
          if (error.message.includes("Terlalu banyak") || error.message.includes("Email atau password")) {
            throw error;
          }
          consolePino.error("Auth error:", error);
          throw new Error("Database connection error. Please try again.");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.email = (user as any).email as string | undefined;
        token.name = (user as any).name as string | null | undefined;

        // Update lastActive saat login
        await prisma.user.update({
          where: { id: user.id },
          data: { lastActive: new Date() },
        });
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id,
          email: token.email!,
          name: token.name ?? null,
          role: token.role,
        };
      }

      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 60 * 60,
    updateAge: 12 * 60 * 60,
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    signOut: "/",
  },
  debug: process.env.NODE_ENV === "development",
};

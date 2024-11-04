import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@prisma/client";
import Github from "next-auth/providers/github";

const githubId = process.env.NODE_ENV !== "production" ?  process.env.GITHUB_ID_DEV : process.env.GITHUB_ID; 
const githubSecret = process.env.NODE_ENV !== "production" ?  process.env.GITHUB_SECRET_DEV : process.env.GITHUB_SECRET;

if(!githubId || !githubSecret) {
  throw new Error("GITHUB_ID and GITHUB_SECRET environment variables are required");
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !(await compare(credentials.password, user.password))) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          randomKey: "Some random Key",
        };
      },
    }),
    Github({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }
    )
  ],
  callbacks: {
    session: ({ session, token }) => {
      console.log("Session Callback", { session, token });
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          randomKey: token.randomKey,
        },
      };
    },
    jwt: ({ token, user }) => {
      console.log("JWT Callback", { token, user });
      if (user) {
        const u = user as User;
        return {
          ...token,
          id: u.id,
        };
      }
      return token;
    },
  },
};
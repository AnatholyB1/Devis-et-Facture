import NextAuth from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import Github from "next-auth/providers/github"
import Prisma from "./prisma"

const githubId =  process.env.NODE_ENV !== "production" ? process.env.GITHUB_ID_DEV : process.env.GITHUB_ID,
const githubSecret = process.env.NODE_ENV !== "production" ? process.env.GITHUB_SECRET_DEV : process.env.GITHUB_SECRET,

if(!githubId || !githubSecret) {
  throw new Error("GITHUB_ID and GITHUB_SECRET must be set in .env.local")
}



export const {handlers, auth  } =  NextAuth(
  {
    providers: [
      {
        id: "github",
        name: "GitHub",
        type: Github,
        clientId: githubId,
        clientSecret: githubSecret,
      },
    ],
    adapter: PrismaAdapter(Prisma),
    callbacks: {
      session({ session }) {
        return session // The return type will match the one returned in `useSession()`
      },
    },
  }
)
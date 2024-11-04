import NextAuth from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import Github from "next-auth/providers/github"
import Prisma from "./prisma"



export const {handlers, auth  } =  NextAuth(
  {
    providers: [
      {
        id: "github",
        name: "GitHub",
        type: Github,
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      },
    ],
    adapter: PrismaAdapter(Prisma),
  }
)
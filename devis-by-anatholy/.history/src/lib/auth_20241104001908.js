import NextAuth from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import Prisma from "./prisma"



export const {handler, auth  } =  NextAuth(
  {
    adapter: PrismaAdapter(Prisma),
  }
)
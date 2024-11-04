import NextAuth from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import Prisma from "./prisma"


export const authOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(Prisma),
 
}

export default NextAuth(authOptions)
import NextAuth from "next-auth"
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import Prisma from "../../../../src/lib/prisma"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    PrismaAdapter(Prisma)
    // ...add more providers here
  ],
 
}

export default NextAuth(authOptions)
import { prisma } from "@/lib/prisma";
import { compare } from "bcrypt";
import type { NextAuthOptions, Profile } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "@prisma/client";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";

const githubId = process.env.NODE_ENV !== "production" ?  process.env.GITHUB_ID_DEV : process.env.GITHUB_ID; 
const githubSecret = process.env.NODE_ENV !== "production" ?  process.env.GITHUB_SECRET_DEV : process.env.GITHUB_SECRET;

if(!githubId || !githubSecret) {
  throw new Error("GITHUB_ID and GITHUB_SECRET environment variables are required");
}

const googleId = process.env.GOOGLE_ID;
const googleSecret = process.env.GOOGLE_SECRET;

if(!googleId || !googleSecret) {
  throw new Error("GOOGLE_ID and GOOGLE_SECRET environment variables are required");
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
      clientId: githubId,
      clientSecret: githubSecret,
    }
    ),
    Google({
      clientId: googleId,
      clientSecret: googleSecret,  
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
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
      if (user) {
        const u = user as User;
        return {
          ...token,
          id: u.id,
        };
      }
      return token;
    },
    async signIn({ user, account, profile }) {
      console.log(account)
      if (account?.provider === "google" || account?.provider === "github") {
        return true;
      }
      
      console.log(' provider checked')

      if(!user.email) {
        return true;
      }

      console.log('email checked')

      const checkUser  = await prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });

      if (checkUser) {
        return true;
      }

      console.log('user checked')

      //make profile herit User interace
      interface NewProfile extends Profile {
        email_verified: boolean;
        given_name: string;
        picture: string;
      }

      if(!profile) {
        return false;
      }

      console.log('profile checked')

      const newProfile = profile as NewProfile;

      try{
        await prisma.user.create({
          data: {
            email: user.email,
            name: user.name,
            password: "",
            role: "USER",
            emailVerified: newProfile.email_verified ? new Date() : null,
            prenom: newProfile.given_name,
            telephone: "0000000000",
            adresse: "aucune",
            ville: "aucune",
            codePostal: "aucun",
            Siret: "00000000000000",
            NomSociete: "aucune",
            image: newProfile.picture,
          },
        });

        console.log('user created')
      }
      catch(e) {
        console.error(e);
        return false;
      }


      

      return true;
    },
  },
};
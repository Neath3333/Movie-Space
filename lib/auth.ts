import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import prisma from "./prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
        name: "Credentials",
        credentials:{
            email: {label: "Email", type: "email", placeholder: "Enter your email"},
            password: {label: "Password", type: "password", placeholder: "Enter your password"},
        },
        async authorize(credentials){
            const user = await prisma.user.findUnique({
                where: {email: credentials.email as string  },

            });
            if(!user|| !user.password) return null;
            const isValid = await bcrypt.compare(credentials.password as string , user.password);
            }

            })
        }
  ],
    })
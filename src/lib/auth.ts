import NextAuth, { AuthError, CredentialsSignin } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { signInFormSchema } from "@/types/index";
import { z } from "zod";
import { getUserDetails } from "@/actions/auth.action";
import prisma from "./db";
 
class CustomAuthError extends CredentialsSignin {
  code = "Something went wrong while authenticating";
  // write a constructor to accept the error message
  constructor(message?: string) {
    super(message);
    if (message) {
      this.code = message;
    }
  }
}
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    CredentialsProvider({
      credentials: { email: { type: "email" }, password: { type: "password" } },
      authorize: async (credentials) => {
        console.log("credentials", credentials);
 
        // const validationResult = signInFormSchema.safeParse(credentials); // validate the credentials (TODO)
        const dbUser = await prisma.user.findUnique({
          where: {
            email: `${credentials.email}`,
          },
        });
        console.log("user", dbUser);
 
        if (!dbUser) {
          throw new CustomAuthError("No such email found");
        }
 
        if (dbUser.password !== credentials.password) {
          throw new CustomAuthError("Password is incorrect");
        }
 
        const user = {
          id: dbUser.id.toString(),
          email: dbUser.email,
        };
        return user;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // used when session in server is created
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = token.sub as string;
      }
      return token;
    },
    // used when client useSession is called
    session: async ({ session, token, user }) => {
      if (session?.user) {
        session.user.id = token.id as string;
      }
      // console.log("🛠🛠🛠session callback sesssion", session);
      // console.log("🛠🛠🛠session callback token ", token);
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
});
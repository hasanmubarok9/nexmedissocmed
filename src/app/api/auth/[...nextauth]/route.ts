import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import type { NextAuthOptions } from "next-auth";

// Extend the Session type
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    }
  }
}

export const authOptions: NextAuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    session: {
        strategy: "jwt" as const,
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    debug: true,
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({ token, user }: { token: JWT, user: any }) {
            console.log("JWT callback - token:", token, "user:", user);
            if (user) {
                token.accessToken = user.accessToken;
                // Add user ID to token
                token.userId = user.id;
            }
            return token;
        },
        async session({ session, token }: { session: Session, token: JWT }) {
            console.log("Session callback - session:", session, "token:", token);
            session.accessToken = token.accessToken as string;
            // Add user ID to session for client access
            session.user = {
                ...session.user,
                id: token.userId as string
            };
            return session;
        }
    },
    pages: {
        signIn: "/signin",
        newUser: "/signup",
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
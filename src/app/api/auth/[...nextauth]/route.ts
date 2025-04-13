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
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                try {
                    console.log("Authorize function called with credentials:", credentials);
                    console.log("API URL:", `${process.env.NEXT_PUBLIC_API_URL}/auth/signin`);
                    
                    // Log request payload
                    const requestPayload = {
                        email: credentials?.email,
                        password: credentials?.password,
                    };
                    console.log("Request payload:", requestPayload);
                    
                    // Call your auth API endpoint here
                    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signin`, {
                        method: "POST",
                        body: JSON.stringify(requestPayload),
                        headers: { "Content-Type": "application/json" }
                    });
                    
                    console.log("Response status:", res.status);
                    
                    const data = await res.json();
                    console.log("API response data:", data);
                    
                    if (res.ok && data) {
                        // Format user object correctly for NextAuth
                        return {
                            id: data.user.id.toString(),
                            name: data.user.name,
                            email: data.user.email,
                            image: data.user.image,
                            accessToken: data.accessToken
                        };
                    }
                    
                    console.log("Authorization failed: res.ok =", res.ok);
                    return null;
                } catch (error) {
                    console.error("Auth error:", error);
                    return null;
                }
            }
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
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
    providers: [
        GoogleProvider({
            // clientId: process.env.GOOGLE_CLIENT_ID,
            // clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            clientId: "1049941323581-aqtk1lk5qah22bhopdqupkcnnj7fbib9.apps.googleusercontent.com",
            clientSecret: "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",
        }),
    ],
};

export default NextAuth(authOptions);


import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import DiscordProvider from "next-auth/providers/discord"
import { signOut } from "next-auth/react";

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId:process.env.GOOGLE_ID as string,
            clientSecret:process.env.GOOGLE_SECRET as string
        }),
        DiscordProvider({
            clientId:process.env.DISCORD_ID as string,
            clientSecret:process.env.DISCORD_SECRET as string,
        })
    ],
    pages: {
        signIn:'auth/signin',
    },
    secret: process.env.NEXTAUTH_SECRET,
   
}

export const handler = NextAuth(authOptions);
export {handler as GET, handler as POST}
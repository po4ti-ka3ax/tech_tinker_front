import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google"
import DiscrodProvider from "next-auth/providers/discord"

export const authOptions = {
    providers: [
        GoogleProvider({
            clientId:process.env.GOOGLE_ID as string,
            clientSecret:process.env.GOOGLE_SECRET as string
        }),
        DiscrodProvider({
            clientId:process.env.DISCORD_ID as string,
            clientSecret:process.env.DISCORD_SECRET as string,
        })
    ],
    secret: process.env.NEXTAUTH_SECRET
}

export const handler = NextAuth(authOptions);
export {handler as GET, handler as POST}
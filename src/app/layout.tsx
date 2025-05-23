
import type { Metadata } from "next";
import { Geist, Geist_Mono, K2D } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "./components/auth/SessionProviders"
import Link from "next/link";
import Image from "next/image";
import Header from "./components/header/page";

const k2d = K2D({
  weight: ["100","400", "500", "600", "700"],
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Tech Tinker",
  description: "All for you PC",
  icons: {
    icon: '/favicon.ico'
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en" className="bg-[#1A1A1A]">
      <body
        className={`${k2d.className} antialiased` } 
      >
        <head>

        </head>
        <SessionProvider session={session}>
          <div className="bg-[#1A1A1A] min-h-screen text-[white] py-[20px]">
            <Header/>
            <div className="max-w-[1200px]  m-auto md:max-w-[900px] px-[20px]">
              {children}
            </div>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}

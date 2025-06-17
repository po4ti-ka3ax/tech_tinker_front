
import type { Metadata } from "next";
import { Geist, Geist_Mono, K2D } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import SessionProvider from "./components/auth/SessionProviders"
import Link from "next/link";
import Image from "next/image";
import Header from "./components/header/page";
import Footer from "./components/footer/page";
import { useTranslation } from "react-i18next";
import FontWrapper from "./wrapper/FontWrapper";
import { initI18next } from "@/lib/i18n/server";
const k2d = K2D({
  weight: ["100", "400", "500", "600", "700"],
  subsets: ["latin"]
});
// const fira_sans = Fira_Sans({
//   weight: ["100", "400", "500", "600", "700"],
//   subsets: ["latin"]
// });



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
   const i18n = await initI18next('en'); 
  const t = i18n.getFixedT('en', 'common');
  // const { i18n } = useTranslation();
  // const currentLang = i18n.language;
  const session = await getServerSession();
  
  // const fontClass =
  //   currentLang === "ru" || currentLang === "kk"
  //     ? fira_sans.className
  //     : k2d.className;
  return (
    <html lang="en" className="bg-[#1A1A1A]">
      <body className={`${k2d.className} antialiased`}>
        {/* <FontWrapper> */}
        <SessionProvider session={session}>
          <div className="min-h-screen flex pt-5 flex-col bg-[#1A1A1A] text-white">
            <Header />
            <main className="flex-grow mx-auto max-w-[1400px] w-full px-5">
              {children}
            </main>
              <Footer />
          </div>

        </SessionProvider>
        {/* </FontWrapper> */}
      </body>
    </html>
  );
}


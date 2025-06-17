"use client"

import { useTranslation } from "react-i18next";
import { Fira_Sans, K2D } from "next/font/google";

const k2d = K2D({
  weight: ["100", "400", "500", "600", "700"],
  subsets: ["latin"]
});

const fira_sans = Fira_Sans({
  weight: ["100", "400", "500", "600", "700"],
  subsets: ["cyrillic"]
});

export default function FontWrapper({ children }: { children: React.ReactNode }) {
  const { i18n } = useTranslation();

  const fontClass =
    i18n.language === "ru" || i18n.language === "kk"
      ? fira_sans.className
      : k2d.className;

  return <div className={fontClass}>{children}</div>;
}

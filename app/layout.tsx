import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "NONEP",
  description:
    "NONEP is a global creative label — a place where producers gather, voices take shape, and sound becomes story.",
  verification: {
    google: "Df9XQjUrDtzKjIMrq15yZf6dm4N9NQtcoSptLBiW5uc",
    // 아래 네이버 코드를 추가했습니다
    other: {
      "naver-site-verification": "e68ef463557e0626c908eb2c4d74c7f7f334efe1",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-black text-white antialiased">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
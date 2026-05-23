import type { Metadata } from "next";
import "./globals.css";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title: "NONEP",
  description:
    "NONEP is a global creative label — a place where producers gather, voices take shape, and sound becomes story.",
  // 아래 항목을 추가했습니다
  verification: {
    google: "Df9XQjUrDtzKjIMrq15yZf6dm4N9NQtcoSptLBiW5uc",
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
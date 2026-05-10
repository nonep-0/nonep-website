import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "없는마케팅",
  description:
    "브랜드에 없는 이야기를 만들고, 스토리로 팔리게 하는 전략적 마케팅 대행사",
  verification: {
    google: "구글_인증키는_기존에_넣으셨던거_그대로_유지해주세요", 
    other: {
      // 멍님이 주신 네이버 키값을 정확히 넣었습니다!
      "naver-site-verification": "c32718b8ad8d4d6eab1531295152320e0c4c2a80",
      "google-site-verification": "E-Oo41Bgl3cCtgNSe8jesZPbty44VPlkG8EXHxlOaQo",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko" // 한국어 사이트이므로 en에서 ko로 변경해드렸습니다.
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
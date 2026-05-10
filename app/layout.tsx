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
  // 검색 엔진 소유권 인증 추가
  verification: {
    google: "구글_인증_문자열", // 구글 content="이부분" 복사해서 넣기
    other: {
      "naver-site-verification": "네이버_인증_문자열", // 네이버 content="이부분" 복사해서 넣기
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
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const navItems = [
  { href: "/about", label: "없는마케팅이란?" },
  { href: "/service", label: "서비스 소개" },
  { href: "/contact", label: "문의하기" },
];

export default function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const forcedNavColor = isScrolled ? "#020617" : "#ffffff";

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "border-b border-slate-200 bg-white shadow-[0_6px_20px_rgba(15,23,42,0.06)]"
          : "border-b border-white/10 bg-black/35 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-[62px] max-w-[1180px] items-center justify-between px-6">
        <Link href="/" className="flex items-center">
          <img
            src={isScrolled ? "/logo/symbol-black.png" : "/logo/symbol.png"}
            alt="없는마케팅"
            className="h-[22px] w-auto object-contain"
          />
        </Link>

        <nav className="hidden items-center gap-12 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{ color: forcedNavColor }}
              className="text-[11px] font-semibold tracking-[-0.02em] transition-opacity duration-200 hover:opacity-70"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contact"
          style={{
            color: forcedNavColor,
            borderColor: isScrolled ? "#e2e8f0" : "rgba(255,255,255,0.25)",
          }}
          className="rounded-full border px-4 py-2 text-sm font-medium transition md:hidden"
        >
          문의
        </Link>
      </div>
    </header>
  );
}

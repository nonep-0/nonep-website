"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/", label: "HOME" },
  { href: "/albums", label: "ALBUMS" },
  { href: "/producers", label: "PRODUCERS" },
  { href: "/directors", label: "DIRECTORS" },
  { href: "/contact", label: "CONTACT" },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full overflow-hidden border-b transition-all duration-300 ${
        isScrolled
          ? "border-[#ff1493]/30 bg-black/95 shadow-[0_10px_35px_rgba(255,20,147,0.16)] backdrop-blur-xl"
          : "border-[#ff1493]/25 bg-black/92 backdrop-blur-md"
      }`}
    >
      <div className="pointer-events-none absolute bottom-0 left-0 h-[1px] w-full overflow-hidden">
        <span className="absolute left-[-35%] top-0 h-full w-[35%] animate-[nonepLaser_3.2s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-[#ff1493] to-transparent shadow-[0_0_14px_#ff1493]" />
      </div>

      <div className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between px-6 md:px-8">
        <Link href="/" className="flex items-center gap-4">
          <img
            src="/logo/nonep%20logo.png"
            alt="NONEP Logo"
            className="h-[50px] w-[50px] rounded-[10px] object-cover"
          />

          <span
            style={{ color: "#ffffff" }}
            className="text-[27px] font-black uppercase leading-none tracking-[0.14em]"
          >
            NONEP
          </span>
        </Link>

        <nav className="hidden items-center gap-11 md:flex">
          {navItems.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  color: active ? "#ff1493" : "#ffffff",
                }}
                className="relative py-2 text-[12px] font-black uppercase tracking-[0.08em] opacity-100 transition duration-200 hover:text-[#ff1493]"
              >
                {item.label}

                <span
                  className={`absolute bottom-0 left-0 h-[2px] rounded-full bg-[#ff1493] shadow-[0_0_14px_rgba(255,20,147,0.9)] transition-all duration-200 ${
                    active ? "w-full opacity-100" : "w-0 opacity-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          aria-label="Toggle navigation menu"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[#ff1493]/50 bg-black/50 text-[#ff1493] shadow-[0_0_18px_rgba(255,20,147,0.18)] md:hidden"
        >
          <span className="relative block h-[14px] w-[18px]">
            <span
              className={`absolute left-0 top-0 h-[2px] w-full rounded-full bg-current transition ${
                isMenuOpen ? "translate-y-[6px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute left-0 top-[6px] h-[2px] w-full rounded-full bg-current transition ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 top-[12px] h-[2px] w-full rounded-full bg-current transition ${
                isMenuOpen ? "-translate-y-[6px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>
      </div>

      <div
        className={`overflow-hidden border-t border-[#ff1493]/20 bg-black/98 transition-all duration-300 md:hidden ${
          isMenuOpen ? "max-h-[320px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="mx-auto flex max-w-[1280px] flex-col px-6 py-4">
          {navItems.map((item) => {
            const active = isActive(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  color: active ? "#ff1493" : "#ffffff",
                }}
                className="border-b border-white/10 py-4 text-[13px] font-black uppercase tracking-[0.12em] transition last:border-b-0"
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>

      <style jsx>{`
        @keyframes nonepLaser {
          0% {
            transform: translateX(0);
            opacity: 0;
          }

          12% {
            opacity: 1;
          }

          50% {
            opacity: 1;
          }

          100% {
            transform: translateX(385%);
            opacity: 0;
          }
        }
      `}</style>
    </header>
  );
}
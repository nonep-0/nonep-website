"use client";

import Link from "next/link";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <rect
        x="3.5"
        y="3.5"
        width="17"
        height="17"
        rx="4"
        stroke="currentColor"
        strokeWidth="1.8"
      />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.4" cy="6.7" r="1" fill="currentColor" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
      <path
        d="M21 8.5C20.8 7.4 19.9 6.5 18.8 6.3C17.2 6 12 6 12 6C12 6 6.8 6 5.2 6.3C4.1 6.5 3.2 7.4 3 8.5C2.7 10.1 2.7 12 2.7 12C2.7 12 2.7 13.9 3 15.5C3.2 16.6 4.1 17.5 5.2 17.7C6.8 18 12 18 12 18C12 18 17.2 18 18.8 17.7C19.9 17.5 20.8 16.6 21 15.5C21.3 13.9 21.3 12 21.3 12C21.3 12 21.3 10.1 21 8.5Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="M10 9.5L15 12L10 14.5V9.5Z" fill="currentColor" />
    </svg>
  );
}

export default function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-[#ff1493]/20 bg-black px-6 py-8 text-white md:py-9">
      <div className="pointer-events-none absolute left-0 top-0 h-[1px] w-full overflow-hidden">
        <span className="absolute left-[-35%] top-0 h-full w-[35%] animate-[nonepFooterLaser_3.2s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-[#ff1493] to-transparent shadow-[0_0_14px_#ff1493]" />
      </div>

      <div className="mx-auto max-w-[1040px]">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
          <div className="space-y-1.5">
            <p className="text-[12px] font-semibold tracking-[-0.02em] text-white/86">
              CEO Minyoung Lee | Business Registration No. 570-22-01285
            </p>

            <p className="text-[12px] font-medium tracking-[-0.02em] text-white/72">
              Business Inquiry:{" "}
              <a
                href="mailto:contact@nonep.co.kr"
                className="transition hover:text-[#ff1493]"
              >
                contact@nonep.co.kr
              </a>
            </p>

            <p className="text-[12px] font-medium tracking-[-0.02em] text-white/72">
              105-7 Magokjungang-ro, Gangseo-gu, Seoul
            </p>

            <p className="text-[12px] font-medium tracking-[-0.02em] text-white/72">
              K-Square Tower 1, 2F, Room 202
            </p>
          </div>

          <div className="md:text-right">
            <div className="flex flex-col gap-1.5 text-[12px] font-medium leading-[1.7] text-white/68">
              <Link href="/terms" className="transition hover:text-[#ff1493]">
                Terms of Use
              </Link>

              <Link href="/privacy" className="transition hover:text-[#ff1493]">
                Privacy Policy
              </Link>

              <Link href="/legal" className="transition hover:text-[#ff1493]">
                Legal Notice
              </Link>

              <Link
                href="/unsubscribe"
                className="transition hover:text-[#ff1493]"
              >
                Email Collection Refusal
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-white/16 pt-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-[11.5px] font-medium tracking-[-0.02em] text-white/52">
              © 2026 nonep. All rights reserved.
            </p>

            <div className="flex items-center gap-4 text-white/55">
              <a
                href="https://www.instagram.com/upneun/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="transition hover:text-[#ff1493]"
              >
                <InstagramIcon />
              </a>

              <a
                href="https://www.youtube.com/@%EC%97%86%EB%8A%94%EB%A7%88%EC%BC%80%ED%8C%85"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="transition hover:text-[#ff1493]"
              >
                <YouTubeIcon />
              </a>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes nonepFooterLaser {
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
    </footer>
  );
}
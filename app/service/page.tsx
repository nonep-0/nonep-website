"use client";

import SiteFooter from "@/components/SiteFooter";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import SiteHeader from "@/components/SiteHeader";

function useCountUp(target: number, duration = 1600) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement | null>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;

        started.current = true;
        const start = performance.now();

        const animate = (now: number) => {
          const progress = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          setCount(Math.floor(target * ease));

          if (progress < 1) {
            requestAnimationFrame(animate);
          }
        };

        requestAnimationFrame(animate);
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return { count, ref };
}

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M5 12H19M19 12L13 6M19 12L13 18"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function RingTargetIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function CompassIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path
        d="M14.8 9.2L13.1 13.1L9.2 14.8L10.9 10.9L14.8 9.2Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CheckCircleIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path
        d="M8 12.3L10.7 15L16 9.7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MagnifierIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="2" />
      <path
        d="M16 16L20 20"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function StructureIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="10" y="3" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="2" />
      <rect x="3" y="17" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="2" />
      <rect x="10" y="17" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="2" />
      <rect x="17" y="17" width="4" height="4" rx="1" stroke="currentColor" strokeWidth="2" />
      <path d="M12 7V12M12 12H5M12 12H19" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

function SendIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M21 3L10 14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M21 3L14 21L10 14L3 10L21 3Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HandshakeIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M9.5 12.5L11.3 14.3C12.1 15.1 13.4 15.1 14.2 14.3L18 10.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M3 12L6.5 8.5C7.3 7.7 8.6 7.7 9.4 8.5L12 11.1"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M21 12L17.5 8.5C16.7 7.7 15.4 7.7 14.6 8.5L12.8 10.3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path d="M3 12L5 14M21 12L19 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ClipboardIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="6" y="5" width="12" height="16" rx="2" stroke="currentColor" strokeWidth="2" />
      <rect x="9" y="3" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="2" />
      <path d="M9 11H15M9 15H13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function MonitorIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="4" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
      <path d="M8 20H16M12 16V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M8 11L11 8L15 12"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MegaphoneIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M4 13V11C4 9.9 4.9 9 6 9H8L15.5 5V19L8 15H6C4.9 15 4 14.1 4 13Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M18 9C19.3 10 20 11 20 12C20 13 19.3 14 18 15"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 text-[12px] font-black uppercase tracking-[0.28em] text-[#1368ff]">
      {children}
    </p>
  );
}

function StatCard({
  value,
  label,
  duration,
}: {
  value: number;
  label: string;
  duration?: number;
}) {
  const { count, ref } = useCountUp(value, duration);

  return (
    <div
      ref={ref}
      className="rounded-[24px] border border-slate-200 bg-white px-7 py-7 shadow-[0_18px_50px_rgba(15,23,42,0.06)]"
    >
      <div className="mb-4 h-1.5 w-1.5 rounded-full bg-[#1368ff]" />
      <p className="text-[30px] font-black leading-none tracking-[-0.06em] text-[#08111f] sm:text-[34px]">
        {count.toLocaleString()}
        <span className="text-[#1368ff]">만+</span>
      </p>
      <p className="mt-3 text-[14px] font-semibold tracking-[-0.04em] text-slate-500">
        {label}
      </p>
    </div>
  );
}

function StructureCard({
  icon,
  label,
  title,
  children,
}: {
  icon: ReactNode;
  label: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white px-8 py-9 text-center shadow-[0_18px_55px_rgba(15,23,42,0.06)] transition duration-300 hover:-translate-y-1">
      <div className="mx-auto mb-7 flex h-[100px] w-[100px] items-center justify-center rounded-full bg-white shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
        <div className="h-10 w-10 text-[#1368ff]">{icon}</div>
      </div>

      <p className="text-[14px] font-black uppercase tracking-[0.12em] text-[#1368ff]">
        {label}
      </p>

      <div className="mx-auto my-7 h-1.5 w-1.5 rounded-full bg-[#1368ff]" />

      <h3 className="mb-5 text-[24px] font-black tracking-[-0.06em] text-[#08111f]">
        {title}
      </h3>

      <div className="space-y-2 text-[15px] font-medium leading-[1.8] tracking-[-0.04em] text-slate-600">
        {children}
      </div>
    </div>
  );
}

function StepSummaryCard({
  icon,
  step,
  eng,
  title,
  children,
}: {
  icon: ReactNode;
  step: string;
  eng: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="rounded-[24px] border border-slate-200 bg-white px-7 py-9 text-center shadow-[0_18px_50px_rgba(15,23,42,0.06)]">
      <div className="mx-auto mb-6 flex h-[88px] w-[88px] items-center justify-center rounded-full bg-[#f2f7ff] text-[#1368ff]">
        <div className="h-10 w-10">{icon}</div>
      </div>

      <p className="text-[13px] font-semibold tracking-[-0.04em] text-slate-500">
        {step}
      </p>

      <p className="mt-1 text-[22px] font-black uppercase tracking-[-0.03em] text-[#1368ff]">
        {eng}
      </p>

      <h3 className="mt-4 text-[24px] font-black tracking-[-0.06em] text-[#08111f]">
        {title}
      </h3>

      <div className="mx-auto my-6 h-[2px] w-8 bg-[#1368ff]" />

      <div className="space-y-2 text-[15px] font-medium leading-[1.8] tracking-[-0.04em] text-slate-600">
        {children}
      </div>
    </div>
  );
}

function StepInfoBlock({
  icon,
  title,
  items,
}: {
  icon: ReactNode;
  title: string;
  items: string[];
}) {
  return (
    <div className="border-t border-slate-200 pt-7">
      <div className="mb-4 flex items-center gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#1368ff] text-[#1368ff]">
          <div className="h-4.5 w-4.5">{icon}</div>
        </div>

        <h3 className="text-[18px] font-black tracking-[-0.05em] text-[#08111f] md:text-[20px]">
          {title}
        </h3>
      </div>

      <ul className="space-y-2.5">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 text-[15px] font-medium leading-[1.75] tracking-[-0.04em] text-slate-600 md:text-[16px]"
          >
            <span className="mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#1368ff]" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StepGuideSection({
  step,
  title,
  description,
  image,
  reverse = false,
  purpose,
  direction,
  effect,
}: {
  step: string;
  title: string;
  description: string;
  image: string;
  reverse?: boolean;
  purpose: string[];
  direction: string[];
  effect: string[];
}) {
  return (
    <section className="bg-white py-18 md:py-20">
      <div className="mx-auto max-w-[1180px] px-5">
        <div
          className={`grid items-stretch gap-10 lg:grid-cols-2 lg:gap-14 ${
            reverse ? "lg:[&>*:first-child]:order-2 lg:[&>*:last-child]:order-1" : ""
          }`}
        >
          {/* TEXT */}
          <div className="flex min-h-[560px] flex-col justify-between rounded-[28px] bg-white">
            <div>
              <p className="mb-4 text-[18px] font-black uppercase tracking-[0.05em] text-[#1368ff] md:text-[20px]">
                {step}
              </p>

              <h2 className="text-[42px] font-black leading-[1.06] tracking-[-0.08em] text-[#08111f] md:text-[56px]">
                {title}
              </h2>

              <p className="mt-7 max-w-[560px] text-[18px] font-medium leading-[1.75] tracking-[-0.045em] text-[#172033] md:text-[19px]">
                {description}
              </p>

              <div className="mt-8 h-[3px] w-10 bg-[#1368ff]" />
            </div>

            <div className="mt-10 space-y-7">
              <StepInfoBlock
                icon={<RingTargetIcon className="h-full w-full" />}
                title="운영목적"
                items={purpose}
              />
              <StepInfoBlock
                icon={<CompassIcon className="h-full w-full" />}
                title="운영방향성"
                items={direction}
              />
              <StepInfoBlock
                icon={<CheckCircleIcon className="h-full w-full" />}
                title="기대효과"
                items={effect}
              />
            </div>
          </div>

          {/* IMAGE */}
          <div className="h-full">
            <div className="relative flex min-h-[560px] h-full items-center justify-center overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#fbfbfd_0%,#f1f3f7_100%)] p-8 shadow-[0_20px_60px_rgba(15,23,42,0.06)] md:p-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(19,104,255,0.06),transparent_30%)]" />
              <Image
                src={image}
                alt={title}
                width={1200}
                height={900}
                className="relative h-auto w-full max-w-[560px] object-contain"
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ServicePage() {
  return (
    <main className="min-h-screen bg-[#f6f7f9] text-[#08111f]">
      <SiteHeader />

      {/* HERO */}
      <section className="relative overflow-hidden bg-[#f6f7f9] pt-[54px]">
        <div className="absolute right-[-240px] top-[-240px] h-[620px] w-[620px] rounded-full border border-slate-200/70" />
        <div className="absolute right-[-140px] top-[-140px] h-[420px] w-[420px] rounded-full border border-slate-200/70" />

        <div className="mx-auto grid min-h-[760px] max-w-[1180px] items-center gap-14 px-5 py-24 lg:grid-cols-[1.05fr_0.95fr]">
          <div>

            <h1 className="text-[52px] font-black leading-[1.08] tracking-[-0.085em] text-[#08111f] md:text-[68px]">
              브랜드에 없는 이야기를 만들고,
              <br />
              <span className="text-[#1368ff]">스토리로 팔리게</span> 합니다.
            </h1>

            <p className="mt-8 max-w-[620px] text-[18px] font-medium leading-[1.75] tracking-[-0.05em] text-slate-600 md:text-[20px]">
              없는마케팅은 단순히 콘텐츠를 만드는 것이 아니라,
              <br />
              브랜드가 기억되고 선택되도록 이야기의 구조를 설계합니다.
            </p>

            <div className="mt-11 flex flex-wrap items-center gap-5">
              <Link
                href="/contact"
                className="group inline-flex h-[56px] min-w-[190px] items-center justify-center rounded-full bg-[#08111f] px-8 transition hover:bg-[#1368ff]"
              >
                <span className="text-[15px] font-black tracking-[-0.04em] text-white">
                  서비스 문의하기
                </span>
                <ArrowIcon className="ml-2 h-4 w-4 text-white transition group-hover:translate-x-1" />
              </Link>

              <Link
                href="#steps"
                className="text-[15px] font-bold tracking-[-0.04em] text-[#08111f] transition hover:text-[#1368ff]"
              >
                서비스 구조 보기
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <StatCard value={150} label="누적 구독자" duration={1500} />
            <StatCard value={1200} label="숏폼 최고 조회" duration={1900} />
            <StatCard value={400} label="롱폼 최고 조회" duration={1700} />
            <StatCard value={30} label="숏폼 리믹스 확산" duration={1400} />
          </div>
        </div>
      </section>

      {/* INTRO GRID */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-[1180px] px-5">
          <div className="mx-auto mb-14 max-w-[780px] text-center">
            <SectionLabel>없는마케팅 서비스</SectionLabel>

            <h2 className="text-[42px] font-black leading-[1.18] tracking-[-0.08em] text-[#08111f] md:text-[52px]">
              브랜드에 없는 이야기를 만들고,
              <br />
              <span className="text-[#1368ff]">스토리로 팔리게</span> 합니다.
            </h2>

            <p className="mt-6 text-[17px] font-medium leading-[1.75] tracking-[-0.05em] text-slate-600 md:text-[18px]">
              없는마케팅은 단순히 콘텐츠를 만드는 것이 아니라,
              <br />
              브랜드가 기억되고 선택되도록 이야기의 구조를 설계합니다.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <div className="overflow-hidden rounded-[22px] shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
              <Image
                src="/service/service-planning-desk.png"
                alt="브랜드 전략과 콘텐츠 구조를 설계하는 장면"
                width={900}
                height={540}
                className="h-full min-h-[300px] w-full object-cover"
              />
            </div>

            <div className="rounded-[22px] border border-slate-200 bg-white p-10 shadow-[0_18px_50px_rgba(15,23,42,0.05)] md:p-12">
              <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-full bg-[#1368ff] text-white">
                <MagnifierIcon className="h-6 w-6" />
              </div>

              <h3 className="text-[28px] font-black tracking-[-0.07em] text-[#08111f] md:text-[30px]">
                왜 스토리가 필요할까요?
              </h3>

              <div className="mt-5 h-[2px] w-12 bg-[#1368ff]" />

              <p className="mt-6 text-[17px] font-medium leading-[1.8] tracking-[-0.05em] text-slate-600 md:text-[18px]">
                사람들은 정보를 오래 기억하지 않습니다.
                <br />
                하지만 이야기에 맥락은 기억합니다.
                <br />
                그래서 브랜드는 단순한 홍보가 아니라,
                <br />
                기억에 남는 서사로 설계되어야 합니다.
              </p>
            </div>

            <div className="rounded-[22px] border border-slate-200 bg-white p-10 shadow-[0_18px_50px_rgba(15,23,42,0.05)] md:p-12">
              <div className="mb-7 flex h-14 w-14 items-center justify-center rounded-full bg-[#1368ff] text-white">
                <SendIcon className="h-6 w-6" />
              </div>

              <h3 className="text-[28px] font-black tracking-[-0.07em] text-[#08111f] md:text-[30px]">
                없는마케팅은 어떻게 시작할까요?
              </h3>

              <div className="mt-5 h-[2px] w-12 bg-[#1368ff]" />

              <p className="mt-6 text-[17px] font-medium leading-[1.8] tracking-[-0.05em] text-slate-600 md:text-[18px]">
                벤치마킹 분석부터 맞춤 대본,
                <br />
                촬영 · 편집 · 업로드, 그리고 채널 운영까지,
                <br />
                브랜드에 맞는 흐름을 만들고,
                <br />
                반복 가능한 구조로 연결합니다.
              </p>
            </div>

            <div className="overflow-hidden rounded-[22px] shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
              <Image
                src="/service/service-story-night.png"
                alt="브랜드의 방향성과 이야기를 바라보는 장면"
                width={900}
                height={540}
                className="h-full min-h-[300px] w-full object-cover"
              />
            </div>
          </div>

          <div className="mt-10 flex items-center justify-center gap-8">
            <div className="h-[1px] w-20 bg-[#1368ff]" />
            <p className="text-center text-[16px] font-medium tracking-[-0.05em] text-slate-600">
              콘텐츠를 만드는 것이 아니라, 브랜드가 남는 방식을 설계합니다.
            </p>
            <div className="h-[1px] w-20 bg-[#1368ff]" />
          </div>
        </div>
      </section>

      {/* STRUCTURE */}
      <section className="bg-[#f6f7f9] py-24">
        <div className="mx-auto max-w-[1180px] px-5">
          <div className="mx-auto mb-14 max-w-[850px] text-center">
            <h2 className="text-[42px] font-black leading-[1.18] tracking-[-0.085em] text-[#08111f] md:text-[50px]">
              이야기를 찾고, 팔리는 구조로 설계합니다.
            </h2>

            <p className="mt-6 text-[17px] font-medium leading-[1.75] tracking-[-0.05em] text-slate-600 md:text-[18px]">
              없는마케팅은 브랜드 안에 이미 있지만 드러나지 않은 이야기를 발견하고,
              <br />
              그 이야기를 콘텐츠와 판매 흐름으로 이어지도록 구조를 설계합니다.
            </p>
          </div>

          <div className="grid gap-7 lg:grid-cols-3">
            <StructureCard
              icon={<MagnifierIcon className="h-full w-full" />}
              label="Discovery"
              title="이야기 발굴"
            >
              <p>브랜드 안에 이미 있지만</p>
              <p>꺼내지 못한 포인트를 찾아,</p>
              <p>사람들이 반응할 핵심 이야기를 발굴합니다.</p>
            </StructureCard>

            <StructureCard
              icon={<StructureIcon className="h-full w-full" />}
              label="Structure"
              title="팔리는 구조 설계"
            >
              <p>발굴한 이야기를</p>
              <p>숏폼, 롱폼, 랜딩페이지,</p>
              <p>제안서까지 연결되는 흐름으로 설계합니다.</p>
            </StructureCard>

            <StructureCard
              icon={<SendIcon className="h-full w-full" />}
              label="Execution"
              title="콘텐츠 실행 · 확산"
            >
              <p>촬영, 편집, 업로드, 채널 운영,</p>
              <p>브금, 챌린지까지 실제 반응과</p>
              <p>확산이 나도록 실행합니다.</p>
            </StructureCard>
          </div>
        </div>
      </section>

      {/* STEP SUMMARY */}
      <section id="steps" className="bg-white py-24">
        <div className="mx-auto max-w-[1280px] px-5">
          <div className="mx-auto mb-14 max-w-[850px] text-center">
            <h2 className="text-[42px] font-black leading-[1.18] tracking-[-0.085em] text-[#08111f] md:text-[50px]">
              처음은 가볍게,
              <br />
              <span className="text-[#1368ff]">브랜드의 이야기</span>는 선명하게 그립니다.
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-4">
            <StepSummaryCard
              icon={<HandshakeIcon className="h-full w-full" />}
              step="STEP 01"
              eng="TRY"
              title="맛보기 제작 세트"
            >
              <p>기획 · 촬영 · 편집 · 업로드를</p>
              <p>1회로 경험할 수 있는</p>
              <p>부담 낮은 시작형 서비스입니다.</p>
            </StepSummaryCard>

            <StepSummaryCard
              icon={<ClipboardIcon className="h-full w-full" />}
              step="STEP 02"
              eng="SELECT"
              title="필요한 단계만 선택"
            >
              <p>기획 세트, 제작 세트,</p>
              <p>채널 대행 중 지금 브랜드에</p>
              <p>필요한 것만 고를 수 있습니다.</p>
            </StepSummaryCard>

            <StepSummaryCard
              icon={<MonitorIcon className="h-full w-full" />}
              step="STEP 03"
              eng="BUILD"
              title="콘텐츠와 운영 구축"
            >
              <p>대본, 촬영, 편집, 업로드,</p>
              <p>채널 운영과 월간 리포트까지</p>
              <p>반복 가능한 구조를 만듭니다.</p>
            </StepSummaryCard>

            <StepSummaryCard
              icon={<MegaphoneIcon className="h-full w-full" />}
              step="STEP 04"
              eng="EXPAND"
              title="확산 패키지로 확장"
            >
              <p>협찬 광고, CM송, 챌린지,</p>
              <p>브랜드 전용 BGM까지 연결해</p>
              <p>인지도와 파급력을 확장합니다.</p>
            </StepSummaryCard>
          </div>

          <div className="mt-14 flex items-center justify-center gap-8">
            <div className="h-[1px] w-24 bg-[#1368ff]" />
            <div className="text-center">
              <p className="text-[26px] font-black tracking-[-0.07em] text-[#08111f] md:text-[28px]">
                큰 계약보다, <span className="text-[#1368ff]">작은 확신부터.</span>
              </p>
              <p className="mt-2 text-[16px] font-medium tracking-[-0.04em] text-slate-500 md:text-[17px]">
                브랜드의 첫 이야기를 함께 그립니다.
              </p>
            </div>
            <div className="h-[1px] w-24 bg-[#1368ff]" />
          </div>
        </div>
      </section>

      {/* STEP DETAILS */}
      <StepGuideSection
        step="STEP 01. TRY"
        title="맛보기 제작 세트"
        description="브랜드의 첫 콘텐츠를 부담 없이 시작할 수 있는 없는마케팅의 시작형 제작 서비스입니다."
        image="/service/step-01-try.png"
        purpose={[
          "브랜드의 첫 콘텐츠를 부담 없이 시작",
          "없는마케팅의 제작 방식과 실력 체험",
        ]}
        direction={[
          "기획 · 촬영 · 편집 · 업로드를 1회 단위로 경험하는 시작형 서비스",
          "브랜드를 어떻게 바라보고 어떤 흐름으로 이야기하려는지 직접 확인 가능",
          "단순 제작이 아닌 브랜드 스토리 방향성과 표현 방식을 함께 점검",
        ]}
        effect={[
          "브랜드에 맞는 콘텐츠 방향성을 빠르게 확인 가능",
          "없는마케팅의 실력과 작업 방식을 가볍게 경험 가능",
        ]}
      />

      <StepGuideSection
        reverse
        step="STEP 02. SELECT"
        title="필요한 단계만 선택"
        description="브랜드 상황에 맞게 필요한 서비스만 선택할 수 있는 없는마케팅의 선택형 서비스입니다."
        image="/service/step-02-select.png"
        purpose={[
          "필요한 서비스만 선택해 유연하게 시작",
          "브랜드 상황과 예산에 맞는 맞춤형 진행",
        ]}
        direction={[
          "기획 세트와 제작 세트 중 필요한 상품 선택 가능",
          "단품보다 더 체계적인 결과물 중심 구성",
          "향후 채널 대행 등 다음 단계로 자연스럽게 확장 가능",
        ]}
        effect={[
          "브랜드에 맞는 실행 범위를 효율적으로 설계 가능",
          "필요한 부분부터 시작해 비용 부담을 줄일 수 있음",
        ]}
      />

      <StepGuideSection
        step="STEP 03. BUILD"
        title="콘텐츠와 운영 구축"
        description="브랜드 채널을 꾸준히 운영하고 성장시킬 수 있는 없는마케팅의 운영형 서비스입니다."
        image="/service/step-03-build.png"
        purpose={[
          "브랜드 채널의 콘텐츠 운영 구조 구축",
          "반복 가능한 업로드 흐름과 관리 체계 마련",
        ]}
        direction={[
          "주 3회 업로드와 채널 운영 관리를 포함한 구성",
          "월간 데이터 리포트를 통해 성과를 점검하고 개선",
          "브랜드 전용 브금을 포함해 일관된 콘텐츠 운영 지원",
        ]}
        effect={[
          "브랜드 채널을 지속적으로 운영할 수 있는 기반 확보",
          "누적 콘텐츠를 통해 인지도와 신뢰도 향상",
        ]}
      />

      <StepGuideSection
        reverse
        step="STEP 04. EXPAND"
        title="확산 패키지로 확장"
        description="브랜드 인지도와 파급력을 더 크게 넓혀갈 수 있는 없는마케팅의 확산형 서비스입니다."
        image="/service/step-04-expand.png"
        purpose={[
          "브랜드 인지도와 파급력을 더 크게 확장",
          "광고 · 음악 · 챌린지로 브랜드 접점을 확대",
        ]}
        direction={[
          "협찬 광고, CM송, 전용 브금 등 확산형 상품 중심 구성",
          "브랜드 상황과 목표에 맞춰 필요한 확산 수단 선택 가능",
          "채널 운영 이후 더 큰 도달과 반응을 만들 때 활용",
        ]}
        effect={[
          "브랜드가 더 넓은 타겟에게 자연스럽게 노출됨",
          "콘텐츠를 넘어 기억되는 브랜드 경험을 만들 수 있음",
        ]}
      />

      {/* CTA */}
      <section className="relative overflow-hidden bg-[#020712] py-28 text-white">
        <div className="absolute inset-0">
          <Image
            src="/service/service-cta-contact.png"
            alt="없는마케팅 문의하기"
            fill
            className="object-cover opacity-20"
          />
        </div>

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_50%,rgba(19,104,255,0.34),transparent_34%),linear-gradient(90deg,#020712_0%,rgba(2,7,18,0.94)_42%,rgba(2,7,18,0.78)_100%)]" />
        <div className="absolute right-[-220px] top-[-180px] h-[720px] w-[720px] rounded-full border border-[#1368ff]/25" />
        <div className="absolute right-[-120px] top-[-80px] h-[520px] w-[520px] rounded-full border border-[#1368ff]/15" />

        <div className="relative mx-auto grid max-w-[1180px] items-center gap-14 px-5 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="relative">
            <div className="absolute -left-8 -top-8 h-28 w-28 rounded-full border border-white/10" />

            <div className="relative border border-white/10 bg-white/[0.035] px-8 py-10 backdrop-blur-md">
              <div className="mb-8 flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#1368ff]" />
                <p className="text-[12px] font-black uppercase tracking-[0.28em] text-[#4c8dff]">
                  Contact Point
                </p>
              </div>

              <p className="text-[18px] font-bold leading-[1.85] tracking-[-0.05em] text-white">
                아직 브랜드 이야기가
                <br />
                정리되지 않았다면
                <br />
                지금은 괜찮습니다.
              </p>

              <div className="my-8 h-[1px] w-12 bg-white/20" />

              <p className="text-[18px] font-bold leading-[1.85] tracking-[-0.05em] text-white">
                다만, 이야기를 만들
                <br />
                준비가 되었다면
                <br />
                그때는 저희가 필요할 겁니다.
              </p>
            </div>
          </div>

          <div>
            <p className="mb-7 text-[13px] font-black uppercase tracking-[0.35em] text-[#1368ff]">
              Start with upneun
            </p>

            <h2 className="text-[50px] font-black leading-[1.18] tracking-[-0.085em] text-white md:text-[64px]">
              브랜드가 기억되는 순간은
              <br />
              이야기에서 시작됩니다.
            </h2>

            <p className="mt-8 text-[18px] font-medium leading-[1.75] tracking-[-0.05em] text-white/72 md:text-[19px]">
              현재 상황과 고민을 알려주세요.
              <br />
              없는마케팅이 브랜드에 맞는 시작점과 방향을 함께 설계합니다.
            </p>

            <div className="mt-12 flex flex-wrap items-center gap-7">
              <Link
                href="/contact"
                className="group inline-flex h-[62px] min-w-[250px] items-center justify-center rounded-full bg-white px-10 shadow-[0_0_50px_rgba(19,104,255,0.24)] transition duration-300 hover:bg-[#1368ff]"
              >
                <span className="text-[17px] font-black tracking-[-0.045em] text-[#06101f] group-hover:text-white">
                  없는마케팅에 문의하기
                </span>
                <ArrowIcon className="ml-3 h-5 w-5 text-[#06101f] transition duration-300 group-hover:translate-x-1 group-hover:text-white" />
              </Link>

            </div>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
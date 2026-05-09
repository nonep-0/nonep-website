"use client";

import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { useState } from "react";

const proofCards = [
  {
    number: "01",
    title: "챌린지 반응 데이터",
    subtitle: "이번 주 Hot Trends 진입",
    description:
      "일과 음악이 결합된 숏폼 콘텐츠가 실제로 어떻게 확산되는지 직접 실험한 사례입니다.",
    image: "/home/challenge.png",
    imageClass: "object-cover object-center",
    tags: ["숏폼", "챌린지", "데이터"],
  },
  {
    number: "02",
    title: "음원 차트 성과",
    subtitle: "음원이 콘텐츠가 되는 구조",
    description:
      "자체 제작·유통한 음원이 차트와 숏폼 반응으로 이어지는 흐름을 증명한 경험으로 축적했습니다.",
    image: "/home/chart.png",
    imageClass: "object-cover object-top",
    tags: ["음원", "차트", "성과"],
  },
  {
    number: "03",
    title: "FIRSTCLASS",
    subtitle: "아티스트 브랜딩과 앨범 운영",
    description:
      "아티스트 발굴·브랜딩부터 앨범 기획·운영까지 일관된 브랜드 경험을 설계합니다.",
    image: "/home/firstclass.png",
    imageClass: "object-cover object-top",
    tags: ["아티스트", "브랜딩", "앨범"],
  },
  {
    number: "04",
    title: "NONEP",
    subtitle: "보컬로이드 IP 채널 운영",
    description:
      "보컬로이드 캐릭터와 세계관을 기반으로 콘텐츠를 제작하고, 팬덤과 수익 구조를 함께 구축합니다.",
    image: "/home/nonep.png",
    imageClass: "object-cover object-top",
    tags: ["IP", "보컬로이드", "채널 운영"],
  },
  {
    number: "05",
    title: "애니멀라운지 채널 육성",
    subtitle: "150만+ 구독자 육성 경험",
    description:
      "다양한 IP 채널을 직접 성장시키며 축적한 운영 노하우로 빠른 구독자 성장 구조를 만들어냅니다.",
    image: "/home/animal-lounge.png",
    imageClass: "object-cover object-top",
    tags: ["채널 육성", "IP", "성장"],
  },
];

const storyMetrics = [
  { icon: "play", title: "조회수", desc: "실제 반응 데이터" },
  { icon: "eye", title: "기억", desc: "브랜드 스토리 각인" },
  { icon: "chart", title: "확산", desc: "자발적 공유/댓글" },
  { icon: "bulb", title: "전환", desc: "인지 → 관심 전환" },
];

const storyCases = [
  {
    label: "Case 01",
    title: "민트초코 스토리 콘텐츠",
    metric: "릴스 조회수 170만+",
    description:
      "민트초코가 왜 호불호의 상징이 되었는지, 취향과 공감 포인트를 스토리로 풀어내 댓글과 공유가 이어지는 구조로 설계했습니다.",
    image: "/home/mintchoco.png",
    videoId: "QeO7JvHBQrk",
    previewText: "릴스 170만+",
    tags: ["릴스", "취향 기반 스토리", "댓글공유 유도"],
  },
  {
    label: "Case 02",
    title: "스페이스펜 스토리 콘텐츠",
    metric: "유튜브 조회수 90만+",
    description:
      "스페이스펜을 몰랐던 사람들도 ‘우주에서도 쓸 수 있는 펜’이라는 이야기를 통해 제품의 존재와 가치를 자연스럽게 각인시켰습니다.",
    image: "/home/spacepen.png",
    videoId: "RVDZmcTB1xY",
    previewText: "유튜브 90만+",
    tags: ["유튜브", "제품 스토리 각인", "정보형 콘텐츠"],
  },
];

const adCases = [
  {
    number: "01",
    title: "이마트24",
    subtitle: "브랜드 협업 숏폼 콘텐츠",
    description:
      "캐릭터와 상황극을 활용해 브랜드를 자연스럽게 인지하도록 구성한 숏폼 광고 콘텐츠입니다.",
    image: "/home/emart24.png",
    videoId: "mFIHsEnBANY",
    tags: ["브랜드 노출", "상황극", "숏폼 광고"],
  },
  {
    number: "02",
    title: "홍성 글로벌 바비큐 페스티벌",
    subtitle: "지역 행사 홍보 콘텐츠",
    description:
      "행사 정보를 단순 안내가 아닌 유쾌한 후킹 구조로 풀어 관심을 유도한 콘텐츠입니다.",
    image: "/home/hongseong.png",
    videoId: "8MtJ7pfIUco",
    tags: ["지역 축제", "행사 홍보", "재미 기반"],
  },
  {
    number: "03",
    title: "실버 앤 블러드",
    subtitle: "게임 광고 숏폼 콘텐츠",
    description:
      "게임의 분위기와 액션성을 짧은 숏폼 안에 담아 장르적 매력을 빠르게 전달했습니다.",
    image: "/home/silverblood.png",
    videoId: "luiF20NLeu8",
    tags: ["게임 무드", "액션 후킹", "세계관"],
  },
  {
    number: "04",
    title: "TJ노래방",
    subtitle: "공간 체험형 광고 콘텐츠",
    description:
      "직접 방문한 듯한 흐름으로 공간과 사용 경험을 체험형 콘텐츠처럼 풀어낸 사례입니다.",
    image: "/home/tj.png",
    videoId: "4zQ3ZYrgOh0",
    tags: ["공간 체험", "방문 유도", "일상 상황"],
  },
];

function renderMetricIcon(icon: string) {
  switch (icon) {
    case "play":
      return (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <rect x="3" y="4" width="18" height="16" rx="4" stroke="currentColor" strokeWidth="2" />
          <path d="M10 9L15 12L10 15V9Z" fill="currentColor" />
        </svg>
      );
    case "eye":
      return (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <path
            d="M2 12C4.5 7.5 8 5.5 12 5.5C16 5.5 19.5 7.5 22 12C19.5 16.5 16 18.5 12 18.5C8 18.5 4.5 16.5 2 12Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <circle cx="12" cy="12" r="3" fill="currentColor" />
        </svg>
      );
    case "chart":
      return (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <path d="M4 19H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M7 16V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 16V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M17 16V5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path
            d="M6 9L10 6L13 9L18 4"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    case "bulb":
      return (
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
          <path
            d="M12 3C8.1 3 5 6.1 5 10C5 12.4 6.2 14.5 8 15.8C8.8 16.4 9.3 17.2 9.4 18H14.6C14.7 17.2 15.2 16.4 16 15.8C17.8 14.5 19 12.4 19 10C19 6.1 15.9 3 12 3Z"
            stroke="currentColor"
            strokeWidth="2"
          />
          <path d="M9.5 21H14.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M10 18H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );
    default:
      return null;
  }
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-12 w-12">
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
      <path d="M16 16L20 20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function GiftIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-12 w-12">
      <rect x="4" y="10" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.8" />
      <path d="M12 10V20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M4 10H20" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      <path
        d="M9.3 7.7C8.6 7 8.6 5.9 9.2 5.2C9.8 4.5 10.9 4.5 11.6 5.2L12 5.6L12.4 5.2C13.1 4.5 14.2 4.5 14.8 5.2C15.4 5.9 15.4 7 14.7 7.7L13.9 8.5H10.1L9.3 7.7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ContactBracketIcon() {
  return (
    <img
      src="/home/contact-button.png"
      alt="문의하기"
      className="h-[60px] w-auto object-contain drop-shadow-[0_10px_24px_rgba(0,0,0,0.35)]"
    />
  );
}


export default function Home() {
  const [selectedVideo, setSelectedVideo] = useState<null | { id: string; title: string }>(null);
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <SiteHeader />

      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden bg-slate-950">
        <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline>
          <source src="/hero/hero-video.mp4" type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-black/24 to-black/16" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-[1180px] items-center px-6 pt-[62px]">
          <div className="max-w-[560px]">
            <h1 className="text-[28px] font-extrabold leading-[1.22] tracking-[-0.04em] text-white md:text-[34px]">
              우리 브랜드에 이야기가
              <br />
              없다고 느끼셨나요?
            </h1>

            <div className="mt-6 flex items-center gap-2.5">
              <span className="h-[2px] w-5 bg-blue-500" />
              <p className="text-[17px] font-bold leading-[1.45] tracking-[-0.03em] text-white md:text-[19px]">
                사실 이야기가 없는 브랜드는 없습니다.
              </p>
            </div>

            <div className="mt-5 space-y-1">
              <p className="max-w-[620px] text-[12.5px] font-medium leading-[1.65] tracking-[-0.02em] text-white/82 md:text-[13.5px]">
                브랜드 안에 숨어 있는 이야기를 찾고, 사람들이 기억하고 반응하는 콘텐츠 구조로 설계합니다.
              </p>
              <p className="text-[12.5px] font-semibold leading-[1.65] tracking-[-0.02em] text-white/90 md:text-[13px]">
                5분이면 확인하실 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 반응 증명 섹션 */}
      <section id="about" className="bg-white px-6 py-24 md:py-28">
        <div className="mx-auto max-w-[860px]">
          <div className="mx-auto max-w-[700px] text-center">
            <h2 className="text-[22px] font-extrabold leading-[1.32] tracking-[-0.04em] text-slate-950 md:text-[28px]">
              일반 마케팅회사는 반응을 말로 설명합니다.
              <br />
              <span className="text-blue-600">없는마케팅은 직접 반응을 만듭니다.</span>
            </h2>

            <p className="mx-auto mt-4 max-w-[620px] text-[12px] font-medium leading-[1.8] tracking-[-0.02em] text-slate-600 md:text-[13px]">
              없는마케팅은 음악, 챌린지 콘텐츠, 아티스트 브랜딩, 레이블/IP 채널 운영, 채널 성장까지 직접
              운영해왔습니다.
              <br className="hidden md:block" />
              그래서 어떤 콘텐츠가 진짜 반응을 만드는지 압니다.
            </p>
          </div>

          <div className="mt-9 grid gap-5 md:grid-cols-2">
            {proofCards.slice(0, 4).map((card) => (
              <article
                key={card.number}
                className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.04)]"
              >
                <div className="relative px-4 pt-4">
                  <div className="absolute left-4 top-4 z-10 rounded-full border border-blue-100 bg-white px-3 py-1 text-[11px] font-extrabold text-blue-600 shadow-sm">
                    {card.number}
                  </div>

                  <div className="overflow-hidden rounded-[14px] border border-slate-100 bg-white">
                    <div className="relative aspect-[16/9] w-full overflow-hidden bg-white">
                      <img
                        src={card.image}
                        alt={card.title}
                        className={`absolute inset-0 h-full w-full ${card.imageClass}`}
                      />
                    </div>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-4">
                  <div className="flex items-end gap-3">
                    <span className="text-[20px] font-extrabold leading-none tracking-[-0.03em] text-blue-600">
                      {card.number}
                    </span>
                    <h3 className="text-[18px] font-extrabold leading-none tracking-[-0.03em] text-slate-950 md:text-[19px]">
                      {card.title}
                    </h3>
                  </div>

                  <p className="mt-3 text-[13px] font-bold leading-relaxed tracking-[-0.02em] text-blue-600">
                    {card.subtitle}
                  </p>

                  <p className="mt-3 text-[12px] font-medium leading-[1.75] tracking-[-0.02em] text-slate-600 md:text-[12.5px]">
                    {card.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {card.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-medium text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-5 flex justify-center">
            <article className="w-full max-w-[430px] overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.04)]">
              <div className="relative px-4 pt-4">
                <div className="absolute left-4 top-4 z-10 rounded-full border border-blue-100 bg-white px-3 py-1 text-[11px] font-extrabold text-blue-600 shadow-sm">
                  {proofCards[4].number}
                </div>

                <div className="overflow-hidden rounded-[14px] border border-slate-100 bg-white">
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-white">
                    <img
                      src={proofCards[4].image}
                      alt={proofCards[4].title}
                      className={`absolute inset-0 h-full w-full ${proofCards[4].imageClass}`}
                    />
                  </div>
                </div>
              </div>

              <div className="px-5 pb-5 pt-4">
                <div className="flex items-end gap-3">
                  <span className="text-[20px] font-extrabold leading-none tracking-[-0.03em] text-blue-600">
                    {proofCards[4].number}
                  </span>
                  <h3 className="text-[18px] font-extrabold leading-none tracking-[-0.03em] text-slate-950 md:text-[19px]">
                    {proofCards[4].title}
                  </h3>
                </div>

                <p className="mt-3 text-[13px] font-bold leading-relaxed tracking-[-0.02em] text-blue-600">
                  {proofCards[4].subtitle}
                </p>

                <p className="mt-3 text-[12px] font-medium leading-[1.75] tracking-[-0.02em] text-slate-600 md:text-[12.5px]">
                  {proofCards[4].description}
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {proofCards[4].tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-medium text-slate-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* 이야기 구조 섹션 */}
      <section className="bg-white px-6 py-20 md:py-24">
        <div className="mx-auto max-w-[980px]">
          <div className="text-center">
            <h2 className="text-[27px] font-extrabold leading-[1.32] tracking-[-0.045em] text-slate-950 md:text-[42px]">
              좋은 브랜드에는 반드시 <span className="text-blue-600">이야기</span>가 있습니다.
            </h2>
            <p className="mt-4 text-[13px] font-medium leading-[1.8] tracking-[-0.025em] text-slate-600 md:text-[15px]">
              없는마케팅은 그 이야기를 찾아 사람들이 기억하고 반응하는 콘텐츠로 만듭니다.
            </p>
          </div>

          <div className="mt-10 rounded-[22px] border border-slate-200 bg-white px-5 py-5 shadow-[0_12px_30px_rgba(15,23,42,0.04)]">
            <div className="grid gap-2 md:grid-cols-4">
              {storyMetrics.map((item, index) => (
                <div
                  key={item.title}
                  className={`flex items-center gap-3 rounded-[16px] px-4 py-4 ${
                    index !== storyMetrics.length - 1 ? "md:border-r md:border-slate-200" : ""
                  }`}
                >
                  <div className="flex h-[46px] w-[46px] shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                    {renderMetricIcon(item.icon)}
                  </div>
                  <div>
                    <p className="text-[18px] font-extrabold leading-none tracking-[-0.035em] text-slate-950">
                      {item.title}
                    </p>
                    <p className="mt-1.5 text-[11.5px] font-medium tracking-[-0.02em] text-slate-500">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-7 grid gap-6 md:grid-cols-2">
            {storyCases.map((item) => (
              <article
                key={item.title}
                className="overflow-hidden rounded-[22px] border border-slate-200 bg-white p-4 shadow-[0_14px_34px_rgba(15,23,42,0.045)]"
              >
                <button
                  type="button"
                  onClick={() => setSelectedVideo({ id: item.videoId, title: item.title })}
                  className="group block w-full text-left"
                >
                  <div className="relative overflow-hidden rounded-[16px] bg-slate-100">
                    <div className="relative aspect-[16/9] w-full overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="absolute inset-0 h-full w-full object-cover object-center transition duration-300 group-hover:scale-[1.025]"
                      />

                      <div className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-[11px] font-bold text-slate-600 shadow-sm">
                        <span className="mr-1.5 inline-block h-2 w-2 rounded-full bg-blue-500" />
                        {item.label}
                      </div>

                      <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/50 via-black/18 to-transparent" />

                      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-4 py-3 text-white">
                        <div className="flex items-center gap-2">
                          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/92 text-[11px] text-slate-950">
                            ▶
                          </div>
                          <span className="text-[12px] font-bold tracking-[-0.02em]">{item.previewText}</span>
                        </div>

                        <span className="text-[11px] font-semibold text-white/90">클릭해서 보기</span>
                      </div>
                    </div>
                  </div>
                </button>

                <div className="px-2 pb-2 pt-5 text-center">
                  <h3 className="text-[20px] font-extrabold tracking-[-0.035em] text-slate-950 md:text-[22px]">
                    {item.title}
                  </h3>

                  <p className="mt-3 inline-flex rounded-full bg-blue-50 px-4 py-1.5 text-[13px] font-bold text-blue-600">
                    {item.metric}
                  </p>

                  <p className="mx-auto mt-4 max-w-[430px] text-[13px] font-medium leading-[1.8] tracking-[-0.025em] text-slate-600">
                    {item.description}
                  </p>

                  <div className="mt-5 flex flex-wrap justify-center gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-[11.5px] font-medium text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 광고 섹션 */}
      <section id="service" className="bg-white px-6 py-24">
        <div className="mx-auto max-w-[860px]">
          <div className="text-center">
            <p className="text-[14px] font-bold tracking-[-0.02em] text-slate-950">
              없는마케팅은 광고도 콘텐츠처럼 만듭니다
            </p>
            <h2 className="mt-2 text-[28px] font-extrabold leading-[1.35] tracking-[-0.04em] text-slate-950 md:text-[40px]">
              광고를 <span className="text-blue-600">광고처럼만 만들지 않습니다.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-[650px] text-[13px] font-medium leading-[1.85] text-slate-600">
              브랜드 광고는 단순히 제품이나 장소를 보여주는 영상이 아닙니다. 없는마케팅은 브랜드의 장점, 상황,
              재미 요소를 숏폼 문법으로 풀어내 사람들이 광고처럼 넘기지 않고 콘텐츠처럼 보게 만드는 방식을
              실험해왔습니다.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {adCases.map((item) => (
              <article
                key={item.title}
                className="overflow-hidden rounded-[20px] border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.04)]"
              >
                <button
                  type="button"
                  onClick={() => setSelectedVideo({ id: item.videoId, title: item.title })}
                  className="group block w-full text-left"
                >
                  <div className="relative px-4 pt-4">
                    <div className="absolute left-4 top-4 z-10 rounded-[10px] bg-blue-600 px-3 py-1 text-[12px] font-extrabold text-white shadow-sm">
                      {item.number}
                    </div>

                    <div className="overflow-hidden rounded-[14px] border border-slate-100">
                      <div className="relative aspect-[16/9] w-full overflow-hidden bg-white">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="absolute inset-0 h-full w-full object-cover object-center transition duration-300 group-hover:scale-[1.02]"
                        />

                        <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/45 via-black/15 to-transparent" />

                        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-4 py-3 text-white">
                          <div className="flex items-center gap-2">
                            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-[12px] text-slate-900">
                              ▶
                            </div>
                            <span className="text-[12px] font-bold">영상 보기</span>
                          </div>

                          <span className="text-[12px] font-semibold text-white/90">클릭해서 보기</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </button>

                <div className="px-5 pb-5 pt-4">
                  <h3 className="text-[18px] font-extrabold tracking-[-0.03em] text-slate-950 md:text-[19px]">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-[13px] font-bold text-blue-600">{item.subtitle}</p>

                  <p className="mt-3 text-[12px] font-medium leading-[1.75] text-slate-600 md:text-[12.5px]">
                    {item.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-[11px] font-medium text-slate-600"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 없는마케팅이 뭐야 / 서비스 소개 */}
      <section className="bg-[#0f5cff] px-6 py-24 md:px-8 md:py-28">
        <div className="mx-auto max-w-[1240px]">
          <div className="text-center">
            <p className="text-[20px] font-medium leading-[1.1] tracking-[-0.05em] text-white/80 md:text-[38px]">
              없는마케팅이 뭐야?
            </p>
            <h2 className="mt-2 text-[30px] font-extrabold leading-[1.04] tracking-[-0.06em] text-white md:text-[52px]">
              없는마케팅은 뭘 해줘?
            </h2>
          </div>

          <div className="mx-auto mt-14 grid max-w-[950px] gap-7 md:grid-cols-2">
            <article className="flex min-h-[380px] flex-col rounded-[22px] bg-white px-10 py-10 text-center shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
              <div className="flex justify-center text-blue-600">
                <SearchIcon />
              </div>

              <h3 className="mt-7 text-[26px] font-extrabold tracking-[-0.04em] text-slate-950 md:text-[30px]">
                없는마케팅이란?
              </h3>

              <p className="mx-auto mt-8 max-w-[420px] text-[14px] font-medium leading-[1.9] tracking-[-0.02em] text-slate-600 md:text-[15px]">
                브랜드 안에 숨어 있는 이야기를 찾고,
                <br />
                그 이야기를 콘텐츠와 판매 흐름으로 연결하는 방식이 궁금하다면
                <br />
                없는마케팅의 생각과 방향을 먼저 확인해보세요.
              </p>

              <div className="mt-auto pt-10">
                <a
                  href="/about"
                  className="inline-flex h-[52px] min-w-[220px] items-center justify-center rounded-[12px] bg-blue-600 px-8 text-[15px] font-bold tracking-[-0.02em] text-white shadow-[0_10px_24px_rgba(15,92,255,0.24)] transition hover:bg-blue-700"
                  style={{ color: "#ffffff" }}
                >
                  <span style={{ color: "#ffffff" }}>없는마케팅 알아보기</span>
                </a>
              </div>
            </article>

            <article className="flex min-h-[380px] flex-col rounded-[22px] bg-white px-10 py-10 text-center shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
              <div className="flex justify-center text-blue-600">
                <GiftIcon />
              </div>

              <h3 className="mt-7 text-[26px] font-extrabold tracking-[-0.04em] text-slate-950 md:text-[30px]">
                서비스 소개
              </h3>

              <p className="mx-auto mt-8 max-w-[420px] text-[14px] font-medium leading-[1.9] tracking-[-0.02em] text-slate-600 md:text-[15px]">
                맛보기 제작 세트부터 기획, 제작, 채널 대행, 확산 패키지까지
                <br />
                브랜드 상황에 맞는 단계를 선택할 수 있습니다.
              </p>

              <div className="mt-auto pt-10">
                <a
                  href="/service"
                  className="inline-flex h-[52px] min-w-[220px] items-center justify-center rounded-[12px] bg-blue-600 px-8 text-[15px] font-bold tracking-[-0.02em] text-white shadow-[0_10px_24px_rgba(15,92,255,0.24)] transition hover:bg-blue-700"
                  style={{ color: "#ffffff" }}
                >
                  <span style={{ color: "#ffffff" }}>서비스 보러가기</span>
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="relative overflow-hidden bg-slate-950">
        <div className="absolute inset-0">
          <img src="/home/contact-bg.png" alt="contact background" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-black/58" />
          <div className="absolute inset-0 bg-[#00142c]/18" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px] px-6 py-16 md:px-10 md:py-20">
          <div className="relative min-h-[470px] md:min-h-[540px]">
            <div
              className="absolute left-0 top-0 max-w-[360px] bg-blue-600 px-7 py-7 text-white shadow-[0_24px_50px_rgba(0,0,0,0.22)] md:left-[90px] md:top-[36px]"
              style={{
                clipPath: "polygon(0 0, calc(100% - 26px) 0, 100% 26px, 100% 100%, 0 100%)",
              }}
            >
              <p className="text-[14px] font-bold leading-[1.9] tracking-[-0.025em] md:text-[16px]">
                아직
                <br />
                당신의 브랜드 이야기가 정리되지 않았다면
                <br />
                지금은 문의하지 않으셔도 괜찮습니다.
                <br />
                <br />
                다만,
                <br />
                이야기를 만들 준비가 되었다면
                <br />
                그때는 저희가 필요할 겁니다.
              </p>
            </div>

            <a
              href="/contact"
              className="absolute bottom-2 left-1/2 -translate-x-1/2 md:bottom-[36px] md:left-auto md:right-[230px] md:translate-x-0"
              aria-label="문의하기"
            >
              <div className="transition duration-300 hover:scale-105">
                <ContactBracketIcon />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* VIDEO MODAL */}
      {selectedVideo && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 px-4 backdrop-blur-sm">
          <button
            type="button"
            onClick={() => setSelectedVideo(null)}
            className="absolute inset-0 cursor-default"
            aria-label="영상 닫기"
          />

          <div className="relative z-10 w-full max-w-[420px]">
            <div className="mb-4 flex items-center justify-between text-white">
              <p className="text-[15px] font-bold tracking-[-0.02em]">{selectedVideo.title}</p>

              <button
                type="button"
                onClick={() => setSelectedVideo(null)}
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/12 text-[20px] font-light text-white transition hover:bg-white/20"
                aria-label="닫기"
              >
                ×
              </button>
            </div>

            <div className="overflow-hidden rounded-[22px] bg-black shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
              <div className="relative aspect-[9/16] w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1&rel=0&modestbranding=1`}
                  title={selectedVideo.title}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            </div>

            <p className="mt-4 text-center text-[12px] font-medium text-white/60">
              바깥 영역을 누르면 영상이 닫힙니다.
            </p>
          </div>
        </div>
      )}
      <SiteFooter />
    </main>
  );
}
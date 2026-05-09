"use client";

import SiteFooter from "@/components/SiteFooter";
import Image from "next/image";
import Link from "next/link";
import { useRef, type ReactNode } from "react";
import SiteHeader from "@/components/SiteHeader";

function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.22em] text-[#4d6bff]">
      {children}
    </p>
  );
}

function SectionTitle({
  title,
  description,
}: {
  title: ReactNode;
  description?: ReactNode;
}) {
  return (
    <div className="mb-6">
      <h2 className="text-[21px] font-extrabold leading-[1.35] tracking-[-0.035em] text-slate-950 md:text-[26px]">
        {title}
      </h2>

      {description && (
        <p className="mt-3 text-[13px] leading-[1.55] tracking-[-0.015em] text-slate-600 md:text-[14px]">
          {description}
        </p>
      )}
    </div>
  );
}

function ParagraphBlock({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-4 text-[13px] leading-[1.58] tracking-[-0.015em] text-slate-700 md:text-[14px]">
      {children}
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-[#2f2f2f] px-6 py-8 text-white md:py-9">
      <div className="mx-auto max-w-[1040px]">
        <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-start">
          <div className="space-y-1.5">
            <p className="text-[12px] font-semibold tracking-[-0.02em] text-white/86">
              대표이사 이민영 | 사업자등록번호 570-22-01285
            </p>

            <p className="text-[12px] font-medium tracking-[-0.02em] text-white/72">
              Business Inquiry:{" "}
              <a
                href="mailto:contact@upneun.co.kr"
                className="transition hover:text-white"
              >
                contact@upneun.co.kr
              </a>
            </p>

            <p className="text-[12px] font-medium tracking-[-0.02em] text-white/72">
              서울특별시 강서구 마곡중앙로 105-7
            </p>

            <p className="text-[12px] font-medium tracking-[-0.02em] text-white/72">
              케이스퀘어 Tower1 2층 202호
            </p>
          </div>

          <div className="md:text-right">
            <div className="flex flex-col gap-1.5 text-[12px] font-medium leading-[1.7] text-white/68">
              <a href="#" className="transition hover:text-white">
                이용약관
              </a>
              <a href="#" className="transition hover:text-white">
                개인정보처리방침
              </a>
              <a href="#" className="transition hover:text-white">
                법적고지
              </a>
              <a href="#" className="transition hover:text-white">
                이메일 무단 수집거부
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 border-t border-white/16 pt-4">
          <p className="text-[11.5px] font-medium tracking-[-0.02em] text-white/52">
            © 2026 upneun. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default function AboutPage() {
  const storyStartRef = useRef<HTMLElement | null>(null);

  const scrollToStory = () => {
    storyStartRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <SiteHeader />

      {/* HERO */}
      <section className="relative min-h-screen overflow-hidden bg-[#051a58]">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#0a3a92_0%,#08266f_40%,#041744_100%)]" />

        <div className="absolute inset-y-0 right-[-7%] z-[1] w-[63%] overflow-hidden md:right-[-7%] md:w-[59%] lg:right-[-12%] lg:w-[57%]">
          <div className="absolute inset-0 translate-y-[18px] md:translate-y-[28px]">
            <Image
              src="/about/about-hero.png"
              alt="없는마케팅 소개"
              fill
              priority
              className="object-cover"
              style={{ objectPosition: "95% 60%" }}
            />
          </div>

          <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,26,88,0.08)_0%,rgba(5,26,88,0.02)_24%,rgba(5,26,88,0)_44%)]" />
        </div>

        <div
          className="absolute inset-y-0 left-0 z-[2] w-[58%]"
          style={{
            clipPath: "polygon(0 0, 76% 0, 100% 100%, 0 100%)",
            background:
              "linear-gradient(180deg, rgba(109,219,241,0.97) 0%, rgba(82,137,255,0.95) 52%, rgba(61,68,201,0.98) 100%)",
          }}
        />

        <div className="absolute left-[-8%] top-[10%] z-[2] h-[360px] w-[360px] rounded-full bg-cyan-200/12 blur-[110px]" />
        <div className="absolute bottom-[-84px] left-[18%] z-[2] h-[154px] w-[108px] rounded-t-[88px] border border-white/8 bg-white/5 backdrop-blur-[3px]" />

        <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1440px] items-center px-6 pb-10 pt-[120px] md:px-10">
          <div className="w-full lg:w-[39%]">
            <div className="max-w-[360px] text-white">
              <div className="mb-7 flex items-center gap-3">
                <span className="h-[7px] w-[7px] rounded-full bg-white/75" />
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/78">
                  ABOUT UPNEUN
                </p>
              </div>

              <h1 className="text-[42px] font-extrabold leading-[1.1] tracking-[-0.055em] text-white md:text-[60px]">
                당신의
                <br />
                브랜드에는
                <br />
                어떤 이야기가
                <br />
                있습니까?
              </h1>

              <div className="mt-8 h-px w-14 bg-white/18" />

              <p className="mt-8 text-[15px] font-medium leading-[1.75] tracking-[-0.02em] text-white/78">
                브랜드를 설명하기 전에
                <br />
                먼저 어떤 이야기가 남는지부터 봅니다.
              </p>

              <p className="mt-7 text-[17px] font-semibold leading-[1.7] tracking-[-0.03em] text-white">
                저는 브랜드를 만날 때 항상
                <br />
                이 질문을 먼저 합니다.
              </p>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={scrollToStory}
          className="group absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-3 text-white"
          aria-label="본문으로 이동"
        >
          <span className="flex h-[48px] w-[48px] items-center justify-center rounded-full bg-white text-[15px] text-slate-950 shadow-[0_10px_24px_rgba(0,0,0,0.18)] transition duration-300 group-hover:-translate-y-1">
            ↓
          </span>

          <span className="text-[12px] font-semibold tracking-[-0.02em] text-white/90">
            비결이 궁금하다면?
          </span>
        </button>
      </section>

      {/* WHY THIS QUESTION */}
      <section ref={storyStartRef} className="bg-white">
        <div className="mx-auto max-w-[1080px] px-6 py-16 md:px-10 md:py-18">
          <div className="max-w-[760px]">
            <div className="mb-7">
              <h2 className="text-[22px] font-extrabold leading-[1.35] tracking-[-0.035em] text-slate-950 md:text-[28px]">
                이 질문에 바로 답하지 못했을 겁니다.
              </h2>

              <p className="mt-3 text-[13px] leading-[1.55] tracking-[-0.015em] text-slate-600 md:text-[14px]">
                대부분 여기서 멈춥니다.
              </p>
            </div>

            <ParagraphBlock>
              <p>
                저는 이 순간을 너무 잘 알고 있습니다.
                <br />
                저도 같은 방식으로 브랜드를 고민했던 적이 있기 때문입니다.
              </p>
            </ParagraphBlock>

            <div className="mt-7 space-y-4 text-[13px] italic leading-[1.58] tracking-[-0.025em] text-slate-700 md:text-[14px]">
              <p>
                “우리도 뭔가 말은 하고 있는데
                <br />
                왜 기억에는 안 남을까?”
              </p>

              <p>
                “콘텐츠는 계속 만들고 있는데
                <br />
                왜 결국 아무도 이 브랜드를 이야기하지 않을까?”
              </p>

              <p>
                “지금 하고 있는 이 방향이
                <br />
                맞는 건지조차 잘 모르겠는데…”
              </p>

              <p>
                “우리는 분명 열심히 하고 있는데
                <br />
                왜 결과는 늘 비슷할까?”
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PROBLEM SCENE */}
      <section className="bg-white pb-0 pt-0">
        <div className="relative w-full overflow-hidden">
          <div className="relative h-[720px] overflow-hidden md:h-[620px]">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute inset-0 scale-[1.4] translate-y-[8%] md:translate-y-[20%]">
                <Image
                  src="/about/problem-scene.png"
                  alt="브랜드 문제 인식 장면"
                  fill
                  className="object-cover"
                  style={{ objectPosition: "center center" }}
                />
              </div>
            </div>

            <div className="absolute inset-0 bg-[rgba(8,13,24,0.68)]" />

            <div className="absolute inset-y-0 left-0 w-[42%] bg-[linear-gradient(90deg,rgba(5,13,28,0.62)_0%,rgba(5,13,28,0.28)_55%,rgba(5,13,28,0)_100%)]" />

            <div className="absolute inset-0 z-20">
              <div className="mx-auto h-full w-full max-w-[1280px] px-6 md:px-10">
                <div className="relative h-full">
                  <div className="pt-[74px] md:pt-[86px]" style={{ marginLeft: "28px" }}>
                    <div className="mb-7 flex items-start gap-3">
                      <div className="relative mt-[1px] h-[42px] w-[42px] shrink-0 md:h-[48px] md:w-[40px]">
                        <Image
                          src="/about/question-mark-object.png"
                          alt="질문 오브제"
                          fill
                          className="object-contain"
                        />
                      </div>

                      <h3 className="max-w-[520px] text-[20px] font-extrabold leading-[2.5] tracking-[-0.04em] text-white md:text-[28px]">
                        어느 순간, 이런 생각이 들었습니다.
                      </h3>
                    </div>

                    <div className="max-w-[380px] space-y-5 text-[11px] font-medium leading-[1.8] tracking-[-0.02em] text-white/90 md:text-[12px]">
                      <p>
                        우리는 계속 뭔가를 하고 있었지만
                        <br />
                        결국 아무것도 남기고 있지 않았습니다.
                      </p>

                      <p>
                        콘텐츠는 만들고 있었고, 광고도 돌리고 있었지만
                        <br />
                        브랜드 자체는 설명 없이 떠오르지 않았습니다.
                        <br />
                        그래서 이렇게 생각하게 됩니다.
                      </p>

                      <p className="text-[11px] italic leading-[1.8] tracking-[-0.025em] text-white/92 md:text-[12px]">
                        “지금 하고 있는 건 정말 브랜드를 쌓고 있는 걸까?”
                      </p>

                      <p>그때 알게 됐습니다.</p>
                    </div>
                  </div>

                  <div className="absolute bottom-[104px] left-1/2 w-full max-w-[640px] -translate-x-1/2 px-6 text-center md:bottom-[96px]">
                    <div className="mx-auto mb-4 h-px w-[120px] bg-white/28" />

                    <p className="text-[15px] font-semibold leading-[1.75] tracking-[-0.025em] text-white/92 md:text-[18px]">
                      문제는{" "}
                      <span className="font-bold text-white">
                        ‘마케팅을 안 해서’
                      </span>
                      가 아니라
                      <br />
                      <span className="font-bold text-white">
                        이야기 없이 시작하고 있었다는 것
                      </span>
                      이었습니다.
                    </p>

                    <div className="mx-auto mt-4 h-px w-[120px] bg-white/18" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* METHOD */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1080px] px-6 py-12 md:px-10 md:py-14">
          <div className="max-w-[760px]">

            <SectionTitle title="그래서 우리는 먼저 직접 만들어보기 시작했습니다." />

            <ParagraphBlock>
              <p>
                그래서 우리는 브랜드를 설명하기 전에
                <br />
                먼저 직접 만들어보기 시작했습니다.
              </p>

              <p>
                채널을 만들고, 아티스트를 키우고, 콘텐츠를 계속 만들어보면서
                <br />
                사람들이 어떤 것에 반응하고 무엇을 기억하는지 직접 확인해왔습니다.
              </p>

              <p>
                그 과정에서 알게 됩니다.
                <br />
                브랜드는 한 번의 콘텐츠로 만들어지는 것이 아니라
                <br />
                반복되는 구조 속에서 쌓인다는 것을 말이에요.
              </p>

              <p className="font-semibold text-slate-950">
                이건 결과가 아니라 우리가 반복해온 방식입니다.
              </p>
            </ParagraphBlock>
          </div>
        </div>
      </section>

      {/* CHANNEL PROOF IMAGE */}
      <section className="bg-white pb-14 md:pb-16">
        <div className="mx-auto max-w-[1080px] px-6 md:px-10">
          <div className="mx-auto max-w-[820px] rounded-[24px] border border-slate-200 bg-white p-4 shadow-[0_22px_70px_rgba(15,23,42,0.10)] md:p-6">
            <Image
              src="/about/channel-proof.png"
              alt="없는마케팅이 직접 만든 채널 성과 이미지"
              width={1440}
              height={860}
              className="h-auto w-full rounded-[18px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* PROOF */}
      <section className="bg-white">
        <div className="mx-auto max-w-[1080px] px-6 pb-16 md:px-10 md:pb-20">
          <div className="max-w-[760px]">

            <SectionTitle
              title="직접 만들고, 직접 키워온 브랜드들입니다."
              description="각각의 채널은 단순한 콘텐츠가 아니라 하나의 브랜드로 설계되었습니다."
            />

            <ParagraphBlock>
              <p>
                살짝 자랑을 하자면
                <br />
                그 구조를 이용해서 직접 만들고, 직접 키워온 브랜드들입니다.
              </p>

              <p>
                각각의 채널은 단순한 콘텐츠가 아니라 하나의 브랜드로 설계되었습니다.
                <br />
                그래서 콘텐츠가 끝나도 브랜드는 계속 남습니다.
              </p>

              <p>이 글을 읽는 동안 이미 답은 떠올랐을 겁니다.</p>
            </ParagraphBlock>

            <div className="mt-10 border-l-2 border-slate-950 pl-5">
              <p className="text-[13px] font-medium leading-[1.7] tracking-[-0.02em] text-slate-600 md:text-[14px]">
                없는마케팅은 콘텐츠를 만드는 회사가 아니라
              </p>

              <h3 className="mt-2 text-[22px] font-extrabold leading-[1.35] tracking-[-0.04em] text-slate-950 md:text-[28px]">
                팔리는 이야기를 설계하는 회사입니다.
              </h3>
            </div>
          </div>
        </div>
      </section>

{/* CONTACT - PREMIUM FINAL CTA */}
<section className="relative overflow-hidden bg-[#020812]">
  <div className="absolute inset-0">
    <Image
      src="/about/contact-bg.png"
      alt="없는마케팅 문의 배경"
      fill
      className="object-cover"
      style={{ objectPosition: "center center" }}
    />

    <div className="absolute inset-0 bg-[#020812]/82" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_46%,rgba(29,98,255,0.22)_0%,rgba(29,98,255,0.08)_26%,rgba(2,8,18,0)_58%)]" />
    <div className="absolute inset-y-0 left-0 w-[46%] bg-[linear-gradient(90deg,rgba(2,8,18,0.88)_0%,rgba(2,8,18,0.58)_54%,rgba(2,8,18,0)_100%)]" />
  </div>

  <div className="relative z-10 mx-auto max-w-[1180px] px-6 py-28 md:px-10 md:py-32">
    <div className="grid items-end gap-16 md:grid-cols-[0.82fr_1.18fr]">
      {/* LEFT CARD */}
      <div className="relative">
        <div className="absolute -left-8 -top-8 h-[120px] w-[120px] rounded-full border border-white/8" />
        <div className="absolute -bottom-10 left-16 h-[72px] w-[72px] rounded-full bg-[#1d62ff]/18 blur-[34px]" />

        <div className="relative max-w-[360px] border border-white/12 bg-white/[0.055] px-7 py-8 text-white shadow-[0_28px_80px_rgba(0,0,0,0.28)] backdrop-blur-md md:px-8 md:py-9">
          <div className="mb-7 flex items-center gap-3">
            <span className="h-[7px] w-[7px] rounded-full bg-[#1d62ff]" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/56">
              CONTACT POINT
            </p>
          </div>

          <div className="space-y-5 text-[14px] font-semibold leading-[1.85] tracking-[-0.025em] text-white/86 md:text-[15px]">
            <p>
              아직 브랜드 이야기가
              <br />
              정리되지 않았다면
              <br />
              지금은 괜찮습니다.
            </p>

            <div className="h-px w-10 bg-white/18" />

            <p className="text-white">
              다만, 이야기를 만들
              <br />
              준비가 되었다면
              <br />
              그때는 저희가 필요할 겁니다.
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT COPY */}
      <div className="max-w-[640px] text-white">

        <h2 className="text-[34px] font-extrabold leading-[1.24] tracking-[-0.055em] text-white md:text-[54px]">
          브랜드가
          <br />
          기억되는 순간은
          <br />
          이야기에서 시작됩니다.
        </h2>

        <p className="mt-7 max-w-[520px] text-[14px] font-medium leading-[1.85] tracking-[-0.02em] text-white/62 md:text-[15px]">
          현재 상황과 고민을 알려주세요.
          <br />
          없는마케팅이 브랜드에 맞는 시작점과 방향을 함께 정리합니다.
        </p>

        <div className="mt-10">
          <Link
            href="/contact"
            className="group inline-flex h-[54px] min-w-[152px] items-center justify-center bg-white px-8 text-[14px] font-bold tracking-[-0.02em] text-[#020812] transition duration-300 hover:bg-[#1d62ff] hover:text-white"
          >
            <span className="text-[#020812] transition duration-300 group-hover:text-white">
              문의하기
            </span>

            <span className="ml-3 text-[#020812] transition duration-300 group-hover:translate-x-1 group-hover:text-white">
              →
            </span>
          </Link>
        </div>
      </div>
    </div>
  </div>
</section>
      <SiteFooter />
    </main>
  );
}
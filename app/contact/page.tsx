"use client";

import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";
import { FormEvent, useState } from "react";

type FormState = {
  difficulties: string[];
  marketingStatus: string;
  brandIntro: string;
  mainConcern: string;
  desiredOutcome: string;
  budget: string;
  preferredTiming: string;
  companyName: string;
  managerInfo: string;
  phone: string;
  email: string;
  website: string;
  privacyAgreed: boolean;
};

const difficultyOptions = [
  "브랜드 이야기를 정리하는 것",
  "콘텐츠 방향을 잡는 것",
  "제품/서비스 장점을 표현하는 것",
  "꾸준히 콘텐츠를 운영하는 것",
  "조회수보다 문의·구매로 연결하는 것",
  "브랜드가 기억되게 만드는 것",
  "광고처럼 보이지 않게 알리는 것",
  "경쟁사와 차별화하는 것",
  "아직 잘 모르겠음 / 상담 후 정리하고 싶음",
];

const marketingStatusOptions = [
  "아직 시작 전입니다",
  "가끔 업로드하고 있습니다",
  "꾸준히 운영 중입니다",
  "내부에서 직접 운영하고 있습니다",
  "외주/대행 경험이 있습니다",
  "기존에 진행했지만 성과가 아쉬웠습니다",
];

const budgetOptions = [
  "100만 원 미만",
  "100만 ~ 300만 원",
  "300만 ~ 500만 원",
  "500만 ~ 1,000만 원",
  "1,000만 원 이상",
  "아직 미정 / 상담 후 결정",
];

const timingOptions = [
  "최대한 빨리",
  "2주 이내",
  "1개월 이내",
  "2~3개월 이내",
  "아직 미정",
];

const initialFormState: FormState = {
  difficulties: [],
  marketingStatus: "",
  brandIntro: "",
  mainConcern: "",
  desiredOutcome: "",
  budget: "",
  preferredTiming: "",
  companyName: "",
  managerInfo: "",
  phone: "",
  email: "",
  website: "",
  privacyAgreed: false,
};

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

function FieldLabel({
  number,
  title,
  required,
  hint,
}: {
  number: string;
  title: string;
  required?: boolean;
  hint?: string;
}) {
  return (
    <div className="mb-4">
      <p className="text-[13px] font-bold leading-[1.7] tracking-[-0.02em] text-slate-950">
        {number}. {title}
        {required ? <span className="ml-1 text-slate-950">*</span> : null}
        {hint ? (
          <span className="ml-2 text-[11px] font-medium text-slate-400">
            {hint}
          </span>
        ) : null}
      </p>
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState<FormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitError, setSubmitError] = useState("");

  const toggleDifficulty = (value: string) => {
    setForm((prev) => {
      const exists = prev.difficulties.includes(value);

      return {
        ...prev,
        difficulties: exists
          ? prev.difficulties.filter((item) => item !== value)
          : [...prev.difficulties, value],
      };
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitMessage("");
    setSubmitError("");

    if (!form.privacyAgreed) {
      setSubmitError("개인정보 수집 및 이용에 동의해주세요.");
      return;
    }

    if (!form.companyName || !form.managerInfo || !form.phone || !form.email) {
      setSubmitError("브랜드명/회사명, 담당자명, 연락처, 이메일은 필수입니다.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.message || "문의 전송 중 오류가 발생했습니다.");
      }

      setSubmitMessage("문의 내용이 전달되었습니다. 확인 후 순차적으로 연락드리겠습니다.");
      setForm(initialFormState);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "문의 전송 중 오류가 발생했습니다.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f7f8] text-slate-950">
      <SiteHeader />

      {/* TOP INTRO */}
      <section className="pt-[104px]">
        <div className="mx-auto max-w-[920px] px-6">
          <div className="space-y-4">
            <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-slate-400">
              CONTACT
            </p>

            <div className="space-y-2">
              <p className="text-[15px] font-semibold leading-[1.9] tracking-[-0.03em] text-slate-800">
                브랜드에 맞는 이야기와 방향을 함께 정리합니다.
              </p>

              <p className="text-[14px] font-medium leading-[1.9] tracking-[-0.02em] text-slate-500">
                아직 명확하게 정리되지 않은 상태여도 괜찮습니다.
                <br />
                현재 상황과 고민을 남겨주시면, 없는마케팅이 적절한 시작점을 함께 제안드립니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* NOTICE BOX */}
      <section className="px-6 pt-10">
        <div className="mx-auto max-w-[920px]">
          <div className="bg-[#efefef] px-8 py-9 text-center">
            <div className="space-y-2 text-[13px] font-medium leading-[1.9] tracking-[-0.02em] text-slate-700">
              <p>문의 전에 간단히 안내드립니다.</p>
              <p>
                없는마케팅이 어떤 방식으로 브랜드의 이야기를 정리하고,
                콘텐츠와 반응으로 연결하는지 충분히 살펴보신 뒤 문의해 주세요.
              </p>
              <p className="font-semibold text-slate-800">
                작성 내용을 구체적으로 남겨주실수록 더 정확한 안내를 도와드릴 수 있습니다.
              </p>
              <p className="pt-2">모든 문의는 이메일로 순차적으로 회신드리고 있습니다.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FORM AREA */}
      <section className="px-6 pb-24 pt-14">
        <div className="mx-auto max-w-[920px]">
          <div className="mb-10 space-y-2">
            <h2 className="text-[18px] font-bold leading-[1.6] tracking-[-0.03em] text-slate-950 md:text-[20px]">
              브랜드의 현재 상황을 알려주세요.
            </h2>
            <p className="text-[13px] font-medium leading-[1.8] tracking-[-0.02em] text-slate-500">
              필요한 질문만 차분히 답해주시면 됩니다.
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="border-t border-slate-900">
              {/* 1 */}
              <section className="border-b border-slate-200 py-7">
                <FieldLabel
                  number="1"
                  title="브랜드를 알리는 과정에서 가장 어려운 점은 무엇인가요?"
                  hint="복수선택 가능"
                />

                <div className="grid gap-x-8 gap-y-4 md:grid-cols-3">
                  {difficultyOptions.map((option) => (
                    <label key={option} className="flex cursor-pointer items-center gap-2.5">
                      <input
                        type="checkbox"
                        checked={form.difficulties.includes(option)}
                        onChange={() => toggleDifficulty(option)}
                        className="h-[15px] w-[15px] border-slate-300 text-slate-900 focus:ring-slate-400"
                      />
                      <span className="text-[13px] font-medium tracking-[-0.02em] text-slate-700">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </section>

              {/* 2 */}
              <section className="border-b border-slate-200 py-7">
                <FieldLabel
                  number="2"
                  title="현재 콘텐츠 또는 마케팅은 어느 정도 진행 중인가요?"
                  hint="단일선택"
                />

                <div className="grid gap-x-8 gap-y-4 md:grid-cols-3">
                  {marketingStatusOptions.map((option) => (
                    <label key={option} className="flex cursor-pointer items-center gap-2.5">
                      <input
                        type="radio"
                        name="marketingStatus"
                        checked={form.marketingStatus === option}
                        onChange={() =>
                          setForm((prev) => ({ ...prev, marketingStatus: option }))
                        }
                        className="h-[15px] w-[15px] border-slate-300 text-slate-900 focus:ring-slate-400"
                      />
                      <span className="text-[13px] font-medium tracking-[-0.02em] text-slate-700">
                        {option}
                      </span>
                    </label>
                  ))}
                </div>
              </section>

              {/* 3 + 4 */}
              <section className="grid border-b border-slate-200 py-7 md:grid-cols-2 md:gap-10">
                <div>
                  <FieldLabel number="3" title="생각하고 있는 예산 범위가 있나요?" />
                  <select
                    value={form.budget}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, budget: e.target.value }))
                    }
                    className="h-[44px] w-full border border-slate-200 bg-white px-4 text-[13px] font-medium text-slate-700 outline-none transition focus:border-slate-900"
                  >
                    <option value="">선택해주세요</option>
                    {budgetOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mt-7 md:mt-0">
                  <FieldLabel number="4" title="진행 희망 시점은 언제인가요?" />
                  <select
                    value={form.preferredTiming}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, preferredTiming: e.target.value }))
                    }
                    className="h-[44px] w-full border border-slate-200 bg-white px-4 text-[13px] font-medium text-slate-700 outline-none transition focus:border-slate-900"
                  >
                    <option value="">선택해주세요</option>
                    {timingOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </div>
              </section>

              {/* 5 */}
              <section className="border-b border-slate-200 py-7">
                <FieldLabel number="5" title="어떤 브랜드/사업인지 간단히 소개해주세요." />
                <textarea
                  value={form.brandIntro}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, brandIntro: e.target.value }))
                  }
                  rows={4}
                  maxLength={500}
                  placeholder="어떤 제품/서비스를 운영하고 있는지, 주요 고객은 누구인지 간단히 작성해주세요."
                  className="w-full resize-none border border-slate-200 bg-white px-4 py-3 text-[13px] leading-[1.8] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-900"
                />
                <div className="mt-2 text-right text-[11px] text-slate-400">
                  {form.brandIntro.length} / 500
                </div>
              </section>

              {/* 6 */}
              <section className="border-b border-slate-200 py-7">
                <FieldLabel number="6" title="현재 가장 고민되는 부분은 무엇인가요?" />
                <textarea
                  value={form.mainConcern}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, mainConcern: e.target.value }))
                  }
                  rows={4}
                  maxLength={500}
                  placeholder="예: 브랜드가 잘 기억되지 않음 / 콘텐츠 방향이 안 잡힘 / 문의나 구매로 이어지지 않음 / 꾸준히 운영할 사람이 없음 등"
                  className="w-full resize-none border border-slate-200 bg-white px-4 py-3 text-[13px] leading-[1.8] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-900"
                />
                <div className="mt-2 text-right text-[11px] text-slate-400">
                  {form.mainConcern.length} / 500
                </div>
              </section>

              {/* 7 */}
              <section className="border-b border-slate-200 py-7">
                <FieldLabel number="7" title="없는마케팅을 통해 얻고 싶은 결과는 무엇인가요?" />
                <textarea
                  value={form.desiredOutcome}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, desiredOutcome: e.target.value }))
                  }
                  rows={4}
                  maxLength={500}
                  placeholder="예: 브랜드 인지도 상승 / 첫 콘텐츠 제작 / 채널 운영 구조 만들기 / 브랜드 스토리 정리 / 광고·음악·챌린지 확산 등"
                  className="w-full resize-none border border-slate-200 bg-white px-4 py-3 text-[13px] leading-[1.8] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-slate-900"
                />
                <div className="mt-2 text-right text-[11px] text-slate-400">
                  {form.desiredOutcome.length} / 500
                </div>
              </section>

              {/* 8~12 */}
              <section className="border-b border-slate-200 py-8">
                <h3 className="mb-6 text-[18px] font-bold tracking-[-0.03em] text-slate-950">
                  기본 정보를 남겨주세요.
                </h3>

                <div className="grid gap-x-8 gap-y-6 md:grid-cols-3">
                  <div>
                    <FieldLabel number="8" title="브랜드명 / 회사명을 적어주세요." required />
                    <input
                      type="text"
                      value={form.companyName}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, companyName: e.target.value }))
                      }
                      placeholder="브랜드명 / 회사명 입력"
                      className="h-[42px] w-full border border-slate-200 px-3 text-[13px] outline-none placeholder:text-slate-400 focus:border-slate-900"
                    />
                  </div>

                  <div>
                    <FieldLabel number="9" title="담당자명 / 직책을 적어주세요." required />
                    <input
                      type="text"
                      value={form.managerInfo}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, managerInfo: e.target.value }))
                      }
                      placeholder="담당자명 / 직책 입력"
                      className="h-[42px] w-full border border-slate-200 px-3 text-[13px] outline-none placeholder:text-slate-400 focus:border-slate-900"
                    />
                  </div>

                  <div>
                    <FieldLabel number="10" title="연락처를 적어주세요." required />
                    <input
                      type="text"
                      value={form.phone}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, phone: e.target.value }))
                      }
                      placeholder="01012345678"
                      className="h-[42px] w-full border border-slate-200 px-3 text-[13px] outline-none placeholder:text-slate-400 focus:border-slate-900"
                    />
                  </div>

                  <div>
                    <FieldLabel number="11" title="이메일을 적어주세요." required />
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, email: e.target.value }))
                      }
                      placeholder="example@email.com"
                      className="h-[42px] w-full border border-slate-200 px-3 text-[13px] outline-none placeholder:text-slate-400 focus:border-slate-900"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <FieldLabel
                      number="12"
                      title="홈페이지 또는 SNS 채널 링크가 있다면 적어주세요."
                      hint="선택 입력"
                    />
                    <input
                      type="text"
                      value={form.website}
                      onChange={(e) =>
                        setForm((prev) => ({ ...prev, website: e.target.value }))
                      }
                      placeholder="홈페이지, 인스타그램, 유튜브, 스마트스토어 링크 등"
                      className="h-[42px] w-full border border-slate-200 px-3 text-[13px] outline-none placeholder:text-slate-400 focus:border-slate-900"
                    />
                  </div>
                </div>
              </section>

              {/* AGREEMENT / SUBMIT */}
              <section className="py-8">
                <label className="flex cursor-pointer items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={form.privacyAgreed}
                    onChange={(e) =>
                      setForm((prev) => ({ ...prev, privacyAgreed: e.target.checked }))
                    }
                    className="h-[15px] w-[15px] border-slate-300 text-slate-900 focus:ring-slate-400"
                  />
                  <span className="text-[13px] font-medium tracking-[-0.02em] text-slate-700">
                    개인정보 수집 및 이용에 동의합니다.{" "}
                    <span className="text-slate-500">(필수)</span>
                  </span>
                </label>

                {submitError ? (
                  <p className="mt-5 border border-red-200 bg-red-50 px-4 py-3 text-[13px] font-medium text-red-600">
                    {submitError}
                  </p>
                ) : null}

                {submitMessage ? (
                  <p className="mt-5 border border-green-200 bg-green-50 px-4 py-3 text-[13px] font-medium text-green-700">
                    {submitMessage}
                  </p>
                ) : null}

                <div className="mt-10 flex justify-center">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-[52px] min-w-[280px] bg-[#0f172a] px-10 text-[15px] font-bold tracking-[-0.03em] text-white transition hover:bg-[#111827] disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isSubmitting ? "전송 중입니다..." : "문의 내용 보내기 →"}
                  </button>
                </div>
              </section>
            </div>
          </form>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const sections = [
  {
    title: "제1조 사이트 정보",
    body: [
      "본 웹사이트는 없는마케팅의 브랜드 소개, 서비스 안내, 상담 및 문의 접수를 위해 운영됩니다.",
      "웹사이트에 게시된 모든 정보는 이용자의 이해를 돕기 위한 목적으로 제공됩니다.",
    ],
  },
  {
    title: "제2조 콘텐츠의 저작권",
    body: [
      "본 웹사이트에 포함된 텍스트, 이미지, 영상, 디자인, 구성, 로고 및 기타 콘텐츠의 권리는 없는마케팅 또는 정당한 권리자에게 있습니다.",
      "사전 동의 없이 콘텐츠를 복제, 배포, 수정, 전송, 게시하거나 상업적으로 이용할 수 없습니다.",
    ],
  },
  {
    title: "제3조 서비스 정보의 변경",
    body: [
      "웹사이트에 게시된 서비스 내용, 가격, 진행 방식, 제공 범위는 운영 상황에 따라 변경될 수 있습니다.",
      "실제 계약 및 프로젝트 진행 조건은 개별 협의 또는 계약서의 내용을 우선합니다.",
    ],
  },
  {
    title: "제4조 외부 링크",
    body: [
      "본 웹사이트는 이용자의 편의를 위해 외부 웹사이트 또는 플랫폼으로 연결되는 링크를 포함할 수 있습니다.",
      "외부 사이트의 콘텐츠, 정책, 서비스 운영에 대해서는 해당 사이트의 기준이 적용됩니다.",
    ],
  },
  {
    title: "제5조 책임 제한",
    body: [
      "없는마케팅은 웹사이트 정보의 정확성과 최신성을 유지하기 위해 노력합니다.",
      "다만 웹사이트 정보 이용으로 인해 발생하는 직접적 또는 간접적 손해에 대해서는 이용자의 사용 환경과 판단에 따라 책임 범위가 제한될 수 있습니다.",
    ],
  },
  {
    title: "제6조 마케팅 성과 관련 고지",
    body: [
      "콘텐츠 및 마케팅 성과는 브랜드 상태, 예산, 플랫폼 환경, 소재, 시장 상황, 타이밍 등에 따라 달라질 수 있습니다.",
      "웹사이트에 언급된 사례와 수치는 특정 결과를 보장하는 의미가 아닙니다.",
    ],
  },
  {
    title: "제7조 무단 사용 금지",
    body: [
      "없는마케팅의 명칭, 로고, 콘텐츠, 서비스 소개 문구, 기획 구조를 무단으로 사용하거나 제3자에게 제공할 수 없습니다.",
      "무단 사용으로 인해 권리 침해가 발생할 경우 필요한 조치를 취할 수 있습니다.",
    ],
  },
  {
    title: "제8조 문의",
    body: [
      "본 법적고지와 관련한 문의는 아래 연락처를 통해 접수할 수 있습니다.",
      "Business Inquiry: contact@upneun.co.kr",
    ],
  },
];

export default function LegalPage() {
  return (
    <>
      <SiteHeader />

      <main className="bg-white text-[#08111f]">
        <section className="border-b border-slate-100 pb-[72px] pt-[120px]">
          <div className="mx-auto max-w-[980px] px-6 md:px-0">
            <p className="mb-5 text-[12px] font-black uppercase tracking-[0.42em] text-blue-600">
              Legal Notice
            </p>

            <h1 className="text-[42px] font-black leading-[1.16] tracking-[-0.07em] md:text-[58px]">
              법적고지
            </h1>

            <p className="mt-6 max-w-[640px] text-[15px] font-medium leading-[1.9] tracking-[-0.04em] text-slate-600 md:text-[16px]">
              없는마케팅 웹사이트에 게시된 정보, 콘텐츠, 권리 및 책임 범위에
              관한 안내입니다.
            </p>

            <div className="mt-10 flex flex-wrap gap-3 text-[13px] font-bold tracking-[-0.03em] text-slate-500">
              <span className="rounded-full border border-slate-200 px-4 py-2">
                시행일 2026.01.01
              </span>
              <span className="rounded-full border border-slate-200 px-4 py-2">
                없는마케팅
              </span>
            </div>
          </div>
        </section>

        <section className="py-[72px] md:py-[92px]">
          <div className="mx-auto max-w-[980px] px-6 md:px-0">
            <div className="grid gap-12 md:grid-cols-[220px_1fr]">
              <aside className="hidden md:block">
                <div className="sticky top-[110px] border-l border-slate-200 pl-5">
                  <p className="mb-4 text-[12px] font-black uppercase tracking-[0.32em] text-blue-600">
                    Index
                  </p>
                  <div className="space-y-2 text-[13px] font-bold leading-[1.6] tracking-[-0.03em] text-slate-400">
                    <p>사이트 정보</p>
                    <p>저작권</p>
                    <p>서비스 정보</p>
                    <p>책임 제한</p>
                    <p>무단 사용 금지</p>
                  </div>
                </div>
              </aside>

              <div>
                {sections.map((section, index) => (
                  <article
                    key={section.title}
                    className="border-b border-slate-200 py-9 first:pt-0"
                  >
                    <div className="flex gap-6">
                      <span className="mt-1 hidden h-8 w-8 shrink-0 items-center justify-center rounded-full border border-blue-200 text-[12px] font-black text-blue-600 md:flex">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div>
                        <h2 className="text-[22px] font-black leading-[1.35] tracking-[-0.06em] md:text-[26px]">
                          {section.title}
                        </h2>

                        <div className="mt-5 space-y-3">
                          {section.body.map((text) => (
                            <p
                              key={text}
                              className="text-[14px] font-medium leading-[1.9] tracking-[-0.04em] text-slate-600 md:text-[15px]"
                            >
                              {text}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}
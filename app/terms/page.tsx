import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const sections = [
  {
    title: "제1조 목적",
    body: [
      "본 약관은 없는마케팅이 제공하는 웹사이트 및 관련 서비스의 이용과 관련하여 회사와 이용자 간의 권리, 의무 및 책임사항을 정하는 것을 목적으로 합니다.",
    ],
  },
  {
    title: "제2조 용어의 정의",
    body: [
      "‘회사’란 없는마케팅을 의미합니다.",
      "‘서비스’란 회사가 웹사이트를 통해 제공하는 브랜드 진단, 콘텐츠 기획, 마케팅 상담, 제작 문의 및 관련 정보를 의미합니다.",
      "‘이용자’란 본 웹사이트에 접속하여 서비스를 이용하는 모든 방문자 및 문의자를 의미합니다.",
    ],
  },
  {
    title: "제3조 약관의 효력 및 변경",
    body: [
      "본 약관은 웹사이트에 게시함으로써 효력이 발생합니다.",
      "회사는 필요한 경우 관련 법령을 위반하지 않는 범위에서 본 약관을 변경할 수 있습니다.",
      "변경된 약관은 웹사이트에 게시된 시점부터 효력이 발생합니다.",
    ],
  },
  {
    title: "제4조 서비스의 제공",
    body: [
      "회사는 브랜드 스토리 설계, 콘텐츠 기획, 숏폼 및 영상 콘텐츠 제작, 마케팅 전략 상담 등 브랜드 성장에 필요한 서비스를 제공합니다.",
      "서비스의 구체적인 범위와 진행 방식은 이용자의 문의 내용 및 협의에 따라 달라질 수 있습니다.",
    ],
  },
  {
    title: "제5조 서비스 이용 및 문의",
    body: [
      "이용자는 웹사이트 내 문의 양식 또는 회사가 안내한 연락 수단을 통해 서비스 문의를 할 수 있습니다.",
      "이용자는 문의 시 정확한 정보를 제공해야 하며, 허위 정보로 인해 발생하는 문제에 대한 책임은 이용자에게 있습니다.",
    ],
  },
  {
    title: "제6조 회사의 의무",
    body: [
      "회사는 안정적인 서비스 제공을 위해 필요한 노력을 다합니다.",
      "회사는 이용자의 개인정보를 관련 법령 및 개인정보처리방침에 따라 보호합니다.",
      "회사는 이용자의 문의 내용과 브랜드 정보를 외부에 무단으로 공개하지 않습니다.",
    ],
  },
  {
    title: "제7조 이용자의 의무",
    body: [
      "이용자는 서비스 이용 시 관련 법령, 본 약관 및 회사의 안내사항을 준수해야 합니다.",
      "이용자는 타인의 권리를 침해하거나 회사의 정상적인 서비스 운영을 방해하는 행위를 해서는 안 됩니다.",
      "이용자는 문의 또는 상담 과정에서 타인의 저작권, 초상권, 상표권 등 권리를 침해하는 자료를 제공해서는 안 됩니다.",
    ],
  },
  {
    title: "제8조 저작권 및 콘텐츠 권리",
    body: [
      "회사가 제작한 기획안, 문구, 영상, 디자인, 콘텐츠 구조 및 기타 산출물의 권리는 별도 계약 또는 협의 내용에 따릅니다.",
      "이용자는 회사의 사전 동의 없이 회사가 제공한 자료를 무단 복제, 배포, 수정, 판매하거나 제3자에게 제공할 수 없습니다.",
      "프로젝트 진행 중 제공되는 레퍼런스, 초안, 제안서는 최종 계약 여부와 관계없이 회사의 지식재산으로 보호될 수 있습니다.",
    ],
  },
  {
    title: "제9조 계약 및 비용",
    body: [
      "서비스 비용, 범위, 일정, 납품 방식은 개별 협의 또는 계약서에 따릅니다.",
      "계약 체결 전 제공되는 상담이나 제안의 범위는 회사의 내부 기준에 따라 제한될 수 있습니다.",
      "이미 진행된 기획, 제작, 촬영, 편집, 운영 업무에 대한 비용은 협의된 기준에 따라 청구될 수 있습니다.",
    ],
  },
  {
    title: "제10조 서비스의 제한 및 중단",
    body: [
      "회사는 시스템 점검, 서버 장애, 천재지변, 운영상 필요 등 부득이한 사유가 있는 경우 서비스 제공을 일시적으로 제한하거나 중단할 수 있습니다.",
      "회사는 이용자가 본 약관을 위반하거나 부정한 목적으로 서비스를 이용하는 경우 서비스 이용을 제한할 수 있습니다.",
    ],
  },
  {
    title: "제11조 면책사항",
    body: [
      "회사는 이용자가 제공한 정보의 오류 또는 누락으로 인해 발생한 문제에 대해 책임을 지지 않습니다.",
      "마케팅 및 콘텐츠 성과는 플랫폼 환경, 예산, 소재, 타이밍, 시장 상황 등에 따라 달라질 수 있으며, 회사는 특정 수치의 성과를 보장하지 않습니다.",
      "회사는 이용자의 귀책사유로 발생한 손해에 대해 책임을 지지 않습니다.",
    ],
  },
  {
    title: "제12조 개인정보 보호",
    body: [
      "회사는 이용자의 개인정보를 개인정보처리방침에 따라 처리합니다.",
      "개인정보의 수집, 이용, 보관 및 파기에 관한 구체적인 사항은 별도의 개인정보처리방침에서 확인할 수 있습니다.",
    ],
  },
  {
    title: "제13조 분쟁 해결",
    body: [
      "회사와 이용자 간 분쟁이 발생한 경우 양 당사자는 원만한 해결을 위해 성실히 협의합니다.",
      "협의로 해결되지 않는 분쟁은 관련 법령 및 관할 법원의 판단에 따릅니다.",
    ],
  },
  {
    title: "제14조 문의",
    body: [
      "본 약관과 관련한 문의는 아래 연락처를 통해 접수할 수 있습니다.",
      "Business Inquiry: contact@upneun.co.kr",
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <SiteHeader />

      <main className="bg-white text-[#08111f]">
        <section className="border-b border-slate-100 pt-[120px] pb-[72px]">
          <div className="mx-auto max-w-[980px] px-6 md:px-0">
            <p className="mb-5 text-[12px] font-black uppercase tracking-[0.42em] text-blue-600">
              Terms of Service
            </p>

            <h1 className="text-[42px] font-black leading-[1.16] tracking-[-0.07em] md:text-[58px]">
              이용 약관
            </h1>

            <p className="mt-6 max-w-[620px] text-[15px] font-medium leading-[1.9] tracking-[-0.04em] text-slate-600 md:text-[16px]">
              없는마케팅 웹사이트 및 서비스 이용과 관련된 기본 약관입니다.
              <br />
              문의, 상담, 제작 진행 시 아래 내용을 기준으로 합니다.
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
                    <p>목적</p>
                    <p>서비스 제공</p>
                    <p>권리와 의무</p>
                    <p>저작권</p>
                    <p>면책사항</p>
                    <p>분쟁 해결</p>
                  </div>
                </div>
              </aside>

              <div className="space-y-0">
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
                        <h2 className="text-[22px] font-black leading-[1.35] tracking-[-0.06em] text-[#08111f] md:text-[26px]">
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
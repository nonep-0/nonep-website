import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const sections = [
  {
    title: "제1조 개인정보의 처리 목적",
    body: [
      "없는마케팅은 문의 응대, 서비스 상담, 프로젝트 제안, 계약 진행 및 고객 관리의 목적으로 개인정보를 처리합니다.",
      "수집된 개인정보는 명시된 목적 이외의 용도로 사용되지 않으며, 이용 목적이 변경되는 경우 별도의 안내 또는 동의를 받습니다.",
    ],
  },
  {
    title: "제2조 수집하는 개인정보 항목",
    body: [
      "회사는 문의 과정에서 이름, 연락처, 이메일 주소, 회사명, 브랜드명, 문의 내용 등을 수집할 수 있습니다.",
      "서비스 이용 과정에서 접속 기록, 쿠키, IP 주소, 브라우저 정보 등이 자동으로 수집될 수 있습니다.",
    ],
  },
  {
    title: "제3조 개인정보의 처리 및 보유 기간",
    body: [
      "개인정보는 수집 및 이용 목적이 달성된 후 지체 없이 파기합니다.",
      "다만 관계 법령에 따라 보존할 필요가 있는 경우 해당 법령에서 정한 기간 동안 보관할 수 있습니다.",
    ],
  },
  {
    title: "제4조 개인정보의 제3자 제공",
    body: [
      "없는마케팅은 이용자의 개인정보를 원칙적으로 외부에 제공하지 않습니다.",
      "다만 이용자의 동의가 있거나 법령에 따라 요구되는 경우에는 예외적으로 제공될 수 있습니다.",
    ],
  },
  {
    title: "제5조 개인정보 처리의 위탁",
    body: [
      "회사는 원활한 서비스 제공을 위해 필요한 경우 일부 업무를 외부 업체에 위탁할 수 있습니다.",
      "위탁이 발생하는 경우 개인정보가 안전하게 처리될 수 있도록 필요한 관리와 감독을 진행합니다.",
    ],
  },
  {
    title: "제6조 정보주체의 권리",
    body: [
      "이용자는 언제든지 본인의 개인정보에 대해 열람, 정정, 삭제, 처리 정지를 요청할 수 있습니다.",
      "관련 요청은 회사의 이메일을 통해 접수할 수 있으며, 회사는 관련 법령에 따라 필요한 조치를 진행합니다.",
    ],
  },
  {
    title: "제7조 개인정보의 파기",
    body: [
      "개인정보의 보유 기간이 경과하거나 처리 목적이 달성된 경우 해당 정보를 지체 없이 파기합니다.",
      "전자적 파일 형태의 정보는 복구할 수 없는 방식으로 삭제하며, 종이 문서는 분쇄 또는 소각합니다.",
    ],
  },
  {
    title: "제8조 개인정보의 안전성 확보 조치",
    body: [
      "회사는 개인정보의 안전한 관리를 위해 접근 권한 제한, 보안 프로그램 관리, 내부 관리 절차 수립 등 필요한 조치를 취합니다.",
    ],
  },
  {
    title: "제9조 쿠키의 사용",
    body: [
      "웹사이트는 이용자의 편의와 서비스 개선을 위해 쿠키를 사용할 수 있습니다.",
      "이용자는 브라우저 설정을 통해 쿠키 저장을 거부하거나 삭제할 수 있습니다.",
    ],
  },
  {
    title: "제10조 개인정보 보호책임자",
    body: [
      "개인정보 관련 문의는 아래 연락처를 통해 접수할 수 있습니다.",
      "Business Inquiry: contact@upneun.co.kr",
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />

      <main className="bg-white text-[#08111f]">
        <section className="border-b border-slate-100 pb-[72px] pt-[120px]">
          <div className="mx-auto max-w-[980px] px-6 md:px-0">
            <p className="mb-5 text-[12px] font-black uppercase tracking-[0.42em] text-blue-600">
              Privacy Policy
            </p>

            <h1 className="text-[42px] font-black leading-[1.16] tracking-[-0.07em] md:text-[58px]">
              개인정보처리방침
            </h1>

            <p className="mt-6 max-w-[640px] text-[15px] font-medium leading-[1.9] tracking-[-0.04em] text-slate-600 md:text-[16px]">
              없는마케팅은 이용자의 개인정보를 안전하게 보호하고,
              <br />
              관련 법령에 따라 필요한 범위 안에서 개인정보를 처리합니다.
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
                    <p>처리 목적</p>
                    <p>수집 항목</p>
                    <p>보유 기간</p>
                    <p>제3자 제공</p>
                    <p>파기</p>
                    <p>보호책임자</p>
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
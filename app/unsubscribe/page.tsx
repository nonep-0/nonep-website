import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

const sections = [
  {
    title: "이메일 주소 무단 수집 거부",
    body: [
      "본 웹사이트에 게시된 이메일 주소가 전자우편 수집 프로그램이나 그 밖의 기술적 장치를 이용하여 무단으로 수집되는 것을 거부합니다.",
      "이를 위반하여 무단으로 이메일 주소를 수집하거나 영리 목적의 광고성 정보를 발송하는 행위는 관련 법령에 따라 제재를 받을 수 있습니다.",
    ],
  },
  {
    title: "수집 금지 대상",
    body: [
      "웹사이트에 게시된 회사 이메일, 문의용 이메일, 담당자 연락처 등은 무단 수집의 대상이 될 수 없습니다.",
      "이메일 주소는 이용자의 정당한 문의 및 회사와의 정상적인 커뮤니케이션을 위한 용도로만 사용할 수 있습니다.",
    ],
  },
  {
    title: "광고성 정보 발송 금지",
    body: [
      "사전 동의 없이 회사 이메일로 광고성 정보, 홍보성 자료, 스팸성 메일을 발송하는 행위를 금지합니다.",
      "반복적이거나 악의적인 발송 행위에 대해서는 필요한 차단 및 대응 조치를 진행할 수 있습니다.",
    ],
  },
  {
    title: "문의",
    body: [
      "본 고지와 관련한 문의는 아래 연락처를 통해 접수할 수 있습니다.",
      "Business Inquiry: contact@upneun.co.kr",
    ],
  },
];

export default function UnsubscribePage() {
  return (
    <>
      <SiteHeader />

      <main className="bg-white text-[#08111f]">
        <section className="border-b border-slate-100 pb-[72px] pt-[120px]">
          <div className="mx-auto max-w-[980px] px-6 md:px-0">
            <p className="mb-5 text-[12px] font-black uppercase tracking-[0.42em] text-blue-600">
              Email Collection Rejection
            </p>

            <h1 className="text-[42px] font-black leading-[1.16] tracking-[-0.07em] md:text-[58px]">
              이메일 무단 수집거부
            </h1>

            <p className="mt-6 max-w-[680px] text-[15px] font-medium leading-[1.9] tracking-[-0.04em] text-slate-600 md:text-[16px]">
              없는마케팅 웹사이트에 게시된 이메일 주소의 무단 수집 및
              광고성 정보 발송을 거부합니다.
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
                    <p>무단 수집 거부</p>
                    <p>수집 금지 대상</p>
                    <p>광고성 정보 금지</p>
                    <p>문의</p>
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
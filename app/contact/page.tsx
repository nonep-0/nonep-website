import { sendContactAction } from "./actions";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type ContactPageProps = {
  searchParams: Promise<{
    success?: string;
    error?: string;
  }>;
};

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const params = await searchParams;

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden border-t border-[#ff1493]/50 pt-[76px]">
        <div className="absolute inset-0">
          <img
            src="/source/contact-main.png"
            alt="NONEP Contact"
            className="h-full w-full object-cover object-center"
          />
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.92)_0%,rgba(0,0,0,0.68)_48%,rgba(0,0,0,0.42)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.54)_58%,rgba(0,0,0,1)_100%)]" />

        <div className="relative mx-auto flex min-h-[360px] max-w-[1280px] items-end px-6 py-16 md:min-h-[430px] md:px-8 md:py-20">
          <div>
            <p className="mb-4 text-[11px] font-black uppercase tracking-[0.34em] text-[#ff1493]">
              NONEP Contact
            </p>

            <h1 className="text-[52px] font-black uppercase leading-none tracking-[0.12em] text-white md:text-[86px]">
              Contact
            </h1>

            <p className="mt-6 max-w-[640px] text-[15px] font-semibold leading-[1.9] text-white/62">
              Send us your project, demo, collaboration idea, or production
              inquiry.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 py-14 md:px-8 md:py-16">
        {params.success ? (
          <div className="mb-6 rounded-[18px] border border-[#ff1493]/40 bg-[#ff1493]/10 px-5 py-4 text-[13px] font-bold text-[#ff1493]">
            {params.success}
          </div>
        ) : null}

        {params.error ? (
          <div className="mb-6 rounded-[18px] border border-red-500/40 bg-red-500/10 px-5 py-4 text-[13px] font-bold text-red-300">
            전송 실패: {params.error}
          </div>
        ) : null}

        <div className="grid gap-10 lg:grid-cols-[520px_1fr]">
          <div className="overflow-hidden border border-white/10 bg-[#08080c]">
            <img
              src="/source/contact-main.png"
              alt="NONEP"
              className="aspect-square w-full object-cover"
            />
          </div>

          <form action={sendContactAction} className="relative z-10">
            <div className="grid gap-6">
              <label className="block">
                <span className="mb-3 block text-[13px] font-black text-white">
                  Name <span className="text-[#ff1493]">*</span>
                </span>

                <input
                  name="name"
                  required
                  placeholder="이민영"
                  className="h-[48px] w-full rounded-none border border-white/16 bg-black px-4 text-[14px] font-bold text-white outline-none transition placeholder:text-white/28 focus:border-[#ff1493]"
                />
              </label>

              <label className="block">
                <span className="mb-3 block text-[13px] font-black text-white">
                  Email <span className="text-[#ff1493]">*</span>
                </span>

                <input
                  name="email"
                  type="email"
                  required
                  placeholder="contact@upneun.co.kr"
                  className="h-[48px] w-full rounded-none border border-white/16 bg-black px-4 text-[14px] font-bold text-white outline-none transition placeholder:text-white/28 focus:border-[#ff1493]"
                />
              </label>

              <label className="block">
                <span className="mb-3 block text-[13px] font-black text-white">
                  Message <span className="text-[#ff1493]">*</span>
                </span>

                <textarea
                  name="message"
                  required
                  rows={9}
                  placeholder="문의 내용을 입력해주세요."
                  className="w-full resize-none rounded-none border border-white/16 bg-black px-4 py-4 text-[14px] font-bold leading-[1.8] text-white outline-none transition placeholder:text-white/28 focus:border-[#ff1493]"
                />
              </label>

              <label className="block">
                <span className="mb-3 block text-[13px] font-black text-white">
                  Demo File
                </span>

                <input
                  name="demo_file"
                  type="file"
                  className="block h-[48px] w-full cursor-pointer border border-white/16 bg-black text-[13px] font-bold text-white/60 file:mr-4 file:h-full file:border-0 file:bg-[#151018] file:px-5 file:text-[12px] file:font-black file:text-[#ff1493]"
                />
              </label>

              <button
                type="submit"
                className="relative z-20 h-[56px] w-full cursor-pointer bg-[#ff1493] text-[13px] font-black uppercase tracking-[0.22em] text-white transition hover:bg-white hover:text-black active:scale-[0.99]"
              >
                Send Inquiry ✦
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
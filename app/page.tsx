export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-950">
      <section className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-sm font-bold text-blue-600">
          없는마케팅
        </p>

        <h1 className="text-4xl font-extrabold leading-tight md:text-6xl">
          브랜드에 없는 이야기를 만들고,
          <br />
          <span className="text-blue-600">스토리로 팔리게</span> 합니다.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-600">
          없는마케팅은 단순히 콘텐츠를 만드는 것이 아니라,
          브랜드가 기억되고 선택되도록 이야기의 구조를 설계합니다.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <a
            href="#contact"
            className="rounded-full bg-blue-600 px-8 py-4 text-base font-bold text-white transition hover:bg-blue-700"
          >
            문의하기
          </a>

          <a
            href="#service"
            className="rounded-full border border-slate-300 px-8 py-4 text-base font-bold text-slate-900 transition hover:bg-slate-100"
          >
            서비스 보기
          </a>
        </div>
      </section>
    </main>
  );
}
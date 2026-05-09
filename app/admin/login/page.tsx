import { loginAdmin } from "./actions";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const hasError = params.error === "1";

  return (
    <main className="min-h-screen bg-[#f8fafc] px-6 py-20 text-[#020617]">
      <section className="mx-auto flex min-h-[70vh] max-w-[420px] flex-col justify-center">
        <div className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_24px_80px_rgba(15,23,42,0.08)]">
          <p className="mb-4 text-[12px] font-bold tracking-[0.35em] text-blue-600">
            UPNEUN ADMIN
          </p>

          <h1 className="text-[32px] font-black tracking-[-0.06em]">
            관리자 로그인
          </h1>

          <p className="mt-3 text-[14px] font-medium leading-[1.7] text-slate-500">
            없는마케팅 문의 내역과 사이트 정보를 관리합니다.
          </p>

          <form action={loginAdmin} className="mt-8 space-y-4">
            <div>
              <label className="mb-2 block text-[13px] font-bold text-slate-700">
                관리자 비밀번호
              </label>
              <input
                type="password"
                name="password"
                required
                className="h-[52px] w-full rounded-[14px] border border-slate-200 bg-slate-50 px-4 text-[15px] font-semibold outline-none transition focus:border-blue-600 focus:bg-white"
                placeholder="비밀번호 입력"
              />
            </div>

            {hasError && (
              <p className="rounded-[12px] border border-red-200 bg-red-50 px-4 py-3 text-[13px] font-semibold text-red-600">
                비밀번호가 맞지 않습니다.
              </p>
            )}

            <button
              type="submit"
              className="h-[54px] w-full rounded-[14px] bg-[#020617] text-[15px] font-black tracking-[-0.03em] text-white transition hover:bg-blue-600"
            >
              로그인
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
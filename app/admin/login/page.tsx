import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { loginAdminAction } from "./actions";

export const metadata = {
  title: "Admin Login | NONEP",
  description: "NONEP admin login page.",
};

export const dynamic = "force-dynamic";
export const revalidate = 0;

const ADMIN_COOKIE_NAME = "nonep_admin_session";

type AdminLoginPageProps = {
  searchParams: Promise<{
    error?: string;
    from?: string;
  }>;
};

export default async function AdminLoginPage({
  searchParams,
}: AdminLoginPageProps) {
  const params = await searchParams;
  const cookieStore = await cookies();

  const adminPassword = process.env.ADMIN_PASSWORD;
  const sessionCookie = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (adminPassword && sessionCookie === adminPassword) {
    redirect("/admin");
  }

  const from = params.from || "/admin";

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_18%,rgba(255,20,147,0.24),transparent_32%),linear-gradient(180deg,#090009_0%,#000000_72%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.12)_0%,rgba(0,0,0,0.72)_100%)]" />

        <div className="relative w-full max-w-[460px] rounded-[30px] border border-white/10 bg-[#08080c] p-7 shadow-[0_0_48px_rgba(255,20,147,0.14)] md:p-9">
          <div className="mb-8">
            <p className="text-[11px] font-black uppercase tracking-[0.34em] text-[#ff1493]">
              NONEP Admin
            </p>

            <h1 className="mt-4 text-[42px] font-black uppercase leading-none tracking-[0.08em] text-white md:text-[54px]">
              Login
            </h1>

            <p className="mt-5 text-[14px] font-semibold leading-[1.8] text-white/52">
              Enter the administrator password to access the NONEP management
              pages.
            </p>
          </div>

          {params.error ? (
            <div className="mb-6 rounded-[16px] border border-red-500/40 bg-red-500/10 px-4 py-3 text-[13px] font-bold text-red-300">
              {params.error}
            </div>
          ) : null}

          <form action={loginAdminAction} className="space-y-5">
            <input type="hidden" name="from" value={from} />

            <label className="block">
              <span className="mb-3 block text-[12px] font-black uppercase tracking-[0.18em] text-white/62">
                Password
              </span>

              <input
                name="password"
                type="password"
                required
                autoFocus
                placeholder="Enter admin password"
                className="h-[52px] w-full rounded-[16px] border border-white/12 bg-black px-4 text-[15px] font-bold text-white outline-none transition placeholder:text-white/24 focus:border-[#ff1493]/80"
              />
            </label>

            <button
              type="submit"
              className="h-[52px] w-full rounded-[16px] bg-[#ff1493] text-[12px] font-black uppercase tracking-[0.22em] text-black transition hover:bg-white active:scale-[0.99]"
            >
              Enter Admin
            </button>
          </form>

          <div className="mt-7 border-t border-white/10 pt-5">
            <p className="text-[12px] font-semibold leading-[1.8] text-white/38">
              Unauthorized access to the administrator area is prohibited.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
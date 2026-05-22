import Link from "next/link";

const adminNavItems = [
  { href: "/admin", label: "대시보드" },
  { href: "/admin/albums", label: "앨범 관리" },
  { href: "/admin/producers", label: "프로듀서 관리" },
  { href: "/admin/directors", label: "디렉터 관리" },
];

export default function AdminShell({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <main className="min-h-screen bg-black text-white">
      <section className="border-b border-[#ff1493]/40 bg-[#050507] pt-[76px]">
        <div className="mx-auto max-w-[1280px] px-6 py-10 md:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-3 text-[11px] font-black uppercase tracking-[0.32em] text-[#ff1493]">
                NONEP 관리자
              </p>

              <h1 className="text-[42px] font-black uppercase leading-none tracking-[0.08em] text-white md:text-[64px]">
                {title}
              </h1>

              <p className="mt-5 max-w-[720px] text-[14px] font-semibold leading-[1.8] text-white/54 md:text-[15px]">
                {description}
              </p>
            </div>

            <Link
              href="/"
              className="inline-flex h-[42px] items-center justify-center rounded-full border border-[#ff1493]/55 px-5 text-[10.5px] font-black uppercase tracking-[0.18em] text-white/90 transition hover:bg-[#ff1493] hover:text-black"
            >
              사이트 확인
            </Link>
          </div>

          <nav className="mt-8 flex flex-wrap gap-2">
            {adminNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white/62 transition hover:border-[#ff1493]/70 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 py-10 md:px-8 md:py-14">
        {children}
      </section>
    </main>
  );
}
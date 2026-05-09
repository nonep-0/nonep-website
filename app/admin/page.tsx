import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { logoutAdmin } from "./login/actions";
import { deleteInquiry, updateInquiry } from "./actions";

type Inquiry = {
  id: string;
  created_at: string;
  brand_name: string | null;
  contact_name: string | null;
  position: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  difficulty: string[] | null;
  marketing_stage: string | null;
  brand_intro: string | null;
  main_concern: string | null;
  desired_result: string | null;
  budget_range: string | null;
  desired_start_time: string | null;
  status: string | null;
  admin_memo: string | null;
};

type AdminSearchParams = {
  q?: string;
  status?: string;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function display(value?: string | null) {
  return value && value.trim().length > 0 ? value : "미작성";
}

function statusLabel(status?: string | null) {
  switch (status) {
    case "new":
      return "신규";
    case "checking":
      return "확인중";
    case "done":
      return "완료";
    case "hold":
      return "보류";
    default:
      return "신규";
  }
}

function statusStyle(status?: string | null) {
  switch (status) {
    case "new":
      return "bg-blue-50 text-blue-600";
    case "checking":
      return "bg-amber-50 text-amber-600";
    case "done":
      return "bg-emerald-50 text-emerald-600";
    case "hold":
      return "bg-slate-100 text-slate-500";
    default:
      return "bg-blue-50 text-blue-600";
  }
}

function matchesSearch(item: Inquiry, keyword: string) {
  const target = [
    item.brand_name,
    item.contact_name,
    item.position,
    item.phone,
    item.email,
    item.website,
    item.brand_intro,
    item.main_concern,
    item.desired_result,
    item.admin_memo,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return target.includes(keyword.toLowerCase());
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<AdminSearchParams>;
}) {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("upneun_admin")?.value === "true";

  if (!isAdmin) {
    redirect("/admin/login");
  }

  const params = await searchParams;
  const keyword = (params.q || "").trim();
  const statusFilter = params.status || "all";

  const { data, error } = await supabaseAdmin
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  const allInquiries = (data || []) as Inquiry[];

  const filteredInquiries = allInquiries.filter((item) => {
    const statusMatched =
      statusFilter === "all" ? true : (item.status || "new") === statusFilter;

    const keywordMatched = keyword ? matchesSearch(item, keyword) : true;

    return statusMatched && keywordMatched;
  });

  const totalCount = allInquiries.length;
  const newCount = allInquiries.filter((item) => item.status === "new").length;
  const checkingCount = allInquiries.filter(
    (item) => item.status === "checking"
  ).length;
  const doneCount = allInquiries.filter((item) => item.status === "done").length;

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#020617]">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1180px] items-center justify-between px-6">
          <div>
            <p className="text-[11px] font-black tracking-[0.35em] text-blue-600">
              UPNEUN ADMIN
            </p>
            <h1 className="mt-1 text-[22px] font-black tracking-[-0.05em]">
              문의 관리
            </h1>
          </div>

          <form action={logoutAdmin}>
            <button
              type="submit"
              className="rounded-full border border-slate-200 bg-white px-5 py-2 text-[13px] font-bold text-slate-600 transition hover:border-slate-900 hover:text-slate-950"
            >
              로그아웃
            </button>
          </form>
        </div>
      </header>

      <section className="mx-auto max-w-[1180px] px-6 py-10">
        <div className="mb-6 grid gap-4 md:grid-cols-4">
          <StatCard label="전체 문의" value={totalCount} />
          <StatCard label="신규 문의" value={newCount} accent />
          <StatCard label="확인중" value={checkingCount} />
          <StatCard label="완료 문의" value={doneCount} />
        </div>

        <div className="mb-6 rounded-[24px] border border-slate-200 bg-white p-5 shadow-[0_18px_60px_rgba(15,23,42,0.04)]">
          <form className="grid gap-3 md:grid-cols-[1fr_180px_auto_auto]">
            <input
              name="q"
              defaultValue={keyword}
              placeholder="브랜드명, 담당자명, 이메일, 연락처, 메모 검색"
              className="h-[48px] rounded-[14px] border border-slate-200 bg-slate-50 px-4 text-[14px] font-semibold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:bg-white"
            />

            <select
              name="status"
              defaultValue={statusFilter}
              className="h-[48px] rounded-[14px] border border-slate-200 bg-slate-50 px-4 text-[14px] font-bold text-slate-700 outline-none transition focus:border-blue-600 focus:bg-white"
            >
              <option value="all">전체 상태</option>
              <option value="new">신규</option>
              <option value="checking">확인중</option>
              <option value="done">완료</option>
              <option value="hold">보류</option>
            </select>

            <button
              type="submit"
              className="h-[48px] rounded-[14px] bg-[#020617] px-6 text-[14px] font-black text-white transition hover:bg-blue-600"
            >
              검색
            </button>

            <a
              href="/admin"
              className="flex h-[48px] items-center justify-center rounded-[14px] border border-slate-200 bg-white px-6 text-[14px] font-black text-slate-500 transition hover:border-slate-900 hover:text-slate-950"
            >
              초기화
            </a>
          </form>

          <p className="mt-3 text-[12px] font-bold text-slate-400">
            현재 {filteredInquiries.length}개의 문의가 표시되고 있습니다.
          </p>
        </div>

        <div className="overflow-hidden rounded-[26px] border border-slate-200 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.06)]">
          <div className="border-b border-slate-200 px-6 py-5">
            <h2 className="text-[18px] font-black tracking-[-0.04em]">
              최근 문의 목록
            </h2>
          </div>

          {filteredInquiries.length === 0 ? (
            <div className="px-6 py-20 text-center">
              <p className="text-[15px] font-bold text-slate-400">
                조건에 맞는 문의가 없습니다.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredInquiries.map((item) => (
                <details key={item.id} className="group">
                  <summary className="grid cursor-pointer gap-4 px-6 py-5 transition hover:bg-slate-50 md:grid-cols-[140px_1fr_140px_160px] md:items-center">
                    <div>
                      <span
                        className={`rounded-full px-3 py-1 text-[12px] font-black ${statusStyle(
                          item.status
                        )}`}
                      >
                        {statusLabel(item.status)}
                      </span>
                    </div>

                    <div>
                      <p className="text-[16px] font-black tracking-[-0.04em]">
                        {display(item.brand_name)}
                      </p>
                      <p className="mt-1 text-[13px] font-semibold text-slate-500">
                        {display(item.contact_name)} · {display(item.email)}
                      </p>
                    </div>

                    <p className="text-[13px] font-bold text-slate-500">
                      {display(item.phone)}
                    </p>

                    <p className="text-[12px] font-bold text-slate-400 md:text-right">
                      {formatDate(item.created_at)}
                    </p>
                  </summary>

                  <div className="bg-slate-50 px-6 pb-6">
                    <form
                      action={updateInquiry}
                      className="mb-4 rounded-[20px] border border-blue-100 bg-white p-6 shadow-[0_12px_40px_rgba(37,99,235,0.06)]"
                    >
                      <input type="hidden" name="id" value={item.id} />

                      <div className="grid gap-4 md:grid-cols-[180px_1fr_auto] md:items-end">
                        <div>
                          <label className="mb-2 block text-[12px] font-black text-slate-400">
                            문의 상태
                          </label>

                          <select
                            name="status"
                            defaultValue={item.status || "new"}
                            className="h-[48px] w-full rounded-[14px] border border-slate-200 bg-slate-50 px-4 text-[14px] font-bold text-slate-700 outline-none transition focus:border-blue-600 focus:bg-white"
                          >
                            <option value="new">신규</option>
                            <option value="checking">확인중</option>
                            <option value="done">완료</option>
                            <option value="hold">보류</option>
                          </select>
                        </div>

                        <div>
                          <label className="mb-2 block text-[12px] font-black text-slate-400">
                            관리자 메모
                          </label>

                          <input
                            name="admin_memo"
                            defaultValue={item.admin_memo || ""}
                            placeholder="예: 전화 완료 / 제안서 발송 예정 / 예산 확인 필요"
                            className="h-[48px] w-full rounded-[14px] border border-slate-200 bg-slate-50 px-4 text-[14px] font-semibold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:bg-white"
                          />
                        </div>

                        <button
                          type="submit"
                          className="h-[48px] rounded-[14px] bg-[#020617] px-6 text-[14px] font-black text-white transition hover:bg-blue-600"
                        >
                          저장
                        </button>
                      </div>
                    </form>

                    <div className="grid gap-4 rounded-[20px] border border-slate-200 bg-white p-6 md:grid-cols-2">
                      <Info label="브랜드명 / 회사명" value={item.brand_name} />
                      <Info label="담당자명 / 직책" value={item.contact_name} />
                      <Info label="연락처" value={item.phone} />
                      <Info label="이메일" value={item.email} />
                      <Info label="홈페이지 / SNS" value={item.website} />

                      <Info
                        label="어려운 점"
                        value={item.difficulty?.join(", ")}
                      />
                      <Info
                        label="마케팅 진행 정도"
                        value={item.marketing_stage}
                      />
                      <Info label="예산 범위" value={item.budget_range} />
                      <Info
                        label="진행 희망 시점"
                        value={item.desired_start_time}
                      />

                      <Info label="브랜드 소개" value={item.brand_intro} wide />
                      <Info label="현재 고민" value={item.main_concern} wide />
                      <Info
                        label="얻고 싶은 결과"
                        value={item.desired_result}
                        wide
                      />
                      <Info
                        label="관리자 메모"
                        value={item.admin_memo}
                        wide
                        highlight
                      />
                    </div>

                    <div className="mt-4 rounded-[20px] border border-red-100 bg-white p-6">
                      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className="text-[14px] font-black text-red-600">
                            문의 삭제
                          </p>
                          <p className="mt-1 text-[12px] font-semibold text-slate-400">
                            테스트 문의나 불필요한 문의를 삭제할 수 있습니다.
                          </p>
                        </div>

                        <form action={deleteInquiry}>
                          <input type="hidden" name="id" value={item.id} />
                          <button
                            type="submit"
                            className="h-[42px] rounded-[12px] border border-red-200 bg-red-50 px-5 text-[13px] font-black text-red-600 transition hover:bg-red-600 hover:text-white"
                          >
                            삭제하기
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </details>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function StatCard({
  label,
  value,
  accent,
}: {
  label: string;
  value: number;
  accent?: boolean;
}) {
  return (
    <div className="rounded-[22px] border border-slate-200 bg-white p-6">
      <p className="text-[12px] font-bold text-slate-400">{label}</p>
      <p
        className={`mt-2 text-[34px] font-black tracking-[-0.06em] ${
          accent ? "text-blue-600" : "text-[#020617]"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function Info({
  label,
  value,
  wide,
  highlight,
}: {
  label: string;
  value?: string | null;
  wide?: boolean;
  highlight?: boolean;
}) {
  return (
    <div className={wide ? "md:col-span-2" : ""}>
      <p className="mb-2 text-[12px] font-black text-slate-400">{label}</p>
      <p
        className={`whitespace-pre-line rounded-[14px] border px-4 py-3 text-[14px] font-semibold leading-[1.7] ${
          highlight
            ? "border-blue-100 bg-blue-50 text-blue-700"
            : "border-slate-100 bg-slate-50 text-slate-700"
        }`}
      >
        {display(value)}
      </p>
    </div>
  );
}
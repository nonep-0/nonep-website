import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { logoutAdmin } from "../login/actions";
import { updateSiteAsset, updateSiteContent } from "./actions";

type SiteContent = {
  id: string;
  page_key: string;
  section_key: string;
  content_key: string;
  label: string;
  value: string;
  description: string | null;
  sort_order: number;
};

type SiteAsset = {
  id: string;
  page_key: string;
  section_key: string;
  asset_key: string;
  label: string;
  url: string;
  description: string | null;
  sort_order: number;
};

function pageLabel(pageKey: string) {
  switch (pageKey) {
    case "home":
      return "HOME";
    case "about":
      return "ABOUT";
    case "service":
      return "SERVICE";
    case "contact":
      return "CONTACT";
    default:
      return pageKey.toUpperCase();
  }
}

function sectionLabel(sectionKey: string) {
  switch (sectionKey) {
    case "hero":
      return "최상단";
    case "method":
      return "핵심 구조";
    case "method_discovery":
      return "이야기 발굴 카드";
    case "method_structure":
      return "팔리는 구조 카드";
    case "method_execution":
      return "콘텐츠 실행 카드";
    case "process":
      return "단계 소개";
    case "step_01":
      return "STEP 01";
    case "step_02":
      return "STEP 02";
    case "step_03":
      return "STEP 03";
    case "step_04":
      return "STEP 04";
    case "cta":
      return "하단 문의";
    default:
      return sectionKey;
  }
}

function groupContents(contents: SiteContent[]) {
  const groups: Record<string, SiteContent[]> = {};

  contents.forEach((item) => {
    const key = `${item.page_key}__${item.section_key}`;

    if (!groups[key]) {
      groups[key] = [];
    }

    groups[key].push(item);
  });

  return groups;
}

function groupAssets(assets: SiteAsset[]) {
  const groups: Record<string, SiteAsset[]> = {};

  assets.forEach((item) => {
    const key = `${item.page_key}__${item.section_key}`;

    if (!groups[key]) {
      groups[key] = [];
    }

    groups[key].push(item);
  });

  return groups;
}

export default async function AdminSitePage() {
  const cookieStore = await cookies();
  const isAdmin = cookieStore.get("upneun_admin")?.value === "true";

  if (!isAdmin) {
    redirect("/admin/login");
  }

  const [contentsResult, assetsResult] = await Promise.all([
    supabaseAdmin
      .from("site_contents")
      .select("*")
      .order("page_key", { ascending: true })
      .order("sort_order", { ascending: true }),

    supabaseAdmin
      .from("site_assets")
      .select("*")
      .order("page_key", { ascending: true })
      .order("sort_order", { ascending: true }),
  ]);

  if (contentsResult.error) {
    throw new Error(contentsResult.error.message);
  }

  if (assetsResult.error) {
    throw new Error(assetsResult.error.message);
  }

  const contents = (contentsResult.data || []) as SiteContent[];
  const assets = (assetsResult.data || []) as SiteAsset[];

  const contentGroups = groupContents(contents);
  const assetGroups = groupAssets(assets);

  return (
    <main className="min-h-screen bg-[#f8fafc] text-[#020617]">
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-[1180px] items-center justify-between px-6">
          <div>
            <p className="text-[11px] font-black tracking-[0.35em] text-blue-600">
              UPNEUN ADMIN
            </p>
            <h1 className="mt-1 text-[22px] font-black tracking-[-0.05em]">
              사이트 관리
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="rounded-full border border-slate-200 bg-white px-5 py-2 text-[13px] font-bold text-slate-600 transition hover:border-slate-900 hover:text-slate-950"
            >
              문의 관리
            </Link>

            <form action={logoutAdmin}>
              <button
                type="submit"
                className="rounded-full border border-slate-200 bg-white px-5 py-2 text-[13px] font-bold text-slate-600 transition hover:border-slate-900 hover:text-slate-950"
              >
                로그아웃
              </button>
            </form>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-[1180px] px-6 py-10">
        <div className="mb-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-[22px] border border-slate-200 bg-white p-6">
            <p className="text-[12px] font-bold text-slate-400">관리 페이지</p>
            <p className="mt-2 text-[28px] font-black tracking-[-0.06em]">
              SERVICE
            </p>
          </div>

          <div className="rounded-[22px] border border-slate-200 bg-white p-6">
            <p className="text-[12px] font-bold text-slate-400">문구 항목</p>
            <p className="mt-2 text-[34px] font-black tracking-[-0.06em] text-blue-600">
              {contents.length}
            </p>
          </div>

          <div className="rounded-[22px] border border-slate-200 bg-white p-6">
            <p className="text-[12px] font-bold text-slate-400">이미지 항목</p>
            <p className="mt-2 text-[34px] font-black tracking-[-0.06em]">
              {assets.length}
            </p>
          </div>
        </div>

        <div className="mb-10 rounded-[26px] border border-blue-100 bg-white p-6 shadow-[0_24px_80px_rgba(37,99,235,0.06)]">
          <p className="text-[12px] font-black tracking-[0.25em] text-blue-600">
            SITE CONTENT MANAGER
          </p>
          <h2 className="mt-3 text-[28px] font-black tracking-[-0.06em]">
            서비스 페이지 문구와 이미지 경로를 수정합니다.
          </h2>
          <p className="mt-3 text-[14px] font-semibold leading-[1.7] text-slate-500">
            문구를 수정하고 저장하면 Supabase에 반영됩니다. 다음 단계에서
            실제 서비스 페이지와 연결하면 사이트 화면에도 자동 반영됩니다.
          </p>
        </div>

        <div className="space-y-10">
          <section>
            <div className="mb-4 flex items-end justify-between">
              <div>
                <p className="text-[12px] font-black tracking-[0.25em] text-blue-600">
                  TEXT
                </p>
                <h2 className="mt-2 text-[24px] font-black tracking-[-0.05em]">
                  문구 관리
                </h2>
              </div>
            </div>

            <div className="space-y-5">
              {Object.entries(contentGroups).map(([groupKey, items]) => {
                const [pageKey, sectionKey] = groupKey.split("__");

                return (
                  <details
                    key={groupKey}
                    open={sectionKey === "hero"}
                    className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.04)]"
                  >
                    <summary className="cursor-pointer border-b border-slate-100 px-6 py-5 transition hover:bg-slate-50">
                      <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className="text-[11px] font-black tracking-[0.25em] text-blue-600">
                            {pageLabel(pageKey)}
                          </p>
                          <h3 className="mt-1 text-[18px] font-black tracking-[-0.04em]">
                            {sectionLabel(sectionKey)}
                          </h3>
                        </div>

                        <p className="text-[12px] font-bold text-slate-400">
                          {items.length}개 문구
                        </p>
                      </div>
                    </summary>

                    <div className="divide-y divide-slate-100">
                      {items.map((item) => (
                        <form
                          key={item.id}
                          action={updateSiteContent}
                          className="grid gap-4 px-6 py-5 md:grid-cols-[240px_1fr_auto] md:items-start"
                        >
                          <input type="hidden" name="id" value={item.id} />

                          <div>
                            <p className="text-[14px] font-black tracking-[-0.03em]">
                              {item.label}
                            </p>
                            <p className="mt-1 text-[12px] font-semibold leading-[1.6] text-slate-400">
                              {item.description || item.content_key}
                            </p>
                            <p className="mt-2 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-500">
                              {item.section_key} / {item.content_key}
                            </p>
                          </div>

                          <textarea
                            name="value"
                            defaultValue={item.value}
                            rows={item.value.includes("\n") ? 5 : 2}
                            className="min-h-[52px] w-full resize-y rounded-[14px] border border-slate-200 bg-slate-50 px-4 py-3 text-[14px] font-semibold leading-[1.7] text-slate-700 outline-none transition focus:border-blue-600 focus:bg-white"
                          />

                          <button
                            type="submit"
                            className="h-[46px] rounded-[14px] bg-[#020617] px-5 text-[13px] font-black text-white transition hover:bg-blue-600"
                          >
                            저장
                          </button>
                        </form>
                      ))}
                    </div>
                  </details>
                );
              })}
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-end justify-between">
              <div>
                <p className="text-[12px] font-black tracking-[0.25em] text-blue-600">
                  IMAGE
                </p>
                <h2 className="mt-2 text-[24px] font-black tracking-[-0.05em]">
                  이미지 경로 관리
                </h2>
              </div>
            </div>

            <div className="space-y-5">
              {Object.entries(assetGroups).map(([groupKey, items]) => {
                const [pageKey, sectionKey] = groupKey.split("__");

                return (
                  <details
                    key={groupKey}
                    open={sectionKey === "hero"}
                    className="overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_18px_60px_rgba(15,23,42,0.04)]"
                  >
                    <summary className="cursor-pointer border-b border-slate-100 px-6 py-5 transition hover:bg-slate-50">
                      <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
                        <div>
                          <p className="text-[11px] font-black tracking-[0.25em] text-blue-600">
                            {pageLabel(pageKey)}
                          </p>
                          <h3 className="mt-1 text-[18px] font-black tracking-[-0.04em]">
                            {sectionLabel(sectionKey)}
                          </h3>
                        </div>

                        <p className="text-[12px] font-bold text-slate-400">
                          {items.length}개 이미지
                        </p>
                      </div>
                    </summary>

                    <div className="divide-y divide-slate-100">
                      {items.map((item) => (
                        <form
                          key={item.id}
                          action={updateSiteAsset}
                          className="grid gap-4 px-6 py-5 md:grid-cols-[180px_260px_1fr_auto] md:items-center"
                        >
                          <input type="hidden" name="id" value={item.id} />

                          <div>
                            <p className="text-[14px] font-black tracking-[-0.03em]">
                              {item.label}
                            </p>
                            <p className="mt-1 text-[12px] font-semibold leading-[1.6] text-slate-400">
                              {item.description || item.asset_key}
                            </p>
                            <p className="mt-2 rounded-full bg-slate-100 px-3 py-1 text-[11px] font-bold text-slate-500">
                              {item.section_key} / {item.asset_key}
                            </p>
                          </div>

                          <div className="overflow-hidden rounded-[16px] border border-slate-200 bg-slate-50">
                            {item.url ? (
                              <img
                                src={item.url}
                                alt={item.label}
                                className="h-[140px] w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-[140px] items-center justify-center text-[12px] font-bold text-slate-400">
                                이미지 없음
                              </div>
                            )}
                          </div>

                          <input
                            name="url"
                            defaultValue={item.url}
                            placeholder="/service/이미지파일명.png"
                            className="h-[48px] w-full rounded-[14px] border border-slate-200 bg-slate-50 px-4 text-[14px] font-semibold text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:bg-white"
                          />

                          <button
                            type="submit"
                            className="h-[46px] rounded-[14px] bg-[#020617] px-5 text-[13px] font-black text-white transition hover:bg-blue-600"
                          >
                            저장
                          </button>
                        </form>
                      ))}
                    </div>
                  </details>
                );
              })}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}
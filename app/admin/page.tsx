import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import AdminShell from "./components/AdminShell";
import AdminCard from "./components/AdminCard";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type TableName = "albums" | "producers" | "directors";

async function getTableCount(tableName: TableName) {
  noStore();

  try {
    const { count, error } = await supabaseAdmin
      .from(tableName)
      .select("id", {
        count: "exact",
        head: true,
      });

    if (error) {
      return 0;
    }

    return count ?? 0;
  } catch {
    return 0;
  }
}

export default async function AdminPage() {
  noStore();

  const [albumCount, producerCount, directorCount] = await Promise.all([
    getTableCount("albums"),
    getTableCount("producers"),
    getTableCount("directors"),
  ]);

  const dashboardItems = [
    {
      title: "앨범",
      count: albumCount,
      href: "/admin/albums",
      description:
        "발매 앨범, 썸네일, 크레딧, 트랙리스트, 유통 링크를 관리합니다.",
      action: "앨범 관리하기",
    },
    {
      title: "프로듀서",
      count: producerCount,
      href: "/admin/producers",
      description:
        "프로듀서 프로필, 고유 넘버, 비주얼 이미지, 연결 앨범을 관리합니다.",
      action: "프로듀서 관리하기",
    },
    {
      title: "디렉터",
      count: directorCount,
      href: "/admin/directors",
      description:
        "디렉터 프로필, 비주얼 역할, 프로필 이미지, 참여 작품을 관리합니다.",
      action: "디렉터 관리하기",
    },
  ];

  return (
    <AdminShell
      title="대시보드"
      description="NONEP 사이트에 노출되는 앨범, 프로듀서, 디렉터 데이터를 관리하는 관리자 페이지입니다."
    >
      <div className="grid items-stretch gap-5 md:grid-cols-3">
        {dashboardItems.map((item) => (
          <Link key={item.href} href={item.href} className="block h-full">
            <AdminCard title={item.title} description={item.description}>
              <div className="flex min-h-[130px] flex-col justify-end">
                <p className="text-[64px] font-black leading-none tracking-[-0.08em] text-[#ff1493]">
                  {item.count}
                </p>

                <p className="mt-6 text-[11px] font-black uppercase tracking-[0.18em] text-white/38">
                  {item.action}
                </p>
              </div>
            </AdminCard>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid items-stretch gap-5 lg:grid-cols-2">
        <AdminCard
          title="현재 개발 상태"
          description="관리자 페이지에서 입력한 데이터가 Supabase에 저장되는 구조로 연결 중입니다."
        >
          <div className="space-y-4 text-[14px] font-semibold leading-[1.8] text-white/58">
            <p>01. 관리자 페이지 기본 구조 완료</p>
            <p>02. 앨범 / 프로듀서 / 디렉터 저장 및 삭제 기능 연결</p>
            <p>03. 공개 페이지와 Supabase 데이터 연동 진행 중</p>
          </div>
        </AdminCard>

        <AdminCard
          title="데이터 연결 흐름"
          description="최종 목표는 관리자 페이지에서 입력한 내용이 실제 공개 페이지에 자동 반영되는 구조입니다."
        >
          <div className="space-y-4 text-[14px] font-semibold leading-[1.8] text-white/58">
            <p>관리자 입력 → Supabase Database 저장</p>
            <p>이미지 업로드 → Supabase Storage 저장</p>
            <p>공개 페이지 → 앨범 / 프로듀서 / 디렉터 자동 반영</p>
          </div>
        </AdminCard>
      </div>
    </AdminShell>
  );
}
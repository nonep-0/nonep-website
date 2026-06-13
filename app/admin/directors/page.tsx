import AdminShell from "../components/AdminShell";
import AdminCard, { AdminButton, AdminFileInput, AdminInput, AdminTextarea } from "../components/AdminCard";
import { createDirectorAction, deleteDirectorAction, updateDirectorAction } from "./actions";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Director = {
  id: string;
  name: string;
  slug: string | null;
  japanese_name: string | null;
  role: string | null;
  position: string | null;
  description: string | null;
  signature: string | null;
  profile_image_url: string | null;
  cover_image_url: string | null;
  display_order: number | null;
};

function DirectorFields({ director }: { director?: Partial<Director> }) {
  return (
    <>
      <div className="grid gap-5 md:grid-cols-2">
        <AdminInput label="노출 순서" name="display_order" placeholder="1" defaultValue={director?.display_order ?? ""} />
        <label className="block">
          <span className="mb-2 block text-[11px] font-black uppercase tracking-[0.18em] text-white/52">역할</span>
          <select name="role" defaultValue={director?.role || "Director"} className="h-[48px] w-full rounded-[14px] border border-white/10 bg-black px-4 text-[14px] font-semibold text-white outline-none transition focus:border-[#ff1493]/70">
            {['Director', 'Visual Director', 'Animation Director'].map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
        </label>
        <AdminInput label="이름" name="name" placeholder="Meoooong" required defaultValue={director?.name || ""} />
        <AdminInput label="슬러그" name="slug" placeholder="meoooong" defaultValue={director?.slug || ""} />
        <AdminInput label="일본어 이름" name="japanese_name" placeholder="メオーン" defaultValue={director?.japanese_name || ""} />
        <AdminInput label="포지션" name="position" placeholder="Visual Director" defaultValue={director?.position || ""} />
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <AdminFileInput label="프로필 이미지 / 새 파일 선택 시 교체" name="profile_image" />
        <AdminFileInput label="히어로 이미지 / 새 파일 선택 시 교체" name="cover_image" />
      </div>

      <div className="mt-5 grid gap-5">
        <AdminTextarea label="디렉터 설명" name="description" placeholder="디렉터 상세 페이지에 들어갈 설명을 입력하세요." defaultValue={director?.description || ""} />
        <AdminTextarea label="시그니처 문구" name="signature" placeholder="Turning sound into a visual world." rows={4} defaultValue={director?.signature || ""} />
      </div>
    </>
  );
}

export default async function AdminDirectorsPage({ searchParams }: { searchParams: Promise<{ success?: string; error?: string }> }) {
  const params = await searchParams;
  const { data: directors } = await supabaseAdmin.from("directors").select("*").order("display_order", { ascending: true }).order("created_at", { ascending: false });
  const items = (directors || []) as Director[];

  return (
    <AdminShell title="디렉터 관리" description="디렉터 프로필을 등록하고 수정합니다. 디렉터는 프로듀서 넘버를 사용하지 않습니다.">
      {params.success ? <div className="mb-5 rounded-[18px] border border-[#ff1493]/40 bg-[#ff1493]/10 px-5 py-4 text-[13px] font-bold text-[#ff1493]">{params.success}</div> : null}
      {params.error ? <div className="mb-5 rounded-[18px] border border-red-500/40 bg-red-500/10 px-5 py-4 text-[13px] font-bold text-red-300">저장 실패: {params.error}</div> : null}

      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <AdminCard title="디렉터 등록" description="디렉터 이름, 역할, 프로필 이미지, 설명, 연결 앨범을 입력합니다.">
          <form action={createDirectorAction}>
            <DirectorFields />
            <div className="mt-8 flex flex-wrap gap-3"><AdminButton type="submit">디렉터 저장</AdminButton></div>
          </form>
        </AdminCard>

        <AdminCard title="등록된 디렉터" description="Supabase에 저장된 디렉터 목록입니다.">
          <div className="space-y-3">
            {items.map((director) => (
              <div key={director.id} className="rounded-[18px] border border-white/8 bg-black px-4 py-4">
                <p className="text-[18px] font-black text-white">{director.name}</p>
                {director.japanese_name ? <p className="mt-1 text-[12px] font-black text-[#ff1493]">{director.japanese_name}</p> : null}
                <p className="mt-3 text-[12px] font-semibold text-white/42">{director.position || director.role}</p>

                <details className="mt-4 rounded-[16px] border border-white/10 bg-white/[0.025] p-4">
                  <summary className="cursor-pointer text-[12px] font-black uppercase tracking-[0.16em] text-[#ff1493]">수정 열기</summary>
                  <form action={updateDirectorAction} className="mt-5">
                    <input type="hidden" name="id" value={director.id} />
                    <DirectorFields director={director} />
                    <div className="mt-6 flex flex-wrap gap-3"><AdminButton type="submit">수정 저장</AdminButton></div>
                  </form>
                </details>

                <form action={deleteDirectorAction} className="mt-4">
                  <input type="hidden" name="id" value={director.id} />
                  <AdminButton type="submit" variant="danger">삭제</AdminButton>
                </form>
              </div>
            ))}
            {items.length === 0 ? <p className="text-[13px] font-semibold text-white/42">아직 등록된 디렉터가 없습니다.</p> : null}
          </div>
        </AdminCard>
      </div>
    </AdminShell>
  );
}

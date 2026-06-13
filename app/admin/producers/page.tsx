import AdminShell from "../components/AdminShell";
import AdminCard, { AdminButton, AdminFileInput, AdminInput, AdminTextarea } from "../components/AdminCard";
import { createProducerAction, deleteProducerAction, updateProducerAction } from "./actions";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type Producer = {
  id: string;
  name: string;
  slug: string | null;
  japanese_name: string | null;
  producer_number: string | null;
  role: string | null;
  meaning: string | null;
  description: string | null;
  signature: string | null;
  profile_image_url: string | null;
  cover_image_url: string | null;
  display_order: number | null;
};

function ProducerFields({ producer }: { producer?: Partial<Producer> }) {
  return (
    <>
      <div className="grid gap-5 md:grid-cols-2">
        <AdminInput label="프로듀서 넘버" name="producer_number" placeholder="007" defaultValue={producer?.producer_number || ""} />
        <AdminInput label="노출 순서" name="display_order" placeholder="1" defaultValue={producer?.display_order ?? ""} />
        <AdminInput label="이름" name="name" placeholder="AKAYUKI" required defaultValue={producer?.name || ""} />
        <AdminInput label="슬러그" name="slug" placeholder="akayuki" defaultValue={producer?.slug || ""} />
        <AdminInput label="일본어 이름" name="japanese_name" placeholder="アカユキ" defaultValue={producer?.japanese_name || ""} />
        <label className="block">
          <span className="mb-2 block text-[11px] font-black uppercase tracking-[0.18em] text-white/52">역할</span>
          <select name="role" defaultValue={producer?.role || "Producer"} className="h-[48px] w-full rounded-[14px] border border-white/10 bg-black px-4 text-[14px] font-semibold text-white outline-none transition focus:border-[#ff1493]/70">
            {['Producer', 'Executive Producer', 'Sound Producer'].map((value) => <option key={value} value={value}>{value}</option>)}
          </select>
        </label>
        <AdminInput label="의미 / 콘셉트" name="meaning" placeholder="Red Eyes" defaultValue={producer?.meaning || ""} />
      </div>

      <div className="mt-5 grid gap-5 md:grid-cols-2">
        <AdminFileInput label="프로필 이미지 / 새 파일 선택 시 교체" name="profile_image" />
        <AdminFileInput label="히어로 이미지 / 새 파일 선택 시 교체" name="cover_image" />
      </div>

      <div className="mt-5 grid gap-5">
        <AdminTextarea label="프로듀서 설명" name="description" placeholder="프로듀서 상세 페이지에 들어갈 설명을 입력하세요." defaultValue={producer?.description || ""} />
        <AdminTextarea label="시그니처 문구" name="signature" placeholder="A red-eyed producer shaping sound into a world." rows={4} defaultValue={producer?.signature || ""} />
      </div>
    </>
  );
}

export default async function AdminProducersPage({ searchParams }: { searchParams: Promise<{ success?: string; error?: string }> }) {
  const params = await searchParams;
  const { data: producers } = await supabaseAdmin.from("producers").select("*").order("display_order", { ascending: true }).order("created_at", { ascending: false });
  const items = (producers || []) as Producer[];

  return (
    <AdminShell title="프로듀서 관리" description="프로듀서 프로필을 등록하고 수정합니다. 프로듀서에게만 고유 넘버가 부여됩니다.">
      {params.success ? <div className="mb-5 rounded-[18px] border border-[#ff1493]/40 bg-[#ff1493]/10 px-5 py-4 text-[13px] font-bold text-[#ff1493]">{params.success}</div> : null}
      {params.error ? <div className="mb-5 rounded-[18px] border border-red-500/40 bg-red-500/10 px-5 py-4 text-[13px] font-bold text-red-300">저장 실패: {params.error}</div> : null}

      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <AdminCard title="프로듀서 등록" description="프로듀서 넘버, 이름, 프로필 이미지, 설명을 입력합니다.">
          <form action={createProducerAction}>
            <ProducerFields />
            <div className="mt-8 flex flex-wrap gap-3"><AdminButton type="submit">프로듀서 저장</AdminButton></div>
          </form>
        </AdminCard>

        <AdminCard title="등록된 프로듀서" description="Supabase에 저장된 프로듀서 목록입니다.">
          <div className="space-y-3">
            {items.map((producer) => (
              <div key={producer.id} className="rounded-[18px] border border-white/8 bg-black px-4 py-4">
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#ff1493]">NO.{producer.producer_number || "---"}</p>
                <p className="mt-2 text-[18px] font-black text-white">{producer.name}</p>
                {producer.japanese_name ? <p className="mt-1 text-[12px] font-black text-[#ff1493]">{producer.japanese_name}</p> : null}
                <p className="mt-3 text-[12px] font-semibold text-white/42">{producer.role || "Producer"}</p>

                <details className="mt-4 rounded-[16px] border border-white/10 bg-white/[0.025] p-4">
                  <summary className="cursor-pointer text-[12px] font-black uppercase tracking-[0.16em] text-[#ff1493]">수정 열기</summary>
                  <form action={updateProducerAction} className="mt-5">
                    <input type="hidden" name="id" value={producer.id} />
                    <ProducerFields producer={producer} />
                    <div className="mt-6 flex flex-wrap gap-3"><AdminButton type="submit">수정 저장</AdminButton></div>
                  </form>
                </details>

                <form action={deleteProducerAction} className="mt-4">
                  <input type="hidden" name="id" value={producer.id} />
                  <AdminButton type="submit" variant="danger">삭제</AdminButton>
                </form>
              </div>
            ))}
            {items.length === 0 ? <p className="text-[13px] font-semibold text-white/42">아직 등록된 프로듀서가 없습니다.</p> : null}
          </div>
        </AdminCard>
      </div>
    </AdminShell>
  );
}

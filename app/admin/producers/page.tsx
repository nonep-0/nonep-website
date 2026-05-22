import AdminShell from "../components/AdminShell";
import AdminCard, {
  AdminButton,
  AdminFileInput,
  AdminInput,
  AdminSelect,
  AdminTextarea,
} from "../components/AdminCard";
import {
  createProducerAction,
  deleteProducerAction,
} from "./actions";
import { supabaseAdmin } from "@/lib/supabase/admin";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function AdminProducersPage({
  searchParams,
}: {
  searchParams: Promise<{
    success?: string;
    error?: string;
  }>;
}) {
  const params = await searchParams;
  const { data: producers } = await supabaseAdmin
    .from("producers")
    .select("*")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  return (
    <AdminShell
      title="프로듀서 관리"
      description="프로듀서 프로필을 등록하고 수정합니다. 프로듀서에게만 고유 넘버가 부여됩니다."
    >
            {params.success ? (
        <div className="mb-5 rounded-[18px] border border-[#ff1493]/40 bg-[#ff1493]/10 px-5 py-4 text-[13px] font-bold text-[#ff1493]">
          {params.success}
        </div>
      ) : null}

      {params.error ? (
        <div className="mb-5 rounded-[18px] border border-red-500/40 bg-red-500/10 px-5 py-4 text-[13px] font-bold text-red-300">
          저장 실패: {params.error}
        </div>
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <AdminCard
          title="프로듀서 등록"
          description="프로듀서 넘버, 이름, 프로필 이미지, 설명을 입력합니다."
        >
          <form action={createProducerAction}>
            <div className="grid gap-5 md:grid-cols-2">
              <AdminInput
                label="프로듀서 넘버"
                name="producer_number"
                placeholder="007"
              />

              <AdminInput
                label="노출 순서"
                name="display_order"
                placeholder="1"
              />

              <AdminInput
                label="이름"
                name="name"
                placeholder="AKAYUKI"
                required
              />

              <AdminInput
                label="슬러그"
                name="slug"
                placeholder="akayuki"
              />

              <AdminInput
                label="일본어 이름"
                name="japanese_name"
                placeholder="アカユキ"
              />

              <AdminSelect
                label="역할"
                name="role"
                options={["Producer", "Executive Producer", "Sound Producer"]}
                required
              />

              <AdminInput
                label="의미 / 콘셉트"
                name="meaning"
                placeholder="Red Eyes"
              />
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <AdminFileInput label="프로필 이미지" name="profile_image" />
              <AdminFileInput label="히어로 이미지" name="cover_image" />
            </div>

            <div className="mt-5 grid gap-5">
              <AdminTextarea
                label="프로듀서 설명"
                name="description"
                placeholder="프로듀서 상세 페이지에 들어갈 설명을 입력하세요."
              />

              <AdminTextarea
                label="시그니처 문구"
                name="signature"
                placeholder="A red-eyed producer shaping sound into a world."
                rows={4}
              />
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <AdminButton type="submit">프로듀서 저장</AdminButton>
            </div>
          </form>
        </AdminCard>

        <AdminCard
          title="등록된 프로듀서"
          description="Supabase에 저장된 프로듀서 목록입니다."
        >
          <div className="space-y-3">
            {(producers || []).map((producer) => (
              <div
                key={producer.id}
                className="rounded-[18px] border border-white/8 bg-black px-4 py-4"
              >
                <p className="text-[11px] font-black uppercase tracking-[0.18em] text-[#ff1493]">
                  NO.{producer.producer_number || "---"}
                </p>

                <p className="mt-2 text-[18px] font-black text-white">
                  {producer.name}
                </p>

                {producer.japanese_name ? (
                  <p className="mt-1 text-[12px] font-black text-[#ff1493]">
                    {producer.japanese_name}
                  </p>
                ) : null}

                <p className="mt-3 text-[12px] font-semibold text-white/42">
                  {producer.role || "Producer"}
                </p>

                <form action={deleteProducerAction} className="mt-4">
                  <input type="hidden" name="id" value={producer.id} />

                  <AdminButton type="submit" variant="danger">
                    삭제
                  </AdminButton>
                </form>
              </div>
            ))}

            {!producers || producers.length === 0 ? (
              <p className="text-[13px] font-semibold text-white/42">
                아직 등록된 프로듀서가 없습니다.
              </p>
            ) : null}
          </div>
        </AdminCard>
      </div>
    </AdminShell>
  );
}
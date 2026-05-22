import AdminShell from "../components/AdminShell";
import AdminCard, {
  AdminButton,
  AdminFileInput,
  AdminInput,
  AdminSelect,
  AdminTextarea,
} from "../components/AdminCard";
import {
  createDirectorAction,
  deleteDirectorAction,
} from "./actions";
import { supabaseAdmin } from "@/lib/supabase/admin";

export default async function AdminDirectorsPage() {
  const { data: directors } = await supabaseAdmin
    .from("directors")
    .select("*")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  return (
    <AdminShell
      title="디렉터 관리"
      description="디렉터 프로필을 등록하고 수정합니다. 디렉터는 프로듀서 넘버를 사용하지 않습니다."
    >
      <div className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <AdminCard
          title="디렉터 등록"
          description="디렉터 이름, 역할, 프로필 이미지, 설명, 연결 앨범을 입력합니다."
        >
          <form action={createDirectorAction}>
            <div className="grid gap-5 md:grid-cols-2">
              <AdminInput
                label="노출 순서"
                name="display_order"
                placeholder="1"
              />

              <AdminSelect
                label="역할"
                name="role"
                options={["Director", "Visual Director", "Animation Director"]}
                required
              />

              <AdminInput
                label="이름"
                name="name"
                placeholder="Meoooong"
                required
              />
              <AdminInput
                label="슬러그"
                name="slug"
                placeholder="meoooong"
              />

              <AdminInput
                label="일본어 이름"
                name="japanese_name"
                placeholder="メオーン"
              />

              <AdminInput
                label="포지션"
                name="position"
                placeholder="Visual Director"
              />
            </div>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <AdminFileInput label="프로필 이미지" name="profile_image" />
              <AdminFileInput label="히어로 이미지" name="cover_image" />
            </div>

            <div className="mt-5 grid gap-5">
              <AdminTextarea
                label="디렉터 설명"
                name="description"
                placeholder="디렉터 상세 페이지에 들어갈 설명을 입력하세요."
              />

              <AdminTextarea
                label="시그니처 문구"
                name="signature"
                placeholder="Turning sound into a visual world."
                rows={4}
              />
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <AdminButton type="submit">디렉터 저장</AdminButton>
            </div>
          </form>
        </AdminCard>

        <AdminCard
          title="등록된 디렉터"
          description="Supabase에 저장된 디렉터 목록입니다."
        >
          <div className="space-y-3">
            {(directors || []).map((director) => (
              <div
                key={director.id}
                className="rounded-[18px] border border-white/8 bg-black px-4 py-4"
              >
                <p className="text-[18px] font-black text-white">
                  {director.name}
                </p>

                {director.japanese_name ? (
                  <p className="mt-1 text-[12px] font-black text-[#ff1493]">
                    {director.japanese_name}
                  </p>
                ) : null}

                <p className="mt-3 text-[12px] font-semibold text-white/42">
                  {director.position || director.role}
                </p>

                <form action={deleteDirectorAction} className="mt-4">
                  <input type="hidden" name="id" value={director.id} />
                  <AdminButton type="submit" variant="danger">
                    삭제
                  </AdminButton>
                </form>
              </div>
            ))}

            {!directors || directors.length === 0 ? (
              <p className="text-[13px] font-semibold text-white/42">
                아직 등록된 디렉터가 없습니다.
              </p>
            ) : null}
          </div>
        </AdminCard>
      </div>
    </AdminShell>
  );
}
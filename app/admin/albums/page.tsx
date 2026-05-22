import AdminShell from "../components/AdminShell";
import AdminCard, {
  AdminButton,
  AdminFileInput,
  AdminInput,
  AdminSelect,
  AdminTextarea,
} from "../components/AdminCard";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { createAlbumAction, deleteAlbumAction } from "./actions";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type AdminAlbumsPageProps = {
  searchParams: Promise<{
    success?: string;
    error?: string;
  }>;
};

type Album = {
  id: string;
  slug: string | null;
  title: string;
  japanese_title: string | null;
  subtitle: string | null;
  type: string | null;
  thumbnail_url: string | null;
  cover_image_url: string | null;
  release_date: string | null;
  release_label: string | null;
  genre: string | null;
  format: string | null;
  country: string | null;
  youtube_views: number | null;
  youtube_url: string | null;
  youtube_video_id: string | null;
  display_order: number | null;
  is_published: boolean | null;
};

type Producer = {
  id: string;
  name: string;
};

type Director = {
  id: string;
  name: string;
};

export default async function AdminAlbumsPage({
  searchParams,
}: AdminAlbumsPageProps) {
  const params = await searchParams;

  const [{ data: albums }, { data: producers }, { data: directors }] =
    await Promise.all([
      supabaseAdmin
        .from("albums")
        .select("*")
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: false }),

      supabaseAdmin
        .from("producers")
        .select("id, name")
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: false }),

      supabaseAdmin
        .from("directors")
        .select("id, name")
        .order("display_order", { ascending: true })
        .order("created_at", { ascending: false }),
    ]);

  const albumItems = (albums || []) as Album[];
  const producerItems = (producers || []) as Producer[];
  const directorItems = (directors || []) as Director[];

  const producerOptions = producerItems.map((producer) => ({
    label: producer.name,
    value: producer.id,
  }));

  const directorOptions = directorItems.map((director) => ({
    label: director.name,
    value: director.id,
  }));

  return (
    <AdminShell
      title="앨범 관리"
      description="발매 앨범, 썸네일, 크레딧, 트랙리스트, YouTube 조회수 연동 정보를 관리합니다."
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
          title="앨범 등록"
          description="앨범명, 발매 정보, 이미지, YouTube URL을 입력합니다."
        >
          <form action={createAlbumAction}>
            <div className="grid gap-5 md:grid-cols-2">
              <AdminInput
                label="앨범명"
                name="title"
                placeholder="2STAR EGG"
                required
              />

              <AdminInput
                label="슬러그"
                name="slug"
                placeholder="2star-egg"
              />

              <AdminInput
                label="일본어 앨범명"
                name="japanese_title"
                placeholder="ツースターエッグ"
              />

              <AdminInput
                label="서브타이틀"
                name="subtitle"
                placeholder="Official Release"
              />

              <AdminSelect
                label="앨범 타입"
                name="type"
                options={["Single", "EP", "Album", "OST", "Demo"]}
              />

              <AdminInput
                label="노출 순서"
                name="display_order"
                placeholder="1"
                type="number"
              />

              <AdminInput
                label="발매일"
                name="release_date"
                placeholder="2025-01-18"
              />

              <AdminInput
                label="발매 표기"
                name="release_label"
                placeholder="2025.01.18"
              />

              <AdminInput
                label="장르"
                name="genre"
                placeholder="Vocaloid / Pop"
              />

              <AdminInput
                label="형식"
                name="format"
                placeholder="Official MV"
              />

              <AdminInput
                label="국가"
                name="country"
                placeholder="Korea"
              />

              <AdminInput
                label="기본 조회수"
                name="youtube_views"
                placeholder="0"
                type="number"
              />

              <AdminInput
                label="YouTube URL"
                name="youtube_url"
                placeholder="https://www.youtube.com/watch?v=..."
              />

              <AdminInput
                label="YouTube Video ID"
                name="youtube_video_id"
                placeholder="URL 대신 영상 ID만 입력해도 됩니다."
              />

              <AdminSelect
                label="프로듀서 연결"
                name="producer_id"
                options={producerOptions}
              />

              <AdminSelect
                label="디렉터 연결"
                name="director_id"
                options={directorOptions}
              />

              <AdminFileInput label="썸네일 이미지" name="thumbnail_image" />

              <AdminFileInput label="커버 이미지" name="cover_image" />
            </div>

            <div className="mt-5 grid gap-5">
              <AdminTextarea
                label="앨범 설명"
                name="description"
                placeholder="앨범 상세 페이지에 들어갈 설명을 입력하세요."
                rows={5}
              />

              <AdminTextarea
                label="트랙리스트"
                name="tracklist"
                placeholder={"01. 2STAR EGG\n02. Instrumental"}
                rows={5}
              />

              <AdminTextarea
                label="크레딧"
                name="credit"
                placeholder={"Produced by AKAYUKI\nDirected by MEOOOONG"}
                rows={5}
              />
            </div>

            <div className="mt-6 flex justify-end">
              <AdminButton type="submit">앨범 저장</AdminButton>
            </div>
          </form>
        </AdminCard>

        <AdminCard
          title="등록된 앨범"
          description="저장된 앨범을 확인하거나 삭제합니다."
        >
          <div className="space-y-4">
            {albumItems.length > 0 ? (
              albumItems.map((album) => (
                <div
                  key={album.id}
                  className="rounded-[18px] border border-white/10 bg-black p-4"
                >
                  <div className="flex gap-4">
                    <div className="h-[72px] w-[72px] overflow-hidden rounded-[14px] border border-white/10 bg-white/[0.04]">
                      {album.thumbnail_url || album.cover_image_url ? (
                        <img
                          src={album.thumbnail_url || album.cover_image_url || ""}
                          alt={album.title}
                          className="h-full w-full object-cover"
                        />
                      ) : null}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-[16px] font-black uppercase tracking-[0.04em] text-white">
                        {album.title}
                      </p>

                      {album.japanese_title ? (
                        <p className="mt-1 text-[12px] font-bold text-[#ff1493]">
                          {album.japanese_title}
                        </p>
                      ) : null}

                      <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.14em] text-white/42">
                        {album.type || "Release"} /{" "}
                        {album.release_label || album.release_date || "-"}
                      </p>

                      <p className="mt-1 text-[11px] font-bold text-white/34">
                        YouTube ID: {album.youtube_video_id || "-"}
                      </p>
                    </div>
                  </div>

                  <form action={deleteAlbumAction} className="mt-4">
                    <input type="hidden" name="id" value={album.id} />
                    <AdminButton variant="danger" type="submit">
                      삭제
                    </AdminButton>
                  </form>
                </div>
              ))
            ) : (
              <p className="text-[13px] font-bold text-white/42">
                아직 등록된 앨범이 없습니다.
              </p>
            )}
          </div>
        </AdminCard>
      </div>
    </AdminShell>
  );
}
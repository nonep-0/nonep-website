import AdminShell from "../components/AdminShell";
import AdminCard, {
  AdminButton,
  AdminFileInput,
  AdminInput,
  AdminSelect,
  AdminTextarea,
} from "../components/AdminCard";
import { supabaseAdmin } from "@/lib/supabase/admin";
import {
  createAlbumAction,
  deleteAlbumAction,
  updateAlbumAction,
} from "./actions";

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
  melon_url: string | null;
  genie_url: string | null;
  bugs_url: string | null;
  vibe_url: string | null;
  flo_url: string | null;
  apple_music_url: string | null;
  spotify_url: string | null;
  youtube_music_url: string | null;
  description: string | null;
  tracklist: string | null;
  credit: string | null;
  producer_id: string | null;
  director_id: string | null;
  display_order: number | null;
  is_published: boolean | null;
};

type Producer = { id: string; name: string };
type Director = { id: string; name: string };

function selectOptions<T extends { id: string; name: string }>(items: T[]) {
  return items.map((item) => ({ label: item.name, value: item.id }));
}

function AlbumFields({
  album,
  producerOptions,
  directorOptions,
}: {
  album?: Partial<Album>;
  producerOptions: Array<{ label: string; value: string }>;
  directorOptions: Array<{ label: string; value: string }>;
}) {
  return (
    <>
      <div className="grid gap-5 md:grid-cols-2">
        <AdminInput
          label="앨범명"
          name="title"
          placeholder="2STAR EGG"
          required
          defaultValue={album?.title || ""}
        />
        <AdminInput
          label="슬러그"
          name="slug"
          placeholder="2star-egg"
          defaultValue={album?.slug || ""}
        />
        <AdminInput
          label="일본어 앨범명"
          name="japanese_title"
          placeholder="ツースターエッグ"
          defaultValue={album?.japanese_title || ""}
        />
        <AdminInput
          label="서브타이틀"
          name="subtitle"
          placeholder="Official Release"
          defaultValue={album?.subtitle || ""}
        />

        <label className="block">
          <span className="mb-2 block text-[11px] font-black uppercase tracking-[0.18em] text-white/52">
            앨범 타입
          </span>
          <select
            name="type"
            defaultValue={album?.type || ""}
            className="h-[48px] w-full rounded-[14px] border border-white/10 bg-black px-4 text-[14px] font-semibold text-white outline-none transition focus:border-[#ff1493]/70"
          >
            <option value="">선택</option>
            {["Single", "EP", "Album", "OST", "Demo"].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>

        <AdminInput
          label="노출 순서"
          name="display_order"
          placeholder="1"
          type="number"
          defaultValue={album?.display_order ?? ""}
        />
        <AdminInput
          label="발매일"
          name="release_date"
          placeholder="2025-01-18"
          defaultValue={album?.release_date || ""}
        />
        <AdminInput
          label="발매 표기"
          name="release_label"
          placeholder="2025.01.18"
          defaultValue={album?.release_label || ""}
        />
        <AdminInput
          label="장르"
          name="genre"
          placeholder="Vocaloid / Pop"
          defaultValue={album?.genre || ""}
        />
        <AdminInput
          label="형식"
          name="format"
          placeholder="Official MV"
          defaultValue={album?.format || ""}
        />
        <AdminInput
          label="국가"
          name="country"
          placeholder="Korea"
          defaultValue={album?.country || ""}
        />
        <AdminInput
          label="기본 조회수"
          name="youtube_views"
          placeholder="0"
          type="number"
          defaultValue={album?.youtube_views ?? ""}
        />
        <AdminInput
          label="YouTube URL"
          name="youtube_url"
          placeholder="https://www.youtube.com/watch?v=..."
          defaultValue={album?.youtube_url || ""}
        />
        <AdminInput
          label="YouTube Video ID"
          name="youtube_video_id"
          placeholder="URL 대신 영상 ID만 입력해도 됩니다."
          defaultValue={album?.youtube_video_id || ""}
        />
        <AdminInput
          label="Melon 링크"
          name="melon_url"
          placeholder="https://www.melon.com/..."
          defaultValue={album?.melon_url || ""}
        />
        <AdminInput
          label="Genie 링크"
          name="genie_url"
          placeholder="https://www.genie.co.kr/..."
          defaultValue={album?.genie_url || ""}
        />
        <AdminInput
          label="Bugs 링크"
          name="bugs_url"
          placeholder="https://music.bugs.co.kr/..."
          defaultValue={album?.bugs_url || ""}
        />
        <AdminInput
          label="VIBE 링크"
          name="vibe_url"
          placeholder="https://vibe.naver.com/..."
          defaultValue={album?.vibe_url || ""}
        />
        <AdminInput
          label="FLO 링크"
          name="flo_url"
          placeholder="https://www.music-flo.com/..."
          defaultValue={album?.flo_url || ""}
        />
        <AdminInput
          label="Apple Music 링크"
          name="apple_music_url"
          placeholder="https://music.apple.com/..."
          defaultValue={album?.apple_music_url || ""}
        />
        <AdminInput
          label="Spotify 링크"
          name="spotify_url"
          placeholder="https://open.spotify.com/..."
          defaultValue={album?.spotify_url || ""}
        />
        <AdminInput
          label="YouTube Music 링크"
          name="youtube_music_url"
          placeholder="https://music.youtube.com/..."
          defaultValue={album?.youtube_music_url || ""}
        />

        <label className="block">
          <span className="mb-2 block text-[11px] font-black uppercase tracking-[0.18em] text-white/52">
            프로듀서 연결
          </span>
          <select
            name="producer_id"
            defaultValue={album?.producer_id || ""}
            className="h-[48px] w-full rounded-[14px] border border-white/10 bg-black px-4 text-[14px] font-semibold text-white outline-none transition focus:border-[#ff1493]/70"
          >
            <option value="">선택</option>
            {producerOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-[11px] font-black uppercase tracking-[0.18em] text-white/52">
            디렉터 연결
          </span>
          <select
            name="director_id"
            defaultValue={album?.director_id || ""}
            className="h-[48px] w-full rounded-[14px] border border-white/10 bg-black px-4 text-[14px] font-semibold text-white outline-none transition focus:border-[#ff1493]/70"
          >
            <option value="">선택</option>
            {directorOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <AdminFileInput
          label="썸네일 이미지 / 새 파일 선택 시 교체"
          name="thumbnail_image"
        />
        <AdminFileInput
          label="커버 이미지 / 새 파일 선택 시 교체"
          name="cover_image"
        />
      </div>

      <div className="mt-5 grid gap-5">
        <AdminTextarea
          label="앨범 설명"
          name="description"
          placeholder="앨범 상세 페이지에 들어갈 설명을 입력하세요."
          rows={5}
          defaultValue={album?.description || ""}
        />
        <AdminTextarea
          label="트랙리스트"
          name="tracklist"
          placeholder={"01. 2STAR EGG\n02. Instrumental"}
          rows={5}
          defaultValue={
            typeof album?.tracklist === "string" ? album.tracklist : ""
          }
        />
        <AdminTextarea
          label="크레딧"
          name="credit"
          placeholder={"Produced by AKAYUKI\nDirected by MEOOOONG"}
          rows={5}
          defaultValue={typeof album?.credit === "string" ? album.credit : ""}
        />
      </div>
    </>
  );
}

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
  const producerOptions = selectOptions((producers || []) as Producer[]);
  const directorOptions = selectOptions((directors || []) as Director[]);

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
          <form action={createAlbumAction} className="space-y-0">
            <AlbumFields
              producerOptions={producerOptions}
              directorOptions={directorOptions}
            />
            <div className="mt-6 flex justify-end">
              <AdminButton type="submit">앨범 저장</AdminButton>
            </div>
          </form>
        </AdminCard>

        <AdminCard
          title="등록된 앨범"
          description="저장된 앨범을 확인하거나 수정/삭제합니다."
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
                          src={
                            album.thumbnail_url || album.cover_image_url || ""
                          }
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

                  <details className="mt-4 rounded-[16px] border border-white/10 bg-white/[0.025] p-4">
                    <summary className="cursor-pointer text-[12px] font-black uppercase tracking-[0.16em] text-[#ff1493]">
                      수정 열기
                    </summary>
                    <form action={updateAlbumAction} className="mt-5">
                      <input type="hidden" name="id" value={album.id} />
                      <AlbumFields
                        album={album}
                        producerOptions={producerOptions}
                        directorOptions={directorOptions}
                      />
                      <div className="mt-6 flex flex-wrap gap-3">
                        <AdminButton type="submit">수정 저장</AdminButton>
                      </div>
                    </form>
                  </details>

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

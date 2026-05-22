import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { extractYouTubeVideoId, getYouTubeViewCount } from "@/lib/youtube";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type AlbumDetailPageProps = {
  params: Promise<{
    id: string;
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
  description: string | null;
  tracklist: unknown;
  credit: unknown;
  producer_id: string | null;
  director_id: string | null;
  display_order: number | null;
  is_published: boolean | null;
};

type Producer = {
  id: string;
  slug: string | null;
  name: string;
  japanese_name: string | null;
  producer_number: string | null;
};

type Director = {
  id: string;
  slug: string | null;
  name: string;
  japanese_name: string | null;
};

function isUuid(value: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
    value
  );
}

function formatNumber(value?: number | null) {
  if (!value) return "-";
  return value.toLocaleString("en-US");
}

function splitLines(value: unknown) {
  if (!value) return [];

  if (typeof value === "string") {
    return value
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);
  }

  if (Array.isArray(value)) {
    return value
      .map((item) => {
        if (typeof item === "string") return item.trim();
        if (typeof item === "number") return String(item);

        if (item && typeof item === "object") {
          const record = item as Record<string, unknown>;

          const number =
            typeof record.number === "string" || typeof record.number === "number"
              ? String(record.number).trim()
              : "";

          const title =
            typeof record.title === "string"
              ? record.title.trim()
              : typeof record.text === "string"
                ? record.text.trim()
                : typeof record.name === "string"
                  ? record.name.trim()
                  : "";

          const length =
            typeof record.length === "string"
              ? record.length.trim()
              : typeof record.duration === "string"
                ? record.duration.trim()
                : "";

          const label =
            typeof record.label === "string"
              ? record.label.trim()
              : typeof record.role === "string"
                ? record.role.trim()
                : "";

          const names =
            typeof record.names === "string"
              ? record.names.trim()
              : typeof record.name === "string"
                ? record.name.trim()
                : "";

          if (title) {
            return [number, title, length].filter(Boolean).join("  ");
          }

          if (label || names) {
            return [label, names].filter(Boolean).join(": ");
          }

          return Object.entries(record)
            .map(([key, itemValue]) => `${key}: ${String(itemValue).trim()}`)
            .join(" / ");
        }

        return "";
      })
      .filter(Boolean);
  }

  if (typeof value === "object") {
    const record = value as Record<string, unknown>;

    if (Array.isArray(record.lines)) {
      return record.lines
        .map((line) => String(line).trim())
        .filter(Boolean);
    }

    return Object.entries(record)
      .map(([key, item]) => `${key}: ${String(item).trim()}`)
      .filter(Boolean);
  }

  return [String(value)];
}

export default async function AlbumDetailPage({ params }: AlbumDetailPageProps) {
  noStore();

  const { id } = await params;

  const albumQuery = supabaseAdmin.from("albums").select("*");

  const { data: album, error } = isUuid(id)
    ? await albumQuery.eq("id", id).maybeSingle()
    : await albumQuery.eq("slug", id).maybeSingle();

  if (error) {
    return (
      <main className="min-h-screen bg-black px-8 py-32 text-white">
        <div className="mx-auto max-w-[900px] rounded-[24px] border border-red-500/40 bg-red-500/10 p-8">
          <p className="text-[12px] font-black uppercase tracking-[0.24em] text-red-300">
            Album Detail Error
          </p>

          <h1 className="mt-4 text-[42px] font-black text-white">
            Supabase Query Error
          </h1>

          <p className="mt-6 text-[16px] font-semibold text-red-200">
            {error.message}
          </p>

          <Link
            href="/albums"
            className="mt-8 inline-flex rounded-full border border-[#ff1493]/60 px-5 py-3 text-[12px] font-black uppercase tracking-[0.18em] text-white"
          >
            Back to Albums
          </Link>
        </div>
      </main>
    );
  }

  if (!album) {
    return (
      <main className="min-h-screen bg-black px-8 py-32 text-white">
        <div className="mx-auto max-w-[900px] rounded-[24px] border border-[#ff1493]/40 bg-[#ff1493]/10 p-8">
          <p className="text-[12px] font-black uppercase tracking-[0.24em] text-[#ff1493]">
            Album Not Found
          </p>

          <h1 className="mt-4 text-[42px] font-black text-white">
            앨범을 찾지 못했습니다
          </h1>

          <p className="mt-6 text-[16px] font-semibold text-white/62">
            현재 주소에서 찾으려는 slug 또는 id: {id}
          </p>

          <Link
            href="/albums"
            className="mt-8 inline-flex rounded-full border border-[#ff1493]/60 px-5 py-3 text-[12px] font-black uppercase tracking-[0.18em] text-white"
          >
            Back to Albums
          </Link>
        </div>
      </main>
    );
  }

  const currentAlbum = album as Album;

  const youtubeVideoId =
    currentAlbum.youtube_video_id ||
    extractYouTubeVideoId(currentAlbum.youtube_url);

  const liveYoutubeViews = await getYouTubeViewCount(youtubeVideoId);

  const displayYoutubeViews =
    liveYoutubeViews ?? currentAlbum.youtube_views ?? null;

  const [{ data: producer }, { data: director }] = await Promise.all([
    currentAlbum.producer_id
      ? supabaseAdmin
          .from("producers")
          .select("id, slug, name, japanese_name, producer_number")
          .eq("id", currentAlbum.producer_id)
          .maybeSingle()
      : Promise.resolve({ data: null }),

    currentAlbum.director_id
      ? supabaseAdmin
          .from("directors")
          .select("id, slug, name, japanese_name")
          .eq("id", currentAlbum.director_id)
          .maybeSingle()
      : Promise.resolve({ data: null }),
  ]);

  const currentProducer = producer as Producer | null;
  const currentDirector = director as Director | null;

  const mainImage =
    currentAlbum.cover_image_url ||
    currentAlbum.thumbnail_url ||
    "/source/albums-hero.png";

  const coverImage =
    currentAlbum.thumbnail_url ||
    currentAlbum.cover_image_url ||
    "/source/albums-hero.png";

  const tracks = splitLines(currentAlbum.tracklist);
  const credits = splitLines(currentAlbum.credit);

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="relative overflow-hidden border-t border-[#ff1493]/50 pt-[76px]">
        <div className="absolute inset-0">
          <img
            src={mainImage}
            alt={currentAlbum.title}
            className="h-full w-full object-cover object-center blur-[1px]"
          />
        </div>

        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.96)_0%,rgba(0,0,0,0.78)_48%,rgba(0,0,0,0.48)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18)_0%,rgba(0,0,0,0.62)_58%,rgba(0,0,0,1)_100%)]" />

        <div className="relative mx-auto flex min-h-[360px] max-w-[1280px] items-end px-6 py-16 md:min-h-[430px] md:px-8 md:py-20">
          <div>
            <p className="mb-4 text-[12px] font-black uppercase tracking-[0.34em] text-[#ff1493]">
              NONEP Release
            </p>

            <h1 className="text-[52px] font-black uppercase leading-none tracking-[0.08em] text-white md:text-[86px]">
              {currentAlbum.title}
            </h1>

            {currentAlbum.japanese_title ? (
              <p className="mt-5 text-[22px] font-black text-[#ff1493]">
                {currentAlbum.japanese_title}
              </p>
            ) : null}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1280px] px-6 py-12 md:px-8 md:py-16">
        <Link
          href="/albums"
          className="inline-flex items-center gap-2 text-[12px] font-extrabold uppercase tracking-[0.16em] text-white/58 transition hover:text-[#ff1493]"
        >
          <span>←</span>
          <span>Back to Albums</span>
        </Link>

        <div className="mt-8 grid gap-10 lg:grid-cols-[520px_1fr]">
          <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#08080c] shadow-[0_0_42px_rgba(255,20,147,0.12)]">
            <div className="relative aspect-square w-full overflow-hidden bg-black">
              <img
                src={coverImage}
                alt={currentAlbum.title}
                className="absolute inset-0 h-full w-full object-contain"
              />
            </div>

            <div className="border-t border-white/10 bg-[#08080c] p-6">
              <p className="text-[11px] font-black uppercase tracking-[0.24em] text-[#ff1493]">
                {currentAlbum.subtitle || "Official Release"}
              </p>

              <h2 className="mt-3 text-[34px] font-black uppercase leading-none tracking-[0.04em] text-white">
                {currentAlbum.title}
              </h2>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="rounded-full bg-white px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-black">
                  {currentAlbum.type || "Single"}
                </span>

                <span className="rounded-full border border-white/12 px-4 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white/62">
                  {currentAlbum.release_label ||
                    currentAlbum.release_date ||
                    "Release"}
                </span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-[12px] font-black uppercase tracking-[0.32em] text-[#ff1493]">
              {currentAlbum.type || "Release"}
            </p>

            <h2 className="mt-4 text-[52px] font-black uppercase leading-none tracking-[0.04em] text-white md:text-[74px]">
              {currentAlbum.title}
            </h2>

            {currentAlbum.japanese_title ? (
              <p className="mt-4 text-[20px] font-black text-[#ff1493]">
                {currentAlbum.japanese_title}
              </p>
            ) : null}

            <p className="mt-8 max-w-[720px] text-[15px] font-semibold leading-[1.9] text-white/62">
              {currentAlbum.description ||
                `${currentAlbum.title} is a NONEP release.`}
            </p>

            <div className="mt-9 grid max-w-[620px] gap-y-5">
              <div className="grid grid-cols-[140px_1fr] gap-4">
                <p className="text-[15px] font-black text-[#ff1493]">
                  Producer
                </p>
                <p className="text-[15px] font-bold text-white">
                  {currentProducer ? currentProducer.name : "-"}
                </p>
              </div>

              <div className="grid grid-cols-[140px_1fr] gap-4">
                <p className="text-[15px] font-black text-[#ff1493]">
                  Director
                </p>
                <p className="text-[15px] font-bold text-white">
                  {currentDirector ? currentDirector.name : "-"}
                </p>
              </div>

              <div className="grid grid-cols-[140px_1fr] gap-4">
                <p className="text-[15px] font-black text-[#ff1493]">Release</p>
                <p className="text-[15px] font-bold text-white">
                  {currentAlbum.release_label ||
                    currentAlbum.release_date ||
                    "-"}
                </p>
              </div>

              <div className="grid grid-cols-[140px_1fr] gap-4">
                <p className="text-[15px] font-black text-[#ff1493]">Genre</p>
                <p className="text-[15px] font-bold text-white">
                  {currentAlbum.genre || "-"}
                </p>
              </div>

              <div className="grid grid-cols-[140px_1fr] gap-4">
                <p className="text-[15px] font-black text-[#ff1493]">Format</p>
                <p className="text-[15px] font-bold text-white">
                  {currentAlbum.format || "-"}
                </p>
              </div>

              <div className="grid grid-cols-[140px_1fr] gap-4">
                <p className="text-[15px] font-black text-[#ff1493]">Country</p>
                <p className="text-[15px] font-bold text-white">
                  {currentAlbum.country || "-"}
                </p>
              </div>

              <div className="grid grid-cols-[140px_1fr] gap-4">
                <p className="text-[15px] font-black text-[#ff1493]">
                  YouTube Views
                </p>
                <p className="text-[15px] font-bold text-white">
                  {displayYoutubeViews
                    ? `${formatNumber(displayYoutubeViews)} views`
                    : "-"}
                </p>
              </div>
            </div>
          </div>
        </div>

        <section className="mt-16 grid gap-8 border-t border-white/8 pt-14 lg:grid-cols-2">
          <div>
            <h2 className="text-[34px] font-black uppercase tracking-[0.14em] text-white">
              Tracklist
            </h2>

            <div className="mt-7 rounded-[24px] border border-white/10 bg-white/[0.03]">
              {tracks.length > 0 ? (
                tracks.map((track, index) => (
                  <div
                    key={`${track}-${index}`}
                    className="flex items-center justify-between gap-5 border-b border-white/8 px-6 py-5 last:border-b-0"
                  >
                    <p className="text-[13px] font-black text-[#ff1493]">
                      {String(index + 1).padStart(2, "0")}
                    </p>

                    <p className="text-right text-[16px] font-bold text-white">
                      {track}
                    </p>
                  </div>
                ))
              ) : (
                <p className="px-6 py-8 text-[14px] font-semibold text-white/48">
                  No tracklist registered yet.
                </p>
              )}
            </div>
          </div>

          <div>
            <h2 className="text-[34px] font-black uppercase tracking-[0.14em] text-white">
              Credit
            </h2>

            <div className="mt-7 rounded-[24px] border border-white/10 bg-white/[0.03] p-6">
              {credits.length > 0 ? (
                <div className="space-y-4">
                  {credits.map((credit, index) => (
                    <p
                      key={`${credit}-${index}`}
                      className="text-[15px] font-semibold leading-[1.8] text-white/64"
                    >
                      {credit}
                    </p>
                  ))}
                </div>
              ) : (
                <p className="text-[14px] font-semibold text-white/48">
                  No credit registered yet.
                </p>
              )}
            </div>
          </div>
        </section>

        <div className="mt-12 flex flex-wrap gap-3">
          {currentProducer ? (
            <Link
              href={`/producers/${currentProducer.slug || currentProducer.id}`}
              className="rounded-full border border-[#ff1493]/70 px-6 py-3 text-[12px] font-extrabold uppercase tracking-[0.18em] text-white transition hover:bg-[#ff1493] hover:text-black"
            >
              View Producer
            </Link>
          ) : null}

          {currentDirector ? (
            <Link
              href={`/directors/${currentDirector.slug || currentDirector.id}`}
              className="rounded-full border border-[#ff1493]/70 px-6 py-3 text-[12px] font-extrabold uppercase tracking-[0.18em] text-white transition hover:bg-[#ff1493] hover:text-black"
            >
              View Director
            </Link>
          ) : null}

          {youtubeVideoId ? (
            <a
              href={`https://www.youtube.com/watch?v=${youtubeVideoId}`}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/20 px-6 py-3 text-[12px] font-extrabold uppercase tracking-[0.18em] text-white/70 transition hover:border-[#ff1493]/70 hover:text-white"
            >
              Watch on YouTube
            </a>
          ) : null}
        </div>
      </section>
    </main>
  );
}